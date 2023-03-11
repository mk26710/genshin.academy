import type { FC } from "react";
import type { CharacterMetaForm as CharacterMetaFormSchema } from "~/schemas/forms/new-character-meta.server";

import { Association, Element as GenshinElement, Weapon as GenshinWeapon } from "@prisma/client";
import { Form } from "@remix-run/react";
import { useId, useState } from "react";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

type Props = {
  editMode?: boolean;
  editId?: string;
  defaultValues?: CharacterMetaFormSchema;
};

export const CharacterMetaForm: FC<Props> = ({ editMode, defaultValues }) => {
  const id = useId();

  const [accentColor, setAccentColor] = useState("#8e60f2");

  return (
    <Form
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
        <Input
          name="id"
          id={`${id}:id`}
          placeholder="kamisato-ayaka"
          defaultValue={defaultValues?.id}
          required
        />
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
          defaultValue={defaultValues?.accentColor}
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
          defaultValue={defaultValues?.rarity ?? "4"}
          required
        />
      </div>

      <div className="flex flex-col gap-0.5">
        <Label htmlFor={`${id}:element`}>Rarity</Label>

        <select
          name="element"
          id={`${id}:element`}
          className="select"
          defaultValue={defaultValues?.element ?? undefined}
          required
        >
          {Object.values(GenshinElement).map((e) => (
            <option key={e} value={e}>
              {e}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-0.5">
        <Label htmlFor={`${id}:weapon`}>Weapon</Label>

        <select
          name="weapon"
          id={`${id}:weapon`}
          className="select"
          defaultValue={defaultValues?.weapon ?? undefined}
          required
        >
          {Object.values(GenshinWeapon).map((w) => (
            <option key={w} value={w}>
              {w}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-row items-center gap-2">
        <input
          type="checkbox"
          name="hasVision"
          id={`${id}:hasVision`}
          className="checkbox"
          defaultChecked={defaultValues?.hasVision ?? undefined}
        />

        <Label htmlFor={`${id}:hasVision`} className="select-none">
          Holds Vision
        </Label>
      </div>

      <div className="flex flex-row items-center gap-2">
        <input
          type="checkbox"
          name="isArchon"
          id={`${id}:isArchon`}
          className="checkbox"
          defaultChecked={defaultValues?.isArchon ?? undefined}
        />

        <Label htmlFor={`${id}:isArchon`} className="select-none">
          Archon
        </Label>
      </div>

      <div className="flex flex-col gap-0.5">
        <Label htmlFor={`${id}:association`}>Association</Label>

        <select
          name="association"
          id={`${id}:association`}
          className="select"
          defaultValue={defaultValues?.association ?? undefined}
          required
        >
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
            defaultValue={defaultValues?.birthDay ?? "31"}
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
            defaultValue={defaultValues?.birthMonth ?? "12"}
            required
          />
        </div>
      </div>

      <div className="flex flex-col gap-0.5">
        <Label htmlFor={`${id}:releaseDate`}>Release Date</Label>

        <Input
          name="releaseDate"
          id={`${id}:releaseDate`}
          type="date"
          defaultValue={defaultValues?.releaseDate?.toISOString() ?? undefined}
          required
        />
      </div>

      <div className="flex flex-col gap-0.5">
        <Label htmlFor={`${id}:versionReleased`}>Release Version</Label>
        <Input
          name="versionReleased"
          id={`${id}:versionReleased`}
          placeholder="3.0"
          defaultValue={defaultValues?.versionReleased ?? undefined}
          required
        />
      </div>

      <Button type="submit" className="mt-4">
        Create meta entry
      </Button>
    </Form>
  );
};
