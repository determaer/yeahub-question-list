import { createContext, use, useState, type ReactNode } from "react";

type FilterStoreValue = {
  page: number;
  pagesCount: number;
  total: number;
  limit: number;
  searchQuery: string;
  specializations: unknown[];
  skills: unknown[];
  difficulty: unknown[];
  rating: unknown[];
  handleSetPage: (newPage: number) => void;
  handleSetLimit: (newLimit: number) => void;
  handleSetSearchQuery: (newSearchQuery: string) => void;
  handleSetTotal: (newTotal: number) => void;
  handleSetPagesCount: (newPagesCount: number) => void;
};

const FilterStoreContext = createContext<FilterStoreValue | null>(null);

export function FilterStoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pagesCount: 1,
    searchQuery: "",
    specializations: [],
    skills: [],
    difficulty: [],
    rating: [],
  });

  const handleSetPage = (newPage: number) => {
    setState((prev) => ({ ...prev, page: newPage }));
  };

  const handleSetLimit = (newLimit: number) => {
    setState((prev) => ({ ...prev, limit: newLimit }));
  };

  const handleSetSearchQuery = (newSearchQuery: string) => {
    setState((prev) => ({ ...prev, searchQuery: newSearchQuery }));
  };

  const handleSetTotal = (newTotal: number) => {
    setState((prev) => ({ ...prev, total: newTotal }));
  };

  const handleSetPagesCount = (newPagesCount: number) => {
    setState((prev) => ({ ...prev, pagesCount: newPagesCount }));
  };

  const value = {
    ...state,
    handleSetPage,
    handleSetLimit,
    handleSetSearchQuery,
    handleSetTotal,
    handleSetPagesCount,
  };

  return <FilterStoreContext value={value}>{children}</FilterStoreContext>;
}

export function useFilterStore() {
  const context = use(FilterStoreContext);
  if (!context)
    throw new Error(`useFilterStore must be inside FilterStoreProvider`);
  return context;
}
