import { CardProps } from "./interface";
import styles from "./styles.module.css";

export function Card(props: CardProps) {
  const { menu } = props;
  return (
    <div className={styles.container}>
      <img
        className={styles.image}
        src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/${menu.images[0]}`}
        alt=""
      />
      <h3 className={styles.name}>{menu.name}</h3>
      <p className={styles.price}>S/. {menu.price}</p>
      {/* <p>{menu.description}</p> */}
    </div>
  );
}
