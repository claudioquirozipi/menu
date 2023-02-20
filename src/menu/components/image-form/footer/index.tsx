import { Button } from "primereact/button";

import { FooterProps } from "./interface";
import styles from "./styles.module.css";

export function Footer(props: FooterProps) {
  const { uploadImage } = props;
  return (
    <div className={styles.container}>
      <input type={"file"} onChange={(e) => uploadImage(e)} />
      <Button label="Aceptar" icon="pi pi-external-link" onClick={() => {}} />
    </div>
  );
}
