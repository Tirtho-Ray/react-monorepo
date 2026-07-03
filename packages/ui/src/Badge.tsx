import type { ReactNode } from "react";
import styles from "./Badge.module.css";

type BadgeTone = "success" | "info" | "warning";

type BadgeProps = {
  children: ReactNode;
  tone?: BadgeTone;
};

export const Badge = ({ children, tone = "info" }: BadgeProps) => {
  return <span className={[styles.badge, styles[tone]].join(" ")}>{children}</span>;
};
