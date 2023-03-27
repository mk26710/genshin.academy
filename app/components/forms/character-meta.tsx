import type { FC } from "react";
import type { CharacterMetaForm as CharacterMetaFormSchema } from "~/routes/characters.new.meta/form-schema.server";

import {
  Association as GenshinAssociation,
  Element as GenshinElement,
  Weapon as GenshinWeapon,
} from "@prisma/client";
import { Form } from "@remix-run/react";
import { useId } from "react";

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
    <Form method="post" className="daisy-card bg-base-200">
      <div className="daisy-card-body flex flex-col gap-2">
        <h2 className="font-semibold">
          {props.editMode !== true && "New Character: Meta"}
          {props.editMode === true && "Editing Character: Meta"}
        </h2>
        <p className="mb-4 text-sm">
          {props.editMode !== true &&
            "This form will create a new character meta entry and after that you'll be able to create public entry data in specific locales"}
          {props.editMode === true && "This form lets you edit meta data of an existing character"}
        </p>

        <div className="daisy-form-control">
          <label htmlFor={id + "id"} className="daisy-label">
            <span className="daisy-label-text">Character ID</span>
          </label>
          <input
            placeholder="e.g. kamisato-ayaka"
            id={id + "id"}
            name="id"
            defaultValue={props.defaultValues?.id}
            readOnly={props.notEditableId}
            required
            className="daisy-input-bordered daisy-input select-none"
          />
        </div>

        <div className="daisy-form-control">
          <label htmlFor={id + "accentColor"} className="daisy-label">
            <span className="daisy-label-text">Accent Color</span>
          </label>
          <input
            placeholder="#ff0000"
            id={id + "accentColor"}
            name="accentColor"
            defaultValue={props.defaultValues?.accentColor ?? undefined}
            className="daisy-input-bordered daisy-input select-none"
            required
          />
        </div>

        <div className="daisy-form-control">
          <label htmlFor={id + "rarity"} className="daisy-label">
            <span className="daisy-label-text">Rarity</span>
          </label>
          <input
            id={id + "rarity"}
            name="rarity"
            type="number"
            min="4"
            max="5"
            step="1"
            defaultValue={props.defaultValues?.rarity ?? "4"}
            className="daisy-input-bordered daisy-input select-none"
            required
          />
        </div>

        <div className="daisy-form-control">
          <label htmlFor={id + "element"} className="daisy-label">
            <span className="daisy-label-text">Element</span>
          </label>
          <select
            className="daisy-select-bordered daisy-select"
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

        <div className="daisy-form-control">
          <label htmlFor={id + "weapon"} className="daisy-label">
            <span className="daisy-label-text">Weapon</span>
          </label>
          <select
            className="daisy-select-bordered daisy-select"
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

        <div className="flex flex-col">
          <div className="daisy-form-control flex-row items-center gap-2">
            <input
              type="checkbox"
              className="daisy-checkbox-primary daisy-checkbox"
              id={id + "hasVision"}
              name="hasVision"
              defaultChecked={props.defaultValues?.hasVision ?? undefined}
            />
            <label htmlFor={id + "hasVision"} className="daisy-label select-none">
              <span className="daisy-label-text">Vision Owner</span>
            </label>
          </div>

          <div className="daisy-form-control flex-row items-center gap-2">
            <input
              type="checkbox"
              className="daisy-checkbox-primary daisy-checkbox"
              id={id + "isArchon"}
              name="isArchon"
              defaultChecked={props.defaultValues?.isArchon ?? undefined}
            />
            <label htmlFor={id + "isArchon"} className="daisy-label select-none">
              <span className="daisy-label-text">Archon</span>
            </label>
          </div>
        </div>

        <div className="daisy-form-control">
          <label htmlFor={id + "association"} className="daisy-label ">
            <span className="daisy-label-text">Association</span>
          </label>
          <select
            className="daisy-select-bordered daisy-select"
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
          <div className="daisy-form-control">
            <label htmlFor={id + "birthDay"} className="daisy-label">
              <span className="daisy-label-text">Day of Birth</span>
            </label>
            <input
              type="number"
              min="1"
              max="31"
              step="1"
              defaultValue={props.defaultValues?.birthDay ?? "31"}
              id={id + "birthDay"}
              name="birthDay"
              className="daisy-input-bordered daisy-input select-none"
            />
          </div>
          <div className="daisy-form-control">
            <label htmlFor={id + "birthMonth"} className="daisy-label">
              <span className="daisy-label-text">Month of Birth</span>
            </label>
            <input
              type="number"
              min="1"
              max="12"
              step="1"
              defaultValue={props.defaultValues?.birthMonth ?? "12"}
              id={id + "birthMonth"}
              name="birthMonth"
              className="daisy-input-bordered daisy-input select-none"
            />
          </div>
        </div>

        <div className="daisy-form-control">
          <label htmlFor={id + "releaseDate"} className="daisy-label">
            <span className="daisy-label-text">Release Date</span>
          </label>
          <input
            type="date"
            id={id + "releaseDate"}
            name="releaseDate"
            required
            defaultValue={props.defaultValues?.releaseDate ?? undefined}
            className="daisy-input-bordered daisy-input w-fit"
          />
        </div>

        <div className="daisy-form-control">
          <label htmlFor={id + "versionReleased"} className="daisy-label">
            <span className="daisy-label-text">Release Release</span>
          </label>
          <input
            id={id + "versionReleased"}
            name="versionReleased"
            placeholder="2.0"
            defaultValue={props.defaultValues?.versionReleased}
            className="daisy-input-bordered daisy-input"
          />
        </div>

        <button type="submit" className="daisy-btn-primary daisy-btn mt-4">
          Submit
        </button>
      </div>
    </Form>
  );
};
