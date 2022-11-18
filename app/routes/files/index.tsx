import type { ActionArgs, LoaderArgs, MetaFunction, SerializeFrom } from "@remix-run/node";
import type { ZodError } from "zod";
import type { TypedErrorResponse } from "~/utils/responses.server";

import { Dialog } from "@headlessui/react";
import { PermissionFlag } from "@prisma/client";
import { json } from "@remix-run/node";
import { Link, useFetcher, useLoaderData, useSearchParams } from "@remix-run/react";
import { useAtom } from "jotai";
import { useResetAtom, atomWithReset } from "jotai/utils";
import { useEffect, useId, useState } from "react";

import { Checkbox } from "~/components/Checkbox";
import { Container } from "~/components/Container";
import { prisma } from "~/db/prisma.server";
import { useAfterHydration } from "~/hooks/use-hydrated";
import { useVisitorLocale } from "~/hooks/use-visitor-locale";
import { z } from "~/lib/zod.server";
import { UIntNumericString } from "~/schemas/common.server";
import { generateMeta } from "~/utils/meta-generator";
import { permissions, validateUserPermissions, ValidationMode } from "~/utils/permissions";
import { forbidden, badRequest } from "~/utils/responses.server";
import { deleteFromBucket, S3_DOMAIN } from "~/utils/s3.server";
import { requireUser, authorizeUser } from "~/utils/session.server";

export const meta: MetaFunction = () => {
  return generateMeta({
    title: "File Manager",
  });
};

export const loader = async ({ request }: LoaderArgs) => {
  await authorizeUser(request, (user) =>
    validateUserPermissions(user, [PermissionFlag.VIEW_ALL_ASSETS], ValidationMode.STRICT),
  );

  const url = new URL(request.url);

  const pageParse = UIntNumericString.refine(
    (val) => val > 0,
    "Provided value must be greater than 0",
  ).safeParse(url.searchParams.get("page") ?? "1");

  if (!pageParse.success) {
    throw badRequest({ message: "Invalid page value" });
  }

  const page = pageParse.data;

  const perPage = 50;
  const skip = perPage * (page - 1);

  const files = await prisma.file.findMany({
    take: perPage,
    skip,
    orderBy: {
      uploadedAt: "desc",
    },
    include: {
      uploader: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  return {
    files: files.map((entry) => ({ ...entry, url: S3_DOMAIN + "/" + entry.s3Key })),
    page,
  };
};

type Loader = SerializeFrom<typeof loader>;

const selectedFileIdsAtom = atomWithReset<Array<string>>([]);

type FileRowProps = {
  file: Loader["files"][number];
};

const FileRow = ({ file }: FileRowProps) => {
  const id = useId();

  const locale = useVisitorLocale();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedFileIds, setSelectedFileIds] = useAtom(selectedFileIdsAtom);

  const date = useAfterHydration(new Date(file.uploadedAt ?? ""));

  const onRowCheckboxChange = () => {
    setSelectedFileIds((s) => {
      if (s.includes(file.id)) {
        return s.filter((entry) => entry !== file.id);
      }

      return [...s, file.id];
    });
  };

  return (
    <tr>
      <td className="px-4 py-2">
        <label className="sr-only" htmlFor={`Row${id}`}>
          Row {id}
        </label>

        <Checkbox
          checked={selectedFileIds.includes(file.id)}
          onChange={onRowCheckboxChange}
          className="h-5 w-5 cursor-pointer"
        />
      </td>

      <td className="whitespace-nowrap px-4 py-2 font-medium">
        <img
          src={file.url}
          className="h-[50px] w-[50px] cursor-pointer rounded-lg object-cover"
          width="50px"
          onClick={() => setIsOpen(true)}
        />

        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className="fixed top-0 left-0 z-50 flex h-full w-screen items-center justify-center bg-black/50 backdrop-blur-sm"
        >
          <Dialog.Panel className="flex flex-col items-center justify-center gap-2">
            <img src={file.url} className="max-h-[calc(80vh)] max-w-screen-xl" />

            <button
              className="button"
              onClick={() => {
                if (typeof navigator === "undefined") return;
                navigator.clipboard.writeText(file.url);
              }}
            >
              Copy URL
            </button>
          </Dialog.Panel>
        </Dialog>
      </td>

      <td className="whitespace-nowrap px-4 py-2 font-medium">{file.uploader?.name}</td>

      <td className="whitespace-nowrap px-4 py-2 font-medium">
        {Intl.NumberFormat("en", {
          notation: "compact",
          style: "unit",
          unit: "byte",
          unitDisplay: "narrow",
        }).format(file.size ?? 0)}
      </td>

      <td className="whitespace-nowrap px-4 py-2 font-medium">
        {date?.toLocaleDateString(locale, {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}
      </td>

      <td className="whitespace-nowrap px-4 py-2 font-medium">
        <span
          onClick={() => {
            if (typeof navigator === "undefined") return;
            navigator.clipboard.writeText(file.url);
          }}
          className="cursor-pointer underline"
        >
          click to copy
        </span>
      </td>
    </tr>
  );
};

export default function Files() {
  const { files, page } = useLoaderData<typeof loader>();
  const fetcher = useFetcher<ActionData>();

  const [selectedFileIds] = useAtom(selectedFileIdsAtom);
  const resetSelectedFileIds = useResetAtom(selectedFileIdsAtom);

  const [, setSearchParam] = useSearchParams();

  const deleteSelectedFiles = () => {
    const formData = new FormData();

    selectedFileIds.forEach((id) => {
      formData.append("file-id", id);
    });

    fetcher.submit(formData, {
      method: "delete",
      replace: true,
    });
  };

  const previousPage = () => {
    if (page - 1 < 1) {
      return;
    }

    setSearchParam(new URLSearchParams({ page: `${page - 1}` }));
  };

  const nextPage = () => {
    setSearchParam(new URLSearchParams({ page: `${page + 1}` }));
  };

  useEffect(() => {
    if (fetcher.state === "loading" && fetcher.type === "actionReload") {
      resetSelectedFileIds();
    }
  }, [fetcher.state, fetcher.data?.output, fetcher.data?.cause, fetcher.data?.message]);

  return (
    <Container className="max-w-screen-md">
      <div className="flex flex-row gap-4">
        <div className="flex flex-1 flex-row items-center gap-2">
          <button className="button" onClick={previousPage}>
            prev
          </button>
          <span>{page} / ?</span>
          <button className="button" onClick={nextPage}>
            next
          </button>
        </div>

        <div className="flex flex-row gap-2">
          {selectedFileIds.length > 0 && (
            <button className="button-danger" onClick={deleteSelectedFiles}>
              Delete Selected
            </button>
          )}

          <Link to="/files/upload" className="button" role="button">
            Upload
          </Link>
        </div>
      </div>

      <div className="mt-4 overflow-hidden overflow-x-auto rounded-lg border border-neutral-200">
        <table className="min-w-full divide-y divide-neutral-200 text-sm">
          <thead className="bg-neutral-100">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium">Select</th>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium">View</th>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium">Uploader</th>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium">Size</th>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium">Upload Date</th>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium">URL</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-neutral-200 text-neutral-700 dark:text-neutral-200">
            {files.map((file, idx) => (
              <FileRow key={idx} file={file} />
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
}

type DeleteFromBucket = Awaited<ReturnType<typeof deleteFromBucket>>;

interface ActionData extends TypedErrorResponse {
  cause?: Error | ZodError;
  output?: DeleteFromBucket[0];
}

export const action = async ({ request }: ActionArgs) => {
  if (request.method !== "DELETE") {
    return json({ message: "Method not allowed" }, { status: 405 });
  }

  const user = await requireUser(request);
  const formData = await request.formData();

  const validation = await z.array(z.string().min(1).max(50)).spa(formData.getAll("file-id"));
  if (!validation.success) {
    return badRequest<ActionData>({ message: "Form validation failure", cause: validation.error });
  }

  const fileIdsToDelete = validation.data;

  const filesToDelete = await prisma.file.findMany({
    where: {
      id: {
        in: fileIdsToDelete,
      },
    },
    include: {
      uploader: {
        include: {
          permissions: true,
        },
      },
    },
  });

  const areFilesOwnedByUser = filesToDelete.every((file) => file.uploader?.id === user.id);
  const requiredPermissions = permissions(
    areFilesOwnedByUser === true && "DELETE_MY_ASSET",
    areFilesOwnedByUser !== true && "DELETE_SOMEONES_ASSET",
  );

  const canUserDeleteFiles = validateUserPermissions(
    user,
    requiredPermissions,
    ValidationMode.STRICT,
  );

  if (!canUserDeleteFiles) {
    return forbidden({
      message: "Missing Permissions",
      details: `You must have all the following permissions: ${requiredPermissions.join(", ")}`,
    });
  }

  const [output] = await deleteFromBucket(...filesToDelete.map((file) => file.s3Key));

  return json<ActionData>({ output });
};
