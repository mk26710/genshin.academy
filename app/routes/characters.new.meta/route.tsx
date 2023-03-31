import type { ActionArgs, HeadersFunction, LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

import { CharacterMetaForm } from "~/components/forms/character-meta";
import { Main } from "~/components/main";
import { generateTitle } from "~/utils/meta-generator";
import { requireUserWithEveryFlag } from "~/utils/session.server";
import { NewCharacterMetaSchema } from "./form-schema.server";
import { badRequest } from "~/utils/responses.server";
import { db } from "~/db/prisma.server";

export const headers: HeadersFunction = () => ({
  "X-Robots-Tag": "noindex",
});

export async function loader({ request }: LoaderArgs) {
  await requireUserWithEveryFlag(request, ["NEW_CHARACTER"]);
  return null;
}

export const meta: V2_MetaFunction = () => {
  return [{ title: generateTitle("New Character Meta") }];
};

export default function CharacterNewFlat() {
  return (
    <Main>
      <Main.Container>
        <CharacterMetaForm editMode={false} />

        {/* <Form
          method="post"
          className="flex flex-col gap-2 rounded-box bg-white p-4 py-5 shadow sm:p-6 "
        >
          <h2 className="font-semibold text-gray-900">New Character: Meta</h2>
          <p className="mb-4 text-sm text-gray-700">
            This form will create a new character meta entry and after that you'll be able to create
            public entry data in specific locales
          </p>

          <div className="flex flex-col gap-0.5">
            <Label htmlFor={`${id}:id`}>Character ID</Label>
            <Input name="id" id={`${id}:id`} placeholder="kamisato-ayaka" required />
          </div>

          <div className="flex flex-col gap-0.5">
            <Label htmlFor={`${id}:accentColor`} className="flex flex-row items-center gap-1">
              <span>Accent Color</span>
              <div style={{ backgroundColor: accentColor }} className="h-4 w-4 rounded-full" />
            </Label>
            <Input
              name="accentColor"
              id={`${id}:accentColor`}
              placeholder="#ff0000"
              value={accentColor}
              onChange={(e) => setAccentColor(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-0.5">
            <Label htmlFor={`${id}:rarity`}>Rarity</Label>
            <Input
              name="rarity"
              id={`${id}:rarity`}
              type="number"
              min="4"
              max="5"
              step="1"
              defaultValue={"4"}
              required
            />
          </div>

          <div className="flex flex-col gap-0.5">
            <Label htmlFor={`${id}:element`}>Rarity</Label>

            <select name="element" id={`${id}:element`} className="select" required>
              {Object.values(GenshinElement).map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-0.5">
            <Label htmlFor={`${id}:weapon`}>Weapon</Label>

            <select name="weapon" id={`${id}:weapon`} className="select" required>
              {Object.values(GenshinWeapon).map((w) => (
                <option key={w} value={w}>
                  {w}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-row items-center gap-2">
            <input type="checkbox" name="hasVision" id={`${id}:hasVision`} className="checkbox" />

            <Label htmlFor={`${id}:hasVision`} className="select-none">
              Holds Vision
            </Label>
          </div>

          <div className="flex flex-row items-center gap-2">
            <input type="checkbox" name="isArchon" id={`${id}:isArchon`} className="checkbox" />

            <Label htmlFor={`${id}:isArchon`} className="select-none">
              Archon
            </Label>
          </div>

          <div className="flex flex-col gap-0.5">
            <Label htmlFor={`${id}:association`}>Association</Label>

            <select name="association" id={`${id}:association`} className="select" required>
              {Object.values(Association).map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-row gap-0.5">
            <div className="flex flex-col gap-0.5">
              <Label htmlFor={`${id}:birthDay`}>Birth Day</Label>
              <Input
                name="birthDay"
                id={`${id}:birthDay`}
                type="number"
                min="1"
                max="31"
                step="1"
                defaultValue="31"
                required
              />
            </div>
            <div className="flex flex-col gap-0.5">
              <Label htmlFor={`${id}:birthMonth`}>Birth Month</Label>
              <Input
                name="birthMonth"
                id={`${id}:birthMonth`}
                type="number"
                min="1"
                max="12"
                step="1"
                defaultValue="12"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-0.5">
            <Label htmlFor={`${id}:releaseDate`}>Rlease Date</Label>

            <Input name="releaseDate" id={`${id}:releaseDate`} type="date" required />
          </div>

          <div className="flex flex-col gap-0.5">
            <Label htmlFor={`${id}:versionReleased`}>Release Version</Label>
            <Input name="versionReleased" id={`${id}:versionReleased`} placeholder="3.0" required />
          </div>

          <Button type="submit" className="mt-4">
            Create meta entry
          </Button>
        </Form> */}
      </Main.Container>
    </Main>
  );
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const formObj = Object.fromEntries(formData.entries());

  const validation = await NewCharacterMetaSchema.safeParseAsync(formObj);
  if (validation.success !== true) {
    return badRequest({
      success: false,
      error: { message: "Validation Failure", cause: validation.error },
    });
  }

  const newEntry = await db.$transaction(async (tx) => {
    const {
      id,
      rarity,
      element,
      weapon,
      accentColor,
      association,
      hasVision,
      isArchon,
      birthDay,
      birthMonth,
      releaseDate,
      versionReleased,
    } = validation.data;

    return await tx.characterMeta.create({
      data: {
        id,
        rarity,
        element,
        weapon,
        accentColor,
        association,
        hasVision,
        isArchon,
        birthDay,
        birthMonth,
        releaseDate,
        versionReleased,
      },
    });
  });

  return json({ success: true, data: newEntry });
}
