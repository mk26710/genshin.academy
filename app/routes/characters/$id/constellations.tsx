import type { ContextType } from "../$id";

import { useOutletContext } from "@remix-run/react";
import { Fragment } from "react";

import { Container } from "~/components/Container";

export default function CharacterConstellations() {
  const { data, constellations } = useOutletContext<ContextType>();

  return <Fragment>yesyes</Fragment>;
}
