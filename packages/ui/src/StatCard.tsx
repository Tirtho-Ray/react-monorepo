import type { ReactNode } from "react";
import styles from "./StatCard.module.css";

type StatCardProps = {
  label: string;
  value: ReactNode;
  helper?: ReactNode;
  trend?: string;
};

export const StatCard = ({ label, value, helper, trend }: StatCardProps) => {
  return (
    <article className={styles.card}>
      <div className={styles.topline}>
        <span>{label}</span>
        {trend ? <strong>{trend}</strong> : null}
      </div>
      <div className={styles.value}>{value}</div>
      {helper ? <p className={styles.helper}>{helper}</p> : null}
    </article>
  );
};
