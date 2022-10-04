import type { FC } from "react";

import { ArrowPathIcon } from "@heroicons/react/24/solid";

import { Container } from "./Container";

export const LoadingSomething: FC = () => {
  return (
    <Container>
      <div className="flex h-full flex-row items-center justify-center gap-2">
        <ArrowPathIcon className="h-8 w-8 animate-spin" />
        <p className="font-semibold">Loading</p>
      </div>
    </Container>
  );
};
