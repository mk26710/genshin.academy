import { NavLink, Outlet } from "@remix-run/react";
import clsx from "clsx";

import { Main } from "~/components/Main";

const links = [
  { to: "./", title: "Published metas" },
  { to: "./meta", title: "Create meta" },
  { to: "./assets", title: "Manage assets" },
  { to: "./entry-new", title: "Create entry" },
  { to: "./entry-edit", title: "Edit entry" },
];

export default function NewCharacterLayout() {
  return (
    <Main>
      <Main.Container>
        <div className="flex min-h-full flex-1 flex-row rounded-box border-gray-200 bg-white px-4 py-5 shadow sm:p-6">
          <nav className="flex w-48 flex-col border-r border-gray-200">
            {links.map(({ to, title }, idx) => (
              <NavLink
                key={idx}
                to={to}
                className={({ isActive }) =>
                  clsx("w-full px-4 pt-2 pb-2 first:pt-4 last:pb-4", isActive && "font-bold")
                }
              >
                {title}
              </NavLink>
            ))}
          </nav>
          <div className="flex flex-1 flex-col pl-4">
            <Outlet />
          </div>
        </div>
      </Main.Container>
    </Main>
  );
}
