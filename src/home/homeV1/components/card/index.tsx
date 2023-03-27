import Image from "next/image";

import { CardProps } from "./interface";
import styles from "./styles.module.css";

export default function Card(props: CardProps) {
  const { menu } = props;

  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <h5 className={styles.name}>{menu.name}</h5>
        <p className={styles.price}>s/ {menu.price}.00</p>
      </div>
      <Image
        className={styles.image}
        src={process.env.NEXT_PUBLIC_URL_STORAGE_API + menu.images[0]}
        alt=""
        width={310}
        height={310}
      />
    </div>
  );
}
