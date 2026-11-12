import type { ReactNode } from "react";
import styles from "./Main.module.css";

export default function ({ children }: { children: ReactNode }) {
  return <main className={styles.container}>{children}</main>;
}
