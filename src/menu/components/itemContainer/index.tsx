import { ItemContainerProps } from "./interface";
import styles from "./styles.module.css";

export function ItemContainer(props: ItemContainerProps) {
  const { children, category } = props;
  return (
    <div className={styles.container}>
      <h1 className={styles.category}>{category}</h1>
      <div className={styles.children_container}>{children}</div>
    </div>
  );
}
