import { useSearchParams } from "@remix-run/react";
import { useMemo } from "react";

type UsePageOptions = {
  current?: number | null;
  max?: number;
};

export const usePaginator = (opts: UsePageOptions = {}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const parsedPage = useMemo(() => Number(searchParams.get("page")), [searchParams]);
  const currentPage = opts?.current ?? parsedPage;

  const firstPage = () => {
    if (currentPage === 1) {
      return;
    }

    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", "1");
    setSearchParams(newSearchParams);
  };

  const prevPage = () => {
    const next = currentPage - 1;
    if (next < 1) {
      return;
    }

    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", `${next}`);
    setSearchParams(newSearchParams);
  };

  const nextPage = () => {
    const next = currentPage + 1;
    if (typeof opts?.max === "number" && next > opts.max) {
      return;
    }

    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", `${next}`);
    setSearchParams(newSearchParams);
  };

  const lastPage = () => {
    if (typeof opts?.max !== "number") {
      return;
    }

    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", `${opts.max}`);
    setSearchParams(newSearchParams);
  };

  return { currentPage, firstPage, prevPage, nextPage, lastPage };
};
