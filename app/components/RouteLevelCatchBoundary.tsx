import { useCatch } from "@remix-run/react";
import { Container } from "./Container";

export const RouteLevelCatchBoundary = () => {
  const caught = useCatch();

  return (
    <Container className="flex items-center justify-center">
      <div className="flex flex-row flex-wrap">
        <h2 className="mr-2 border-r border-black pr-2 text-2xl font-extrabold">{caught.status}</h2>
        <p className="text-2xl">{caught.data ?? caught.statusText}</p>
      </div>
    </Container>
  );
};
