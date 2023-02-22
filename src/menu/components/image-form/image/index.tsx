import { Badge } from "primereact/badge";

import { ImageComponentProps } from "./interface";
import styles from "./styles.module.css";

export function ImageComponent(props: ImageComponentProps) {
  const { img, deleteImage, imgSelected, setImgSelected } = props;
  return (
    <div className={styles.container} onClick={() => setImgSelected(img.name)}>
      <img
        className={`${styles.image} ${
          img.name === imgSelected ? styles.selected : ""
        }`}
        key={img.id}
        src={`https://hxuqbrrlfvuyhhdldwme.supabase.co/storage/v1/object/public/menus/${img.name}`}
        alt=""
      />
      <Badge
        value="X"
        className={styles.badge}
        onClick={() => deleteImage(img.name)}
      ></Badge>
    </div>
  );
}
