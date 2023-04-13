import { useState, useRef, MouseEvent, ChangeEvent } from "react";

import { OverlayPanel } from "primereact/overlaypanel";
import { Button } from "primereact/button";

import { Category } from "../../interfaces/category";
import { EditCategoryProps } from "./interfaces/props";
import styles from "./styles.module.css";
import { InputText } from "primereact/inputtext";

export default function EditCategory(props: EditCategoryProps) {
  const { category, onClick } = props;
  const [name, setName] = useState(category.name);
  const [order, setOrder] = useState<number>(category.order);
  const op: any = useRef(null);

  return (
    <>
      <OverlayPanel ref={op}>
        <form className={styles.form}>
          <span className="p-float-label">
            <InputText
              id="Category"
              value={name}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
            />
            <label htmlFor="Category">Categoría</label>
          </span>
          <span className="p-float-label">
            <InputText
              id="Order"
              type="number"
              value={order.toString()}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setOrder(Number(e.target.value))
              }
            />
            <label htmlFor="Order">Order</label>
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
    const categoryEdited = { ...category, name, order };
    onClick(categoryEdited);
    op?.current?.toggle(e);
  }
}
