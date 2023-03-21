import { useState, useRef, MouseEvent, ChangeEvent } from "react";

import { OverlayPanel } from "primereact/overlaypanel";
import { Button } from "primereact/button";

import { Category } from "../../interfaces/category";
import { EditCategoryProps } from "./interfaces/props";
import styles from "./styles.module.css";
import { InputText } from "primereact/inputtext";

export default function EditCategory(props: EditCategoryProps) {
  const { category, onClick } = props;
  const [value, setValue] = useState(category.name);
  const op: any = useRef(null);

  return (
    <>
      <OverlayPanel ref={op}>
        <form className={styles.form}>
          <span className="p-float-label">
            <InputText
              id="Category"
              value={value}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setValue(e.target.value)
              }
            />
            <label htmlFor="Category">Categoría</label>
          </span>
          <Button label="Editar" onClick={handleEdit} />
        </form>
      </OverlayPanel>
      <Button
        label="Editar"
        icon={"pi pi-file-edit"}
        severity="warning"
        onClick={(e: MouseEvent<HTMLButtonElement>) => toggle(e)}
      />
    </>
  );

  function toggle(e: MouseEvent<HTMLButtonElement>) {
    op?.current?.toggle(e);
  }

  function handleEdit(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const categoryEdited = { ...category, name: value };
    onClick(categoryEdited);
    op?.current?.toggle(e);
  }
}
