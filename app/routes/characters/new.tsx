import type { ActionArgs, HeadersFunction, LoaderArgs, MetaFunction } from "@remix-run/node";

import { Weapon, PermissionFlag, Element as TeyvatElement, Association } from "@prisma/client";
import { redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";

import { Button } from "~/components/Button";
import { Checkbox } from "~/components/Checkbox";
import { Container } from "~/components/Container";
import { Input } from "~/components/Input";
import { prisma } from "~/db/prisma.server";
import { z } from "~/lib/zod.server";
import { CharacterInfoSchema, CharacterSchema } from "~/schemas/character.server";
import { generateMeta } from "~/utils/meta-generator";
import { validateUserPermissions, ValidationMode } from "~/utils/permissions";
import { badRequest } from "~/utils/responses.server";
import { authorizeUser } from "~/utils/session.server";

const FORM_FIELDS = {
  ID: "character.details.id",
  NAME: "character.info.name",
  TITLE: "character.info.title",
  DESCRIPTION: "character.info.description",
  COLOR: "character.details.accentColor",
  BIRTH_DAY: "character.details.birthDay",
  BIRTH_MONTH: "character.details.birthMonth",
  RARITY: "character.details.rarity",
  ELEMENT: "character.details.element",
  HAS_VISION: "character.details.hasVision",
  WEAPON: "character.details.weapon",
  ASSOCIATION: "character.details.association",
  ICON_ASSET: "character.assets.icon",
  GACHA_ASSET: "character.assets.gacha",
  CARD_ASSET: "character.assets.asset",
} as const;

export const meta: MetaFunction<typeof loader> = () => {
  return generateMeta({
    title: "New Character",
    description: "Create a new character data entry",
    noIndex: true,
  });
};

export const headers: HeadersFunction = () => ({
  "X-Robots-Tag": "noindex",
});

export async function loader({ request }: LoaderArgs) {
  await authorizeUser(request, async (user) =>
    validateUserPermissions(user, [PermissionFlag.NEW_CHARACTER], ValidationMode.STRICT),
  );

  return null;
}

export default function CharacterNew() {
  return (
    <Container>
      <Form method="post" replace className="grid grid-flow-dense grid-cols-1 gap-2 lg:grid-cols-3">
        <div>
          <label htmlFor={FORM_FIELDS.NAME} className="text-xs font-bold uppercase opacity-70">
            Name
          </label>
          <Input
            id={FORM_FIELDS.NAME}
            name={FORM_FIELDS.NAME}
            placeholder="Name in English goes here..."
            fullWidth
            required
          />
        </div>

        <div>
          <label htmlFor={FORM_FIELDS.ID} className="text-xs font-bold uppercase opacity-70">
            ID
          </label>
          <Input
            id={FORM_FIELDS.ID}
            name={FORM_FIELDS.ID}
            placeholder="ID goes here..."
            fullWidth
            required
          />
        </div>

        <div>
          <label htmlFor={FORM_FIELDS.TITLE} className="text-xs font-bold uppercase opacity-70">
            Title
          </label>
          <Input
            id={FORM_FIELDS.TITLE}
            name={FORM_FIELDS.TITLE}
            placeholder="Title in english goes here..."
            fullWidth
            required
          />
        </div>

        <div>
          <label
            htmlFor={FORM_FIELDS.DESCRIPTION}
            className="text-xs font-bold uppercase opacity-70"
          >
            Description
          </label>
          <Input
            id={FORM_FIELDS.DESCRIPTION}
            name={FORM_FIELDS.DESCRIPTION}
            placeholder="Description in english goes here..."
            fullWidth
            required
          />
        </div>

        <div>
          <label htmlFor={FORM_FIELDS.COLOR} className="text-xs font-bold uppercase opacity-70">
            Accent Color
          </label>
          <Input
            id={FORM_FIELDS.COLOR}
            name={FORM_FIELDS.COLOR}
            placeholder="Accent color goes here..."
            fullWidth
            required
          />
        </div>

        <div>
          <label htmlFor={FORM_FIELDS.RARITY} className="text-xs font-bold uppercase opacity-70">
            Rarity
          </label>
          <Input
            id={FORM_FIELDS.RARITY}
            name={FORM_FIELDS.RARITY}
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
          <label
            htmlFor={FORM_FIELDS.HAS_VISION}
            className="text-xs font-bold uppercase opacity-70"
          >
            Has Vision?
          </label>

          <Checkbox label="Check if has vision" name={FORM_FIELDS.HAS_VISION} />
        </div>

        <div>
          <label htmlFor={FORM_FIELDS.ELEMENT} className="text-xs font-bold uppercase opacity-70">
            Element
          </label>
          <select id={FORM_FIELDS.ELEMENT} name={FORM_FIELDS.ELEMENT} className="select w-full">
            {Object.values(TeyvatElement).map((element, idx) => (
              <option key={idx} value={element}>
                {element}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor={FORM_FIELDS.WEAPON} className="text-xs font-bold uppercase opacity-70">
            Weapon
          </label>

          <select id={FORM_FIELDS.WEAPON} name={FORM_FIELDS.WEAPON} className="select w-full">
            {Object.values(Weapon).map((weapon, idx) => (
              <option key={idx} value={weapon}>
                {weapon}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor={FORM_FIELDS.ASSOCIATION}
            className="text-xs font-bold uppercase opacity-70"
          >
            Association
          </label>

          <select
            id={FORM_FIELDS.ASSOCIATION}
            name={FORM_FIELDS.ASSOCIATION}
            className="select w-full"
          >
            {Object.values(Association).map((loc, idx) => (
              <option key={idx} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor={FORM_FIELDS.BIRTH_DAY} className="text-xs font-bold uppercase opacity-70">
            Birth Day
          </label>
          <Input
            id={FORM_FIELDS.BIRTH_DAY}
            name={FORM_FIELDS.BIRTH_DAY}
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
          <label
            htmlFor={FORM_FIELDS.BIRTH_MONTH}
            className="text-xs font-bold uppercase opacity-70"
          >
            Birth Month
          </label>
          <Input
            id={FORM_FIELDS.BIRTH_MONTH}
            name={FORM_FIELDS.BIRTH_MONTH}
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
          <label
            htmlFor={FORM_FIELDS.ICON_ASSET}
            className="text-xs font-bold uppercase opacity-70"
          >
            Icon
          </label>

          <Input id={FORM_FIELDS.ICON_ASSET} name={FORM_FIELDS.ICON_ASSET} fullWidth required />
        </div>

        <div>
          <label
            htmlFor={FORM_FIELDS.GACHA_ASSET}
            className="text-xs font-bold uppercase opacity-70"
          >
            Gacha Image URL
          </label>

          <Input id={FORM_FIELDS.GACHA_ASSET} name={FORM_FIELDS.GACHA_ASSET} fullWidth required />
        </div>

        <div>
          <label
            htmlFor={FORM_FIELDS.CARD_ASSET}
            className="text-xs font-bold uppercase opacity-70"
          >
            Card
          </label>

          <Input id={FORM_FIELDS.CARD_ASSET} name={FORM_FIELDS.CARD_ASSET} fullWidth required />
        </div>

        <Button variant="light" color="primary" type="submit" className="col-span-full mt-6 w-full">
          Send
        </Button>
      </Form>
    </Container>
  );
}

export const action = async ({ request }: ActionArgs) => {
  await authorizeUser(request, async (user) =>
    validateUserPermissions(user, [PermissionFlag.NEW_CHARACTER], ValidationMode.STRICT),
  );

  const formData = await request.formData();

  const validator = z.object({
    details: CharacterSchema,
    info: CharacterInfoSchema,
    assets: z.object({
      icon: z.string().trim().url(),
      gacha: z.string().trim().url(),
      card: z.string().trim().url(),
    }),
  });

  const validation = validator.safeParse({
    details: {
      id: formData.get(FORM_FIELDS.ID),
      accentColor: formData.get(FORM_FIELDS.COLOR),
      birthDay: formData.get(FORM_FIELDS.BIRTH_DAY),
      birthMonth: formData.get(FORM_FIELDS.BIRTH_MONTH),
      rarity: formData.get(FORM_FIELDS.RARITY),
      element: formData.get(FORM_FIELDS.ELEMENT),
      hasVision: formData.get(FORM_FIELDS.HAS_VISION),
      weapon: formData.get(FORM_FIELDS.WEAPON),
      association: formData.get(FORM_FIELDS.ASSOCIATION),
    },
    info: {
      entryLanguage: "en",
      characterId: formData.get(FORM_FIELDS.ID),
      name: formData.get(FORM_FIELDS.NAME),
      title: formData.get(FORM_FIELDS.TITLE),
      description: formData.get(FORM_FIELDS.DESCRIPTION),
    },
    assets: {
      icon: formData.get(FORM_FIELDS.ICON_ASSET),
      gacha: formData.get(FORM_FIELDS.GACHA_ASSET),
      card: formData.get(FORM_FIELDS.CARD_ASSET),
    },
  });

  if (!validation.success) {
    const formatted = validation.error.format();
    return badRequest({ errors: formatted });
  }

  const { info, details, assets } = validation.data;

  const character = await prisma.character.create({
    include: {
      info: true,
      assets: true,
    },
    data: {
      ...details,
      info: {
        create: {
          name: info.name,
          title: info.title,
          description: info.description,
          entryLanguage: info.entryLanguage,
        },
      },
      assets: {
        createMany: {
          data: [
            {
              type: "ICON",
              url: assets.icon,
            },
            {
              type: "GACHA",
              url: assets.gacha,
            },
            {
              type: "CARD",
              url: assets.card,
            },
          ],
        },
      },
    },
  });

  return redirect(`/characters/${character.id}`);
};
