import { Button } from "primereact/button";

import { DeleteCategoryProps } from "./interfaces/props";

export default function DeleteCategory(props: DeleteCategoryProps) {
  const { id, onClick } = props;

  return (
    <Button
      label="Delete"
      icon={"pi pi-times"}
      severity="danger"
      onClick={() => handleDelete(id)}
    />
  );

  function handleDelete(id: string) {
    onClick(id);
  }
}
