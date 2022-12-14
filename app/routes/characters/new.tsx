import type { ActionArgs, HeadersFunction, LoaderArgs, MetaFunction } from "@remix-run/node";
import type { TypedErrorResponse } from "~/utils/responses.server";

import { Element as TeyvatElement, Weapon, PermissionFlag } from "@prisma/client";
import { Form } from "@remix-run/react";

import { Button } from "~/components/Button";
import { Container } from "~/components/Container";
import { Input } from "~/components/Input";
import { generateMeta } from "~/utils/meta-generator";
import { validateUserPermissions, ValidationMode } from "~/utils/permissions";
import { authorizeUser } from "~/utils/session.server";

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
        </div>

        <div>
          <label htmlFor="character.vision" className="text-xs font-bold uppercase opacity-70">
            Vision
          </label>
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

        <Button variant="light" color="primary" type="submit" className="mt-6 w-full">
          Send
        </Button>
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

  return null;
};
