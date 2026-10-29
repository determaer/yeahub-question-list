import { createContext, use, useState, type ReactNode } from "react";

type FilterStoreValue = {
  page: number;
  limit: number;
  searchQuery: string;
  specializations: unknown[];
  skills: unknown[];
  difficulty: unknown[];
  rating: unknown[];
  handleSetPage: (newPage: number) => void;
  handleSetLimit: (newLimit: number) => void;
  handleSetSearchQuery: (newSearchQuery: string) => void;
};

const FilterStoreContext = createContext<FilterStoreValue | null>(null);

export function FilterStoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState({
    page: 0,
    limit: 10,
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

  const value = {
    ...state,
    handleSetPage,
    handleSetLimit,
    handleSetSearchQuery,
  };

  return <FilterStoreContext value={value}>{children}</FilterStoreContext>;
}

export function useFilterStore() {
  const context = use(FilterStoreContext);
  if (!context)
    throw new Error(`useFilterStore must be inside FilterStoreProvider`);
  return context;
}
