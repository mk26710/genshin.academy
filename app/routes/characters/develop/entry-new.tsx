import type { ActionArgs, LoaderArgs } from "@remix-run/node";

import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { json } from "@remix-run/node";
import { Form, useActionData, useCatch, useLoaderData } from "@remix-run/react";
import { useEffect } from "react";

import { Button } from "~/components/Button";
import { Input } from "~/components/Input";
import { Label } from "~/components/Label";
import { prisma } from "~/db/prisma.server";
import { NewCharacterEntrySchema } from "~/schemas/forms/new-character-entry.server";
import { permissions, validateUserPermissions, ValidationMode } from "~/utils/permissions";
import { badRequest } from "~/utils/responses.server";
import { authorizeUser } from "~/utils/session.server";

export const loader = async ({ request }: LoaderArgs) => {
  await authorizeUser(request, async (user) =>
    validateUserPermissions(user, permissions("NEW_CHARACTER"), ValidationMode.SOFT),
  );

  const existingMetas = await prisma.characterMeta.findMany({ select: { id: true } });

  return json({ existingMetas });
};

export default function NewCharacterEntry() {
  const { existingMetas } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  useEffect(() => {
    console.log(actionData);
  }, [actionData]);

  return (
    <div>
      <Form method="post" className="flex flex-col gap-2">
        <div>
          <Label>Character ID</Label>
          <select name="metaId" className="select w-full" defaultValue="" required>
            <option disabled value="">
              -- select an existing character id --
            </option>
            {existingMetas.map(({ id }) => (
              <option key={id} value={id}>
                {id}
              </option>
            ))}
          </select>
        </div>

        <div>
          <Label>Locale</Label>
          <select name="locale" className="select w-full" required>
            <option value="ru">Русский</option>
            <option value="en">English</option>
          </select>
        </div>

        <div>
          <Label>Name</Label>
          <Input name="name" placeholder="e.g. Kamisato Ayaka" width="full" required />
        </div>

        <div>
          <Label>Title</Label>
          <Input name="title" placeholder="e.g. Frostflake Heron" width="full" />
        </div>

        <div>
          <Label>Description</Label>
          <textarea
            name="description"
            placeholder="e.g. Daughter of the Yashiro Commission's Kamisato Clan. Dignified and elegant, as well as wise and strong."
            className="textarea w-full"
          />
        </div>

        <div>
          <Label>Affiliation</Label>
          <Input name="affiliation" placeholder="e.g. Yashiro Commission" width="full" />
        </div>

        <div>
          <Label>Constellation</Label>
          <Input name="constellation" placeholder="e.g. Grus Nivis" width="full" />
        </div>

        <Button className="mt-4" type="submit">
          Create Entry
        </Button>
      </Form>
    </div>
  );
}

export const action = async ({ request }: ActionArgs) => {
  await authorizeUser(request, async (user) =>
    validateUserPermissions(user, permissions("NEW_CHARACTER"), ValidationMode.SOFT),
  );

  const formData = await request.formData();

  const validation = await NewCharacterEntrySchema.safeParseAsync(Object.fromEntries(formData));
  if (!validation.success) {
    const err = validation.error;
    return badRequest({
      success: false,
      error: {
        message: "Validation Failure",
        cause: err,
      },
    });
  }

  try {
    await prisma.$transaction(async (tx) => {
      const { metaId, locale, name, title, description, affiliation, constellation } =
        validation.data;

      await tx.characterEntry.create({
        data: {
          metaId,
          locale,
          name,
          title,
          description,
          affiliation,
          constellation,
        },
      });
    });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        return badRequest({
          success: false,
          error: {
            message: "Unique Constrain Violation!",
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

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <div className="flex flex-col p-4">
      <div className="flex flex-1 items-center justify-center rounded-box border border-red-500 bg-red-100 text-red-500">
        <h4 className="text-xl font-semibold">{caught.status}</h4>
        <p>{caught.statusText || `${caught.data}`}</p>
      </div>
    </div>
  );
}
