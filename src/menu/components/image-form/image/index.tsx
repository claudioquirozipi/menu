import Image from "next/image";

import { Badge } from "primereact/badge";

import { ImageComponentProps } from "./interface";
import styles from "./styles.module.css";

export function ImageComponent(props: ImageComponentProps) {
  const { img, deleteImage, imgSelected, setImgSelected } = props;
  return (
    <div className={styles.container} onClick={() => setImgSelected(img.name)}>
      <Image
        className={`${styles.image} ${
          img.name === imgSelected ? styles.selected : ""
        }`}
        key={img.id}
        src={`https://hxuqbrrlfvuyhhdldwme.supabase.co/storage/v1/object/public/menus/${img.name}`}
        width={100}
        height={100}
        alt="image"
      />
      <Badge
        value="X"
        className={styles.badge}
        onClick={() => deleteImage(img.name)}
      ></Badge>
    </div>
  );
}
