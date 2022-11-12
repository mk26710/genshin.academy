import type { LoaderArgs, MetaFunction } from "@remix-run/node";

import { Dialog } from "@headlessui/react";
import { PermissionFlag } from "@prisma/client";
import { Link, useLoaderData } from "@remix-run/react";
import { useState } from "react";

import { Checkbox } from "~/components/Checkbox";
import { Container } from "~/components/Container";
import { prisma } from "~/db/prisma.server";
import { useAfterHydration } from "~/hooks/use-hydrated";
import { useVisitorLocale } from "~/hooks/use-visitor-locale";
import { UIntNumericString } from "~/schemas/common.server";
import { generateMeta } from "~/utils/meta-generator";
import { validateUserPermissions, ValidationMode } from "~/utils/permissions";
import { badRequest } from "~/utils/responses.server";
import { S3_DOMAIN } from "~/utils/s3.server";
import { getAuthorizedUser } from "~/utils/session.server";

export const meta: MetaFunction = () => {
  return generateMeta({
    title: "File Manager",
  });
};

export const loader = async ({ request }: LoaderArgs) => {
  await getAuthorizedUser(request, (user) =>
    validateUserPermissions(user, [PermissionFlag.NEW_ASSET], ValidationMode.STRICT),
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

export default function Files() {
  const locale = useVisitorLocale();
  const { files } = useLoaderData<typeof loader>();

  return (
    <Container className="max-w-screen-md">
      <Link to="/files/upload" className="button" role="button">
        Upload
      </Link>

      <div className="mt-4 overflow-hidden overflow-x-auto rounded-lg border border-neutral-200">
        <table className="min-w-full divide-y divide-neutral-200 text-sm">
          <thead className="bg-neutral-100">
            <tr>
              <th className="bg-neutral-100 px-4 py-2 text-left">
                <label className="sr-only" htmlFor="SelectAll">
                  Select All
                </label>

                <Checkbox className="h-5 w-5 " id="SelectAll" />
              </th>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium">View</th>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium">Uploader</th>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium">Size</th>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium">Upload Date</th>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium">URL</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-neutral-200 text-neutral-700 dark:text-neutral-200">
            {files.map((f, idx) => {
              const [isOpen, setIsOpen] = useState(false);
              const date = useAfterHydration(new Date(f.uploadedAt ?? ""));

              return (
                <tr key={f.id}>
                  <td className="px-4 py-2">
                    <label className="sr-only" htmlFor={`Row${idx}`}>
                      Row {idx}
                    </label>

                    <Checkbox id={`Row${idx}`} className="h-5 w-5" />
                  </td>

                  <td className="whitespace-nowrap px-4 py-2 font-medium">
                    <img
                      src={f.url}
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
                        <img src={f.url} className="max-h-[calc(80vh)] max-w-screen-xl" />

                        <button
                          className="button"
                          onClick={() => {
                            if (typeof navigator === "undefined") return;
                            navigator.clipboard.writeText(f.url);
                          }}
                        >
                          Copy URL
                        </button>
                      </Dialog.Panel>
                    </Dialog>
                  </td>

                  <td className="whitespace-nowrap px-4 py-2 font-medium">{f.uploader?.name}</td>

                  <td className="whitespace-nowrap px-4 py-2 font-medium">
                    {Intl.NumberFormat("en", {
                      notation: "compact",
                      style: "unit",
                      unit: "byte",
                      unitDisplay: "narrow",
                    }).format(f.size ?? 0)}
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
                        navigator.clipboard.writeText(f.url);
                      }}
                      className="cursor-pointer underline"
                    >
                      click to copy
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Container>
  );
}
