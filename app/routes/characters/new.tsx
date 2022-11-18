import type { ActionArgs, LoaderArgs, MetaFunction } from "@remix-run/node";
import type { TypedErrorResponse } from "~/utils/responses.server";

import { GenshinVision, GenshinWeapon, PermissionFlag } from "@prisma/client";
import { redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";

import { Container } from "~/components/Container";
import { Input } from "~/components/Input";
import { prisma } from "~/db/prisma.server";
import { NewCharacter } from "~/schemas/character.server";
import { generateMeta } from "~/utils/meta-generator";
import { validateUserPermissions, ValidationMode } from "~/utils/permissions";
import { badRequest } from "~/utils/responses.server";
import { authorizeUser } from "~/utils/session.server";

export const meta: MetaFunction<typeof loader> = () => {
  return generateMeta({
    title: "New Character",
    description: "Create a new character data entry",
  });
};

export async function loader({ request }: LoaderArgs) {
  await authorizeUser(request, async (user) =>
    validateUserPermissions(user, [PermissionFlag.NEW_CHARACTER], ValidationMode.STRICT),
  );

  return null;
}

export default function CharacterNew() {
  return (
    <Container>
      <Form method="post" replace>
        <div>
          <label htmlFor="character.name" className="text-xs font-bold uppercase opacity-70">
            Name
          </label>
          <Input
            id="character.name"
            name="character.name"
            placeholder="Name in english goes here..."
            fullWidth
            required
          />
        </div>

        <div>
          <label htmlFor="character.id" className="text-xs font-bold uppercase opacity-70">
            ID
          </label>
          <Input
            id="character.id"
            name="character.id"
            placeholder="ID goes here..."
            fullWidth
            required
          />
        </div>

        <div>
          <label htmlFor="character.description" className="text-xs font-bold uppercase opacity-70">
            Description
          </label>
          <Input
            id="character.description"
            name="character.description"
            placeholder="Description in english goes here..."
            fullWidth
            required
          />
        </div>

        <div>
          <label htmlFor="character.accentColor" className="text-xs font-bold uppercase opacity-70">
            Accent Color
          </label>
          <Input
            id="character.accentColor"
            name="character.accentColor"
            placeholder="Accent color goes here..."
            fullWidth
            required
          />
        </div>

        <div>
          <label htmlFor="character.weapon" className="text-xs font-bold uppercase opacity-70">
            Weapon
          </label>

          <select
            id="character.weapon"
            name="character.weapon"
            className="select-field block w-full"
            required
          >
            {Object.values(GenshinWeapon).map((weapon) => (
              <option key={weapon} value={weapon}>
                {weapon}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="character.vision" className="text-xs font-bold uppercase opacity-70">
            Vision
          </label>

          <select
            id="character.vision"
            name="character.vision"
            className="select-field block w-full"
            required
          >
            {Object.values(GenshinVision).map((vision) => (
              <option key={vision} value={vision}>
                {vision}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="character.rarity" className="text-xs font-bold uppercase opacity-70">
            Rarity
          </label>
          <Input
            id="character.rarity"
            name="character.rarity"
            type="number"
            max={5}
            min={1}
            step={1}
            defaultValue={5}
            fullWidth
            required
          />
        </div>

        <div>
          <label htmlFor="character.birthDay" className="text-xs font-bold uppercase opacity-70">
            Birth Day
          </label>
          <Input
            id="character.birthDay"
            name="character.birthDay"
            type="number"
            max={31}
            min={1}
            step={1}
            defaultValue={1}
            fullWidth
            required
          />
        </div>

        <div>
          <label htmlFor="character.birthMonth" className="text-xs font-bold uppercase opacity-70">
            Birth Month
          </label>
          <Input
            id="character.birthMonth"
            name="character.birthMonth"
            type="number"
            max={12}
            min={1}
            step={1}
            defaultValue={1}
            fullWidth
            required
          />
        </div>

        <div>
          <label htmlFor="character.iconUrl" className="text-xs font-bold uppercase opacity-70">
            Icon
          </label>

          <Input id="character.iconUrl" name="character.iconUrl" fullWidth required />
        </div>

        <div>
          <label htmlFor="character.gachaUrl" className="text-xs font-bold uppercase opacity-70">
            Gacha Image URL
          </label>

          <Input id="character.gachaUrl" name="character.gachaUrl" fullWidth required />
        </div>

        <div>
          <label htmlFor="character.cardUrl" className="text-xs font-bold uppercase opacity-70">
            Card
          </label>

          <Input id="character.cardUrl" name="character.cardUrl" fullWidth required />
        </div>

        <button type="submit" className="button mt-6 w-full">
          Send
        </button>
      </Form>
    </Container>
  );
}

interface ActionData extends TypedErrorResponse {
  created?: boolean;
}

export const action = async ({ request }: ActionArgs) => {
  await authorizeUser(request, async (user) =>
    validateUserPermissions(user, [PermissionFlag.NEW_CHARACTER], ValidationMode.STRICT),
  );

  const formData = await request.formData();

  console.log(Object.fromEntries(formData));

  const parse = await NewCharacter.safeParseAsync({
    id: formData.get("character.id"),
    name: formData.get("character.name"),
    description: formData.get("character.description"),
    accentColor: formData.get("character.accentColor"),
    rarity: await Promise.resolve(formData.get("character.rarity")).then((val) =>
      parseInt(`${val}`),
    ),
    weapon: formData.get("character.weapon"),
    vision: formData.get("character.vision"),
    birthDay: await Promise.resolve(formData.get("character.birthDay")).then((val) =>
      parseInt(`${val}`),
    ),
    birthMonth: await Promise.resolve(formData.get("character.birthMonth")).then((val) =>
      parseInt(`${val}`),
    ),
    iconUrl: formData.get("character.iconUrl"),
    gachaUrl: formData.get("character.gachaUrl"),
    cardUrl: formData.get("character.cardUrl"),
  });

  if (!parse.success) {
    return badRequest<ActionData>({ message: "Failed to validate form data", cause: parse.error });
  }

  const form = parse.data;

  await prisma.$transaction([
    prisma.genshinCharacter.create({
      data: {
        id: form.id,
        rarity: form.rarity,
        accentColor: form.accentColor,
        weapon: form.weapon,
        vision: form.vision,
        birthDay: form.birthDay,
        birthMonth: form.birthMonth,
      },
    }),
    prisma.genshinCharacterIdentity.create({
      data: {
        genshinCharacterId: form.id,
        lang: "en",
        name: form.name,
        description: form.description,
      },
    }),
    prisma.genshinCharacterAsset.createMany({
      data: [
        {
          type: "ICON",
          characterId: form.id,
          url: form.iconUrl,
        },
        {
          type: "CARD",
          characterId: form.id,
          url: form.cardUrl,
        },
        {
          type: "GACHA",
          characterId: form.id,
          url: form.gachaUrl,
        },
      ],
    }),
  ]);

  return redirect("/characters/" + form.id);
};
