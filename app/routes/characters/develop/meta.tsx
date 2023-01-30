import type { CharacterMeta } from "@prisma/client";
import type { ActionArgs, HeadersFunction, LoaderArgs } from "@remix-run/node";
import type { ChangeEvent, FormEvent } from "react";
import type { CharacterMetaForm as FormKeys } from "~/schemas/forms/new-character-meta.server";

import { PencilSquareIcon, PlusCircleIcon } from "@heroicons/react/20/solid";
import { StarIcon } from "@heroicons/react/24/solid";
import { Association, Element as GenshinElement, Weapon } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { json } from "@remix-run/node";
import { useFetcher, useLoaderData, useSearchParams } from "@remix-run/react";
import clsx from "clsx";
import { Fragment, useEffect, useId, useRef, useState } from "react";

import { Button } from "~/components/Button";
import { Input } from "~/components/Input";
import { Label } from "~/components/Label";
import { prisma } from "~/db/prisma.server";
import { CharacterMetaFormSchema } from "~/schemas/forms/new-character-meta.server";
import { permissions, validateUserPermissions, ValidationMode } from "~/utils/permissions";
import { badRequest } from "~/utils/responses.server";
import { authorizeUser } from "~/utils/session.server";

export const headers: HeadersFunction = () => ({
  "X-Robots-Tag": "noindex",
});

export const loader = async ({ request }: LoaderArgs) => {
  await authorizeUser(request, async (user) =>
    validateUserPermissions(user, permissions("NEW_CHARACTER"), ValidationMode.SOFT),
  );

  const metaIds = await prisma.characterMeta.findMany({
    select: {
      id: true,
    },
    orderBy: {
      id: "asc",
    },
  });
  const existingIds = metaIds.map((entry) => entry.id);

  const url = new URL(request.url);
  const selectedId = url.searchParams.get("id");

  const selectedMeta =
    typeof selectedId !== "string"
      ? null
      : await prisma.characterMeta.findUnique({
          where: {
            id: selectedId,
          },
        });

  return json({ existingIds, selectedMeta });
};

export default function NewCharacterMeta() {
  const customId = useId();

  const htmlId = (s: string) => `${customId}${s}:`;
  const formName = (name: keyof CharacterMeta) => name;

  const [_searchParams, setSearchParams] = useSearchParams();

  // initial data
  const { existingIds, selectedMeta } = useLoaderData<typeof loader>();

  useEffect(() => {
    console.log({ existing: existingIds, selectedMeta });
  }, [existingIds, selectedMeta]);

  // editor mode
  const [isEditMode, setEditMode] = useState(false);

  const switchMode = () => {
    setId("");
    setSearchParams({});
    setEditMode((s) => !s);
  };

  // form
  const fetcher = useFetcher<typeof action>();

  useEffect(() => {
    console.info(fetcher.data);
  }, [fetcher.data]);

  const formRef = useRef<HTMLFormElement>(null);

  const [id, setId] = useState<FormKeys["id"]>("");
  const [accentColor, setAccentColor] = useState<FormKeys["accentColor"]>("#c8a5fa");
  const [rarity, setRarity] = useState<FormKeys["rarity"]>(4);
  const [element, setElement] = useState<string>("CRYO");
  const [weapon, setWeapon] = useState<string>("SWORD");
  const [hasVision, setHasVision] = useState(false);
  const [isArchon, setIsArchon] = useState(false);
  const [association, setAssociation] = useState<string>("INAZUMA");
  const [birthDay, setBirthDay] = useState<number>(1);
  const [birthMonth, setBirthMonth] = useState<number>(1);
  const [releaseDate, setReleaseDate] = useState<string>("");
  const [versionReleased, setVersionReleased] = useState<FormKeys["versionReleased"]>("");

  const submitCreation = () => {
    fetcher.submit(formRef.current, {
      method: "post",
      replace: true,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isEditMode) {
      submitCreation();
    }
  };

  const handleSelectExistingId = (e: ChangeEvent<HTMLSelectElement>) => {
    setId(e.target.value);

    if (isEditMode) {
      setSearchParams({ id: e.target.value });
    }
  };

  useEffect(() => {
    if (fetcher.data?.success === true) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [fetcher.data?.success]);

  // todo: prefill form with selectedMeta

  return (
    <div>
      {fetcher.data?.success === true && (
        <div className="rounded-box border-green-500 bg-green-100 px-4 py-5 text-green-500 sm:p-6">
          Meta data was successfully created!
        </div>
      )}

      <div className="mb-4 border-b border-gray-300 pb-4">
        <label className="text-sm font-semibold text-gray-700">Editor Mode</label>
        <Button
          onClick={switchMode}
          color="semiblack"
          className="flex items-center justify-center gap-2"
        >
          {isEditMode && (
            <>
              <PencilSquareIcon className="h-5 w-5" />
              <span>Currently in edit mode</span>
            </>
          )}
          {!isEditMode && (
            <>
              <PlusCircleIcon className="h-5 w-5" />
              <span>Currently in create mode</span>
            </>
          )}
        </Button>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          {!isEditMode && (
            <Fragment>
              <Label htmlFor={htmlId("id")}>ID</Label>
              <Input
                id={htmlId("id")}
                name={formName("id")}
                placeholder="Character ID"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
            </Fragment>
          )}

          {isEditMode && (
            <Fragment>
              <Label htmlFor={htmlId("id")}>ID</Label>
              <select
                id={htmlId("id")}
                name={formName("id")}
                placeholder="Character ID"
                className="input w-full"
                value={id}
                onChange={handleSelectExistingId}
              >
                <option disabled value="">
                  -- select an existing character --
                </option>
                {existingIds.map((id) => (
                  <option key={id} value={id}>
                    {id}
                  </option>
                ))}
              </select>
            </Fragment>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <Label>Accent Color</Label>
          <Input
            name={formName("accentColor")}
            value={accentColor}
            onChange={(e) => setAccentColor(e.target.value)}
            style={{ backgroundColor: accentColor }}
          />
        </div>

        <div>
          <input name={formName("rarity")} value={rarity} hidden readOnly />
          <Label>Rarity</Label>
          <div className="flex flex-row text-gray-300">
            {[1, 2, 3, 4, 5].map((num, idx) => (
              <StarIcon
                key={idx}
                onClick={() => setRarity(num)}
                className={clsx("h-6 w-6 cursor-pointer", num <= rarity && "text-orange-500")}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor={htmlId("element")} className="text-sm">
            Element
          </label>

          <select
            name={formName("element")}
            id={htmlId("element")}
            className="input w-full"
            value={element}
            onChange={(e) => setElement(e.target.value)}
          >
            {Object.values(GenshinElement).map((e, idx) => (
              <option value={e} key={idx}>
                {e}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor={htmlId("weapon")} className="text-sm">
            Weapon
          </label>
          <select
            name={formName("weapon")}
            id={htmlId("weapon")}
            className="input w-full"
            value={weapon}
            onChange={(e) => setWeapon(e.target.value)}
          >
            {Object.values(Weapon).map((w, idx) => (
              <option value={w} key={idx + 10}>
                {w}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center">
          <div className="flex flex-row justify-center">
            <input
              id={htmlId("hasVision")}
              name={formName("hasVision")}
              type="checkbox"
              className="form-checkbox h-6 w-6 rounded-box border-gray-300 text-primary-600 focus:ring-primary-500"
              checked={hasVision}
              onChange={(e) => setHasVision(e.target.checked)}
            />
          </div>
          <div className="ml-2 text-sm">
            <label htmlFor={htmlId("hasVision")} className="select-none font-medium text-gray-700">
              has vision?
            </label>
          </div>
        </div>

        <div className="flex items-center">
          <div className="flex flex-row justify-center">
            <input
              id={htmlId("isArchon")}
              name={formName("isArchon")}
              type="checkbox"
              className="form-checkbox h-6 w-6 rounded-box border-gray-300 text-primary-600 focus:ring-primary-500"
              checked={isArchon}
              onChange={(e) => setIsArchon(e.target.checked)}
            />
          </div>
          <div className="ml-2 text-sm">
            <label htmlFor={htmlId("isArchon")} className="select-none font-medium text-gray-700">
              is archon?
            </label>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor={htmlId("association")} className="text-sm font-semibold">
            Association
          </label>
          <select
            name={formName("association")}
            id={htmlId("association")}
            className="input w-full"
            value={association}
            onChange={(e) => setAssociation(e.target.value)}
          >
            {Object.values(Association).map((a, idx) => (
              <option value={a} key={idx + 20}>
                {a}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2 lg:flex-row">
          <div className="flex flex-col gap-1">
            <label htmlFor={htmlId("birthDay")} className="text-sm font-semibold">
              Birth day
            </label>
            <Input
              name={formName("birthDay")}
              id={htmlId("birthDay")}
              placeholder="Character birth day"
              type="number"
              min={1}
              max={31}
              step={1}
              value={birthDay}
              onChange={(e) => setBirthDay(e.target.valueAsNumber)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor={htmlId("birthDay")} className="text-sm font-semibold">
              Birth day
            </label>
            <Input
              name={formName("birthMonth")}
              id={htmlId("birthMonth")}
              placeholder="Character birth month"
              type="number"
              min={1}
              max={12}
              step={1}
              value={birthMonth}
              onChange={(e) => setBirthMonth(e.target.valueAsNumber)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor={htmlId("releaseDate")} className="text-sm font-semibold">
            Release date
          </label>
          <Input
            name={formName("releaseDate")}
            id={htmlId("releaseDate")}
            placeholder="Character release date"
            type="date"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor={htmlId("versionReleased")} className="text-sm font-semibold">
            Version release at
          </label>
          <Input
            name={formName("versionReleased")}
            id={htmlId("versionReleased")}
            placeholder="3.4"
            value={versionReleased}
            onChange={(e) => setVersionReleased(e.target.value)}
          />
        </div>

        <Button color="primary" variant="light">
          Create
        </Button>
      </form>
    </div>
  );
}

export const action = async ({ request }: ActionArgs) => {
  await authorizeUser(request, async (user) =>
    validateUserPermissions(user, permissions("NEW_CHARACTER"), ValidationMode.SOFT),
  );

  const formData = await request.formData();
  const validation = await CharacterMetaFormSchema.safeParseAsync(Object.fromEntries(formData));

  if (!validation.success) {
    return badRequest({
      success: false,
      error: {
        message: "Validation Failure",
        cause: validation.error,
      },
    });
  }

  await prisma
    .$transaction(async (tx) => {
      const {
        id,
        accentColor,
        rarity,
        element,
        weapon,
        birthDay,
        birthMonth,
        association,
        hasVision,
        isArchon,
        releaseDate,
        versionReleased,
      } = validation.data;

      if (request.method === "POST") {
        await tx.characterMeta.create({
          data: {
            id,
            accentColor,
            rarity,
            element,
            weapon,
            birthDay,
            birthMonth,
            association,
            hasVision,
            isArchon,
            releaseDate,
            versionReleased,
          },
        });
      }

      if (request.method === "PATCH") {
        await tx.characterMeta.update({
          where: {
            id,
          },
          data: {
            accentColor,
            rarity,
            element,
            weapon,
            birthDay,
            birthMonth,
            association,
            hasVision,
            isArchon,
            releaseDate,
            versionReleased,
          },
        });
      }
    })
    .catch((e) => {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === "P2002") {
          return badRequest({
            error: {
              message: e.message,
              cause: null,
            },
          });
        }
      }
    });

  return json({
    success: true,
    error: null,
  });
};
