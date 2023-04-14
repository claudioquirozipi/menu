import Image from "next/image";

import { CardProps } from "./interface";
import styles from "./styles.module.css";
import { useState } from "react";

export default function Card(props: CardProps) {
  const { menu } = props;
  const [visible, setVisible] = useState(false);

  const handleVisible = () => {
    setVisible(!visible);
  };

  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <div
          className={`${styles.imageSeparator} ${
            visible ? styles.imageSeparatorActive : ""
          }`}
        >
          <h5 className={styles.name}>{menu.name}</h5>
        </div>
        <p className={styles.price}>s/ {menu.price}.00</p>
        <p
          className={`${styles.description} ${
            visible ? styles.descriptionActive : ""
          }`}
        >
          La torta Selva Negra es un postre alemán de varios pisos, con bizcocho
          de chocolate, crema batida con licor de cereza, ganache de chocolate
          negro y cerezas frescas. Una combinación perfecta de sabores y
          texturas para ocasiones especiales.
        </p>
      </div>
      <Image
        className={`${styles.image} ${visible ? styles.imageActive : ""}`}
        src={process.env.NEXT_PUBLIC_URL_STORAGE_API + menu.images[0]}
        alt=""
        width={310}
        height={310}
      />
      <div
        className={`${styles.svg} ${visible ? styles.svgActive : ""}`}
        onClick={handleVisible}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
        >
          <g strokeWidth={5} fill="#fff">
            <path d="M6.293 8.293a1 1 0 0 1 1.414 0L12 12.586l4.293-4.293a1 1 0 0 1 1.414 1.414l-5 5a1 1 0 0 1-1.414 0l-5-5a1 1 0 0 1 0-1.414z" />
          </g>
        </svg>
      </div>
    </div>
  );
}
