import type { ActionArgs, LoaderArgs, SerializeFrom } from "@remix-run/node";
import type { FormEvent } from "react";

import { Dialog } from "@headlessui/react";
import { PlusIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { CharacterAssetType } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { json } from "@remix-run/node";
import { Form, useLoaderData, useSearchParams } from "@remix-run/react";
import { useState, useRef } from "react";

import { Button } from "~/components/Button";
import { Checkbox } from "~/components/Checkbox";
import { Input } from "~/components/Input";
import { prisma } from "~/db/prisma.server";
import { usePaginator } from "~/hooks/use-paginator";
import { PageNumSchema } from "~/schemas/common.server";
import { NewCharacterAssetSchema } from "~/schemas/forms/new-character-asset.server";
import { isString } from "~/utils/helpers";
import { permissions, validateUserPermissions, ValidationMode } from "~/utils/permissions";
import { badRequest } from "~/utils/responses.server";
import { authorizeUser } from "~/utils/session.server";

const PER_PAGE = 50;

type Loader = SerializeFrom<typeof loader>;

export const loader = async ({ request }: LoaderArgs) => {
  await authorizeUser(request, async (user) =>
    validateUserPermissions(user, permissions("NEW_CHARACTER"), ValidationMode.SOFT),
  );

  const url = new URL(request.url);

  const query = url.searchParams.get("query");
  const searchQuery = query == null ? undefined : query.trim().replaceAll(/\s+/gi, " & ");

  const page = (await PageNumSchema.parseAsync(url.searchParams.get("page"))) ?? 1;
  const skip = (page - 1) * PER_PAGE;

  const whereClause =
    searchQuery != null && searchQuery.length > 0
      ? {
          OR: [
            {
              name: {
                search: searchQuery,
              },
            },
            {
              characterMetaId: {
                search: searchQuery,
              },
            },
            {
              description: {
                search: searchQuery,
              },
            },
          ],
        }
      : {};

  const assets = await prisma.characterAsset.findMany({
    skip,
    take: PER_PAGE,
    include: {
      characterMeta: {
        select: {
          id: true,
        },
      },
    },
    where: whereClause,
  });

  const existingMetaIds = await prisma.characterMeta.findMany({
    select: {
      id: true,
    },
  });

  return json({ page, existingMetaIds, assets });
};

type TableRowProps = {
  asset: Loader["assets"][number];
};

const TableRow = ({ asset }: TableRowProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <tr key={asset.id}>
      <td className="px-4 py-2">
        <label className="sr-only" htmlFor={`Row${asset.id}`}>
          Row {asset.id}
        </label>

        <Checkbox className="h-5 w-5 cursor-pointer" />
      </td>

      <td className="whitespace-nowrap px-4 py-2 font-medium">
        <img
          src={asset.url}
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
            <img src={asset.url} className="max-h-[calc(80vh)] max-w-screen-xl" />

            <Button
              variant="light"
              color="primary"
              onClick={() => {
                if (typeof navigator === "undefined") return;
                navigator.clipboard.writeText(asset.url);
              }}
            >
              Copy URL
            </Button>
          </Dialog.Panel>
        </Dialog>
      </td>

      <td className="whitespace-nowrap px-4 py-2 font-medium">{asset.id}</td>
      <td className="whitespace-nowrap px-4 py-2 font-medium">{asset.characterMetaId}</td>
      <td className="whitespace-nowrap px-4 py-2 font-medium">{asset.type}</td>
      <td className="whitespace-nowrap px-4 py-2 font-medium">{asset.name}</td>
      <td className="whitespace-nowrap px-4 py-2 font-medium">{asset.description ?? "-"}</td>
    </tr>
  );
};

export default function CharacterDevelopAssets() {
  const { page, existingMetaIds, assets } = useLoaderData<typeof loader>();
  const { firstPage, prevPage, nextPage } = usePaginator({ current: page });

  const [searchParams, setSearchParams] = useSearchParams();
  const searchForm = useRef<HTMLFormElement>(null);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const query = formData.get("query");
    if (!isString(query)) {
      return;
    }

    if (query.length === 0) {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.delete("query");

      setSearchParams(newSearchParams);
      return;
    }

    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("query", query);

    setSearchParams(newSearchParams);
  };

  return (
    <div className="flex flex-col">
      <Form method="post" className="mb-6">
        <h3 className="mb-2 text-sm font-semibold uppercase text-gray-700">Create New Asset</h3>
        <div className="flex flex-row gap-2">
          <select name="characterMetaId" className="select" required>
            {existingMetaIds.map(({ id }, idx) => (
              <option key={idx} value={id}>
                {id}
              </option>
            ))}
          </select>

          <select name="type" className="select" required>
            {Object.values(CharacterAssetType).map((assetType) => (
              <option key={assetType} value={assetType}>
                {assetType}
              </option>
            ))}
          </select>

          <Input name="name" placeholder="Name of asset" required />

          <Input name="url" placeholder="Asset URL" width="full" required />

          <input name="isPublic" type="checkbox" checked={true} readOnly hidden />

          <Button type="submit" color="semiblack">
            <PlusIcon className="h-6 w-6" />
          </Button>
        </div>
      </Form>

      <hr className="mb-6 border-gray-300" />

      <form ref={searchForm} onSubmit={handleSearch} className="flex flex-row gap-2">
        <Input name="query" placeholder="Search query..." width="full" className="mb-2" />
        <Button type="submit" color="semiblack">
          <MagnifyingGlassIcon className="h-5 w-5" />
        </Button>
      </form>

      <table className="mb-6 min-w-full divide-y divide-neutral-200 overflow-x-auto rounded-box border border-gray-300 text-sm">
        <thead className="rounded-t-box bg-gray-100">
          <tr className="rounded-t-box">
            <th className="whitespace-nowrap px-4 py-2 text-left font-medium">Select</th>
            <th className="whitespace-nowrap px-4 py-2 text-left font-medium">Image</th>
            <th className="whitespace-nowrap px-4 py-2 text-left font-medium">ID</th>
            <th className="whitespace-nowrap px-4 py-2 text-left font-medium">Character ID</th>
            <th className="whitespace-nowrap px-4 py-2 text-left font-medium">Type</th>
            <th className="whitespace-nowrap px-4 py-2 text-left font-medium">Name</th>
            <th className="whitespace-nowrap px-4 py-2 text-left font-medium">Description</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-neutral-200 overflow-x-auto text-neutral-700 dark:text-neutral-200">
          {assets.map((asset) => (
            <TableRow key={asset.id} asset={asset} />
          ))}
        </tbody>
      </table>

      <div className="flex flex-1 flex-row justify-center">
        <Button onClick={firstPage}>first</Button>
        <Button onClick={prevPage}>previous</Button>
        <Button onClick={nextPage}>next</Button>
      </div>
    </div>
  );
}

export const action = async ({ request }: ActionArgs) => {
  await authorizeUser(request, async (user) =>
    validateUserPermissions(user, permissions("NEW_CHARACTER"), ValidationMode.STRICT),
  );

  const formData = await request.formData();
  const formObject = Object.fromEntries(formData.entries());

  const validation = await NewCharacterAssetSchema.safeParseAsync(formObject);
  if (!validation.success) {
    return badRequest({
      success: false,
      error: {
        message: "Validation Failure",
        cause: validation.error,
      },
    });
  }

  try {
    await prisma.$transaction(async (tx) => {
      const { characterMetaId, type, name, url, isPublic } = validation.data;

      await tx.characterAsset.create({
        data: {
          characterMetaId,
          type,
          name,
          url,
          isPublic,
        },
      });
    });
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return badRequest({
          success: false,
          error: {
            message: "This url is already stored as  a character asset",
            cause: null,
          },
        });
      }
    }
  }

  return json({
    success: true,
    error: null,
  });
};
