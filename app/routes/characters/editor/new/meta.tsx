import type { ActionArgs, LoaderArgs } from "@remix-run/node";

import {
  Element as GenshinElement,
  Weapon as GenshinWeapon,
  Association as GenshinAssociation,
} from "@prisma/client";
import { Form } from "@remix-run/react";
import { useId } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { db } from "~/db/prisma.server";
import { CharacterMetaFormSchema } from "~/schemas/forms/new-character-meta.server";
import { badRequest } from "~/utils/responses.server";
import { requireUserWithEveryFlag } from "~/utils/session.server";

export async function loader({ request }: LoaderArgs) {
  await requireUserWithEveryFlag(request, ["NEW_CHARACTER"]);
  return null;
}

export default function EditorNewMeta() {
  const id = useId();

  return (
    <Form method="post" className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <Label htmlFor={id + "id"}>Character ID</Label>
        <Input placeholder="e.g. kamisato-ayaka" id={id + "id"} name="id" required />
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor={id + "accentColor"}>Accent Color</Label>
        <Input placeholder="#ff0000" id={id + "accentColor"} name="accentColor" required />
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor={id + "rarity"}>Rarity</Label>
        <Input
          id={id + "rarity"}
          name="rarity"
          type="number"
          min="4"
          max="5"
          step="1"
          defaultValue="4"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor={id + "element"}>Element</Label>
        <select className="select" id={id + "element"} name="element" defaultValue={-1} required>
          <option disabled value={-1}>
            -- select some genshin element --
          </option>
          {Object.values(GenshinElement).map((el) => (
            <option key={el} value={el}>
              {el}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor={id + "weapon"}>Weapon</Label>
        <select className="select" id={id + "weapon"} name="weapon" defaultValue={-1} required>
          <option disabled value={-1}>
            -- select some genshin weapon --
          </option>
          {Object.values(GenshinWeapon).map((w) => (
            <option key={w} value={w}>
              {w}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center gap-2">
          <input type="checkbox" className="checkbox" id={id + "hasVision"} name="hasVision" />
          <Label htmlFor={id + "hasVision"} className="select-none">
            Vision Owner
          </Label>
        </div>

        <div className="flex flex-row items-center gap-2">
          <input type="checkbox" className="checkbox" id={id + "isArchon"} name="isArchon" />
          <Label htmlFor={id + "isArchon"} className="select-none">
            Archon
          </Label>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor={id + "association"}>Association</Label>
        <select
          className="select"
          id={id + "association"}
          name="association"
          defaultValue={-1}
          required
        >
          <option disabled value={-1}>
            -- select some genshin association --
          </option>
          {Object.values(GenshinAssociation).map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-x-2 gap-y-6 md:flex-row">
        <div className="flex flex-col gap-1">
          <Label htmlFor={id + "birthDay"}>Day of Birth</Label>
          <Input
            type="number"
            min="1"
            max="31"
            step="1"
            defaultValue="31"
            id={id + "birthDay"}
            name="birthDay"
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor={id + "birthMonth"}>Month of Birth</Label>
          <Input
            type="number"
            min="1"
            max="12"
            step="1"
            defaultValue="12"
            id={id + "birthMonth"}
            name="birthMonth"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor={id + "releaseDate"}>Release Date</Label>
        <Input type="date" id={id + "releaseDate"} name="releaseDate" className="w-fit" required />
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor={id + "versionReleased"}>Release Release</Label>
        <Input id={id + "versionReleased"} name="versionReleased" placeholder="2.0" />
      </div>

      <Button type="submit" variant="filled" color="primary">
        Submit
      </Button>
    </Form>
  );
}

export async function action({ request }: ActionArgs) {
  await requireUserWithEveryFlag(request, ["NEW_CHARACTER"]);

  const formData = await request.formData();
  const validation = await CharacterMetaFormSchema.safeParseAsync(
    Object.fromEntries(formData.entries()),
  );

  if (validation.success !== true) {
    return badRequest({ error: { message: "validation failed" } });
  }

  await db.characterMeta.create({
    data: {
      id: validation.data.id,
      accentColor: validation.data.accentColor,
      rarity: validation.data.rarity,
      element: validation.data.element,
      weapon: validation.data.weapon,
      association: validation.data.association,
      birthDay: validation.data.birthDay,
      birthMonth: validation.data.birthMonth,
      releaseDate: validation.data.releaseDate,
      versionReleased: validation.data.versionReleased,
      isArchon: validation.data.isArchon,
      hasVision: validation.data.hasVision,
    },
  });

  return null;
}
