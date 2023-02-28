import { NavLink, Outlet } from "@remix-run/react";
import clsx from "clsx";

import { Main } from "~/components/main";

export const EDITOR_LINKS = [
  { to: "./new/meta", title: "New Meta" },
  { to: "./new/record", title: "New Record" },
];

export default function EditorLayout() {
  return (
    <Main>
      <Main.Container className="flex flex-1 flex-col">
        <div className="grid flex-1 grid-cols-[auto_1fr] grid-rows-1 gap-6 rounded-box bg-white px-5 py-6 shadow sm:p-6">
          <div className="flex w-40 flex-col">
            {EDITOR_LINKS.map((link) => (
              <NavLink
                key={link.title}
                to={link.to}
                className={({ isActive }) =>
                  clsx("rounded-box px-3 py-2 font-semibold", isActive && "bg-gray-100")
                }
              >
                {link.title}
              </NavLink>
            ))}
          </div>
          <Outlet />
        </div>
      </Main.Container>
    </Main>
  );
}
