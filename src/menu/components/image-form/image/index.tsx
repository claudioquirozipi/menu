import { Badge } from "primereact/badge";

import { ImageComponentProps } from "./interface";
import styles from "./styles.module.css";

export function ImageComponent(props: ImageComponentProps) {
  const { img, deleteImage } = props;
  return (
    <div className={styles.container}>
      <img
        className={styles.image}
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
