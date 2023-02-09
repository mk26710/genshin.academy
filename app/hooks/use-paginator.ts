import { useSearchParams } from "@remix-run/react";

type UsePageOptions = {
  current?: number | null;
  max?: number;
};

export const usePaginator = (opts: UsePageOptions = {}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const parsedPage = Number(searchParams.get("page"));
  const currentPage = opts?.current ?? parsedPage;

  const activePages = [
    currentPage - 2,
    currentPage - 1,
    currentPage,
    currentPage + 1,
    currentPage + 2,
  ].filter((n) => {
    if (typeof opts.max === "number") {
      return n >= 1 && n <= opts.max;
    }

    return n >= 1;
  });

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

  const selectPage = (num: number) => {
    if (typeof opts.max === "number") {
      if (num > opts.max) return;
    }

    if (num < 1 || num === currentPage) {
      return;
    }

    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", `${num}`);
    setSearchParams(newSearchParams);
  };

  return { currentPage, firstPage, prevPage, nextPage, lastPage, selectPage, activePages };
};
