import type { FC } from "react";
import type { CharacterMetaForm as CharacterMetaFormSchema } from "~/routes/characters.new.meta/form-schema.server";

import {
  Association as GenshinAssociation,
  Element as GenshinElement,
  Weapon as GenshinWeapon,
} from "@prisma/client";
import { Form } from "@remix-run/react";
import { useId } from "react";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

type SharedProps = {
  notEditableId?: boolean;
};

type CharacterMetaFormSchemaValues = Omit<CharacterMetaFormSchema, "releaseDate"> & {
  releaseDate: string;
};

type NewMetaProps = SharedProps & {
  editMode: false | undefined | null;
  defaultValues?: undefined | null;
};

type EditMetaProps = SharedProps & {
  editMode: true;
  defaultValues: CharacterMetaFormSchemaValues;
};

type Props = NewMetaProps | EditMetaProps;

export const CharacterMetaForm: FC<Props> = (props) => {
  const id = useId();

  return (
    <Form
      method="post"
      className="flex flex-col gap-2 rounded-box bg-white p-4 py-5 shadow sm:p-6 "
    >
      <h2 className="font-semibold text-gray-900">
        {props.editMode !== true && "New Character: Meta"}
        {props.editMode === true && "Editing Character: Meta"}
      </h2>
      <p className="mb-4 text-sm text-gray-700">
        {props.editMode !== true &&
          "This form will create a new character meta entry and after that you'll be able to create public entry data in specific locales"}
        {props.editMode === true && "This form lets you edit meta data of an existing character"}
      </p>

      <div className="flex flex-col gap-1">
        <Label htmlFor={id + "id"}>Character ID</Label>
        <input
          placeholder="e.g. kamisato-ayaka"
          id={id + "id"}
          name="id"
          defaultValue={props.defaultValues?.id}
          readOnly={props.notEditableId}
          required
          className="input select-none read-only:bg-gray-200 read-only:text-gray-700 read-only:hover:cursor-not-allowed"
        />
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor={id + "accentColor"}>Accent Color</Label>
        <Input
          placeholder="#ff0000"
          id={id + "accentColor"}
          name="accentColor"
          defaultValue={props.defaultValues?.accentColor ?? undefined}
          required
        />
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
          defaultValue={props.defaultValues?.rarity ?? "4"}
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor={id + "element"}>Element</Label>
        <select
          className="select"
          id={id + "element"}
          name="element"
          defaultValue={props.defaultValues?.element ?? -1}
          required
        >
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
        <select
          className="select"
          id={id + "weapon"}
          name="weapon"
          defaultValue={props.defaultValues?.weapon ?? -1}
          required
        >
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
          <input
            type="checkbox"
            className="checkbox"
            id={id + "hasVision"}
            name="hasVision"
            defaultChecked={props.defaultValues?.hasVision ?? undefined}
          />
          <Label htmlFor={id + "hasVision"} className="select-none">
            Vision Owner
          </Label>
        </div>

        <div className="flex flex-row items-center gap-2">
          <input
            type="checkbox"
            className="checkbox"
            id={id + "isArchon"}
            name="isArchon"
            defaultChecked={props.defaultValues?.isArchon ?? undefined}
          />
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
          defaultValue={props.defaultValues?.association ?? -1}
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
            defaultValue={props.defaultValues?.birthDay ?? "31"}
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
            defaultValue={props.defaultValues?.birthMonth ?? "12"}
            id={id + "birthMonth"}
            name="birthMonth"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor={id + "releaseDate"}>Release Date</Label>
        <Input
          type="date"
          id={id + "releaseDate"}
          name="releaseDate"
          className="w-fit"
          required
          defaultValue={props.defaultValues?.releaseDate ?? undefined}
        />
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor={id + "versionReleased"}>Release Release</Label>
        <Input
          id={id + "versionReleased"}
          name="versionReleased"
          placeholder="2.0"
          defaultValue={props.defaultValues?.versionReleased}
        />
      </div>

      <Button type="submit" variant="filled" color="primary">
        Submit
      </Button>
    </Form>
  );
};
