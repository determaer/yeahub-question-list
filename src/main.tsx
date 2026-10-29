import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { FilterStoreProvider } from "./store/filterStore.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FilterStoreProvider>
      <App />
    </FilterStoreProvider>
  </StrictMode>,
);

