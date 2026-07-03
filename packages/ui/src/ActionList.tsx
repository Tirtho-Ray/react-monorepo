import styles from "./ActionList.module.css";

export type ActionItem = {
  label: string;
  meta: string;
  status: "done" | "active" | "queued";
};

type ActionListProps = {
  items: ActionItem[];
};

export const ActionList = ({ items }: ActionListProps) => {
  return (
    <div className={styles.list}>
      {items.map((item) => (
        <div className={styles.item} key={item.label}>
          <span className={[styles.dot, styles[item.status]].join(" ")} />
          <div>
            <strong>{item.label}</strong>
            <p>{item.meta}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
