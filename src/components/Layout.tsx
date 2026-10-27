import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <div className="yql__layout-wrapper">{children}</div>;
}
