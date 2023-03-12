import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";

import { useLoaderData, useSearchParams } from "@remix-run/react";
import type { ChangeEvent } from "react";
import { useId } from "react";
import { db } from "~/db/prisma.server";
import { NewCharacterMetaSchema } from "../characters.new.meta/form-schema.server";
import { requireUserWithEveryFlag } from "~/utils/session.server";
import { Main } from "~/components/main";
import { CharacterMetaForm } from "~/components/forms/character-meta";

const LOOKUP_SEARCH_PARAM = "id";

export async function loader({ request }: LoaderArgs) {
  await requireUserWithEveryFlag(request, ["EDIT_CHARACTER"]);

  const editableIds = await Promise.resolve(
    db.characterMeta.findMany({ select: { id: true } }),
  ).then((entries) => entries.map(({ id }) => id));

  const url = new URL(request.url);
  const selectedId = url.searchParams.get(LOOKUP_SEARCH_PARAM);

  if (typeof selectedId === "string") {
    const selectedMeta = await db.characterMeta.findUnique({
      where: { id: selectedId },
    });

    return json({ editableIds, selectedMeta });
  }

  return json({ editableIds, selectedMeta: null });
}

export default function EditorNewMeta() {
  const id = useId();

  const { editableIds, selectedMeta } = useLoaderData<typeof loader>();

  const [_, setSearchParams] = useSearchParams();

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();

    setSearchParams((prev) => {
      prev.set(LOOKUP_SEARCH_PARAM, e.target.value);
      return prev;
    });
  };

  return (
    <Main>
      <Main.Container className="gap-y-6">
        <div className="rounded-box bg-white px-4 py-5 shadow sm:p-6">
          <h4 className="mb-2 text-lg font-semibold">Edit Character Meta</h4>
          <select
            className="select"
            onChange={handleSelectChange}
            defaultValue={selectedMeta?.id ?? -1}
          >
            <option value={-1} disabled>
              -- select character id --
            </option>
            {editableIds.map((eId) => (
              <option key={id + eId} value={eId}>
                {eId}
              </option>
            ))}
          </select>
        </div>

        {selectedMeta != null && (
          <CharacterMetaForm defaultValues={selectedMeta} editMode notEditableId />
        )}
      </Main.Container>
    </Main>
  );
}

export async function action({ request }: ActionArgs) {
  await requireUserWithEveryFlag(request, ["EDIT_CHARACTER"]);

  const formData = await request.formData();
  const validation = await NewCharacterMetaSchema.safeParseAsync(
    Object.fromEntries(formData.entries()),
  );

  return null;
}
