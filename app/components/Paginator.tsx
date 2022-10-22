import type { FunctionComponent } from "react";

import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/20/solid";
import { useSearchParams } from "@remix-run/react";

type PaginatorProps = {
  page: number;
  totalPages: number;
};

export const Paginator: FunctionComponent<PaginatorProps> = ({ page, totalPages }) => {
  const [search, setSearch] = useSearchParams();

  const handlePageDecrement = () => {
    if (page <= 1) {
      return;
    }

    const newSearch = new URLSearchParams(search);
    newSearch.set("page", (page - 1).toString());

    setSearch(newSearch);
  };

  const handlePageIncrement = () => {
    const nextPage = page + 1;
    if (nextPage > totalPages) {
      return;
    }

    const newSearch = new URLSearchParams(search);
    newSearch.set("page", nextPage.toString());

    setSearch(newSearch);
  };

  const handlePageFirst = () => {
    if (page === 1) {
      return;
    }

    const newSearch = new URLSearchParams(search);
    newSearch.set("page", "1");

    setSearch(newSearch);
  };

  const handlePageLast = () => {
    if (page === totalPages) {
      return;
    }

    const newSearch = new URLSearchParams(search);
    newSearch.set("page", totalPages.toString());

    setSearch(newSearch);
  };

  return (
    <div className="flex flex-row items-center justify-center gap-1">
      <button onClick={handlePageFirst} className="button w-fit p-1.5">
        <ChevronDoubleLeftIcon className="h-5 w-5" />
      </button>

      <button onClick={handlePageDecrement} className="button w-fit p-1.5">
        <ChevronLeftIcon className="h-5 w-5" />
      </button>

      <span className="font-medium">
        {page} / {totalPages}
      </span>

      <button onClick={handlePageIncrement} className="button w-fit p-1.5">
        <ChevronRightIcon className="h-5 w-5" />
      </button>

      <button onClick={handlePageLast} className="button w-fit p-1.5">
        <ChevronDoubleRightIcon className="h-5 w-5" />
      </button>
    </div>
  );
};
