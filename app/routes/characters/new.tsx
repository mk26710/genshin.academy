import type { ActionArgs, LoaderArgs, MetaFunction } from "@remix-run/node";

import { GenshinVision, GenshinWeapon, PermissionFlag } from "@prisma/client";
import {
  json,
  unstable_parseMultipartFormData,
  unstable_createMemoryUploadHandler,
} from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { useEffect } from "react";

import { Container } from "~/components/Container";
import { Input } from "~/components/Input";
import { prisma } from "~/db/prisma.server";
import { NewCharacter } from "~/schemas/character.server";
import { arrayBufferToWebp } from "~/utils/image.server";
import { generateMeta } from "~/utils/meta-generator";
import { validateUserPermissions, ValidationMode } from "~/utils/permissions";
import { badRequest } from "~/utils/responses.server";
import { uploadToBucket } from "~/utils/s3.server";
import { getAuthorizedUser } from "~/utils/session.server";

export const meta: MetaFunction<typeof loader> = () => {
  return generateMeta({
    title: "New Character",
    description: "Create a new character data entry",
  });
};

export async function loader({ request }: LoaderArgs) {
  await getAuthorizedUser(request, async (user) =>
    validateUserPermissions(user, [PermissionFlag.NEW_CHARACTER], ValidationMode.STRICT),
  );

  return null;
}

export default function CharacterNew() {
  const actionData = useActionData<typeof action>();

  useEffect(() => {
    actionData;
  }, []);

  return (
    <Container>
      <Form method="post" encType="multipart/form-data">
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
          <label htmlFor="character.blob.icon" className="text-xs font-bold uppercase opacity-70">
            Icon
          </label>

          <input
            id="character.blob.icon"
            name="character.blob.icon"
            type="file"
            className="block"
            required
          />
        </div>

        <div>
          <label htmlFor="character.blob.avatar" className="text-xs font-bold uppercase opacity-70">
            Avatar
          </label>

          <input
            id="character.blob.avatar"
            name="character.blob.avatar"
            type="file"
            className="block"
            required
          />
        </div>

        <div>
          <label htmlFor="character.blob.card" className="text-xs font-bold uppercase opacity-70">
            Card
          </label>

          <input
            id="character.blob.card"
            name="character.blob.card"
            type="file"
            className="block"
            required
          />
        </div>

        <button type="submit" className="button mt-6 w-full">
          Send
        </button>
      </Form>
    </Container>
  );
}

export async function action({ request }: ActionArgs) {
  await getAuthorizedUser(request, async (user) =>
    validateUserPermissions(user, [PermissionFlag.NEW_CHARACTER], ValidationMode.STRICT),
  );

  const uploadHandler = unstable_createMemoryUploadHandler({
    maxPartSize: 20_000_000,
  });

  const formData = await unstable_parseMultipartFormData(request, uploadHandler);

  const parse = NewCharacter.safeParse({
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
    iconBlob: formData.get("character.blob.icon"),
    avatarBlob: formData.get("character.blob.avatar"),
    cardBlob: formData.get("character.blob.card"),
  });

  if (!parse.success) {
    return badRequest({ message: "Failed to validate form data", cause: parse.error });
  }

  const form = parse.data;

  const [character, identity] = await prisma.$transaction([
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
  ]);

  const [iconBuffer, avatarBuffer, cardBuffer] = await Promise.all([
    form.iconBlob.arrayBuffer(),
    form.avatarBlob.arrayBuffer(),
    form.cardBlob.arrayBuffer(),
  ]);

  const [iconWebp, avatarWebp, cardWebp] = await Promise.all([
    arrayBufferToWebp(iconBuffer),
    arrayBufferToWebp(avatarBuffer),
    arrayBufferToWebp(cardBuffer),
  ]);

  await Promise.all([
    uploadToBucket(iconWebp, `characters/${character.id}/icon.webp`),
    uploadToBucket(avatarWebp, `characters/${character.id}/avatar.webp`),
    uploadToBucket(cardWebp, `characters/${character.id}/card.webp`),
  ]);

  await prisma.genshinCharacterAsset.createMany({
    skipDuplicates: true,
    data: [
      {
        genshinCharacterId: character.id,
        type: "ICON",
        path: `characters/${character.id}/icon.webp`,
      },
      {
        genshinCharacterId: character.id,
        type: "AVATAR",
        path: `characters/${character.id}/avatar.webp`,
      },
      {
        genshinCharacterId: character.id,
        type: "CARD",
        path: `characters/${character.id}/card.webp`,
      },
    ],
  });

  return json({
    character,
    identity,
  });
}
