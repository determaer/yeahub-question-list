import { createContext, use, useState, type ReactNode } from "react";

type FilterStoreValue = StateValue & {
  handleSetPage: (newPage: number) => void;
  handleSetLimit: (newLimit: number) => void;
  handleSetSearchQuery: (newSearchQuery: string) => void;
  handleSetTotal: (newTotal: number) => void;
  handleSetPagesCount: (newPagesCount: number) => void;
  handleSetSpecialization: (newSpec: number | null) => void;
  handleToggleMultipleValue: (
    key: "skills" | "difficulty" | "rating",
    ...value: number[]
  ) => void;
};

type StateValue = {
  page: number;
  pagesCount: number;
  total: number;
  limit: number;
  searchQuery: string;
  specialization: number | null;
  skills: number[];
  difficulty: number[];
  rating: number[];
};

const FilterStoreContext = createContext<FilterStoreValue | null>(null);

export function FilterStoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<StateValue>({
    page: 1,
    limit: 10,
    total: 0,
    pagesCount: 1,
    searchQuery: "",
    specialization: null,
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

  const handleSetSpecialization = (newSpec: number | null) => {
    setState((prev) => ({ ...prev, specialization: newSpec }));
  };

  const handleToggleMultipleValue = (
    key: "skills" | "difficulty" | "rating",
    ...value: number[]
  ) => {
    setState((prev) => {
      if (value.every((prevItem) => prev[key].includes(prevItem)))
        return {
          ...prev,
          page: 1,
          [key]: prev[key].filter((p) => !value.includes(p)),
        };
      else
        return {
          ...prev,
          page: 1,
          [key]: [...prev[key], ...value],
        };
    });
  };

  const value = {
    ...state,
    handleSetPage,
    handleSetLimit,
    handleSetSearchQuery,
    handleSetTotal,
    handleSetPagesCount,
    handleSetSpecialization,
    handleToggleMultipleValue,
  };

  return <FilterStoreContext value={value}>{children}</FilterStoreContext>;
}

export function useFilterStore() {
  const context = use(FilterStoreContext);
  if (!context)
    throw new Error(`useFilterStore must be inside FilterStoreProvider`);
  return context;
}
