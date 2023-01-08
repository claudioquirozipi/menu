import { Button } from "primereact/button";
import { CreateCategoryProps } from "./interfaces/props";
import { ChangeEvent, useState } from "react";
import { InputText } from "primereact/inputtext";
import styles from "./styles.module.css";
import { Toolbar } from "primereact/toolbar";
import { MouseEvent } from "react";

export default function CreateCategory(props: CreateCategoryProps) {
  const [value, setValue] = useState("");
  const { onClick: handleCreate } = props;
  return (
    <div>
      <Toolbar
        className="mb-4"
        left={<p>Categorías</p>}
        right={
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
            <Button label="Crear" onClick={handleOnClick} />
          </form>
        }
      />
    </div>
  );

  function handleOnClick(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (value) handleCreate({ name: value });
    setValue("");
  }
}
