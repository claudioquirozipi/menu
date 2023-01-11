import Layout from "../../../src/shared/components/layout";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useEffect, useState } from "react";

import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Button } from "primereact/button";

export default function Menu() {
  const supabase = useSupabaseClient();
  const [menu, setMenu] = useState<any>([]);

  const initialize = async () => {
    const { data, error } = await supabase.from("menu").select("*");
    setMenu(data);
  };
  useEffect(() => {
    initialize();
  }, []);

  return (
    <Layout>
      <h1>Menu</h1>

      <DataTable value={menu}>
        <Column header="Nombre" field="name" />
        <Column header="Precio" field="price" />
        <Column header="Categoría" field="category" />
        <Column
          field="image"
          header="Image"
          body={(rowData) => (
            <img
              style={{ width: "150px" }}
              src={`https://hxuqbrrlfvuyhhdldwme.supabase.co/storage/v1/object/public/menus/${rowData?.images[0]}`}
              // onError={(e) =>
              //   (e.target.src =
              //     "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
              // }
              alt={rowData.image}
              className="product-image"
            />
          )}
        ></Column>
        <Column
          body={(rowData) => <Button label="Crear" onClick={() => {}} />}
          header="Editar"
        ></Column>
        <Column
          body={(rowData) => <Button label="Crear" onClick={() => {}} />}
          header="Borrar"
        ></Column>
      </DataTable>

      {menu.map((m: any) => (
        <div key={m.id}>
          <h1>{m.name}</h1>
        </div>
      ))}
    </Layout>
  );
}

const imageBodyTemplate = (rowData: any) => {
  console.log("data", rowData);
  return (
    <img
      src={`images/product/${rowData.image}`}
      // onError={(e) =>
      //   (e.target.src =
      //     "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
      // }
      alt={rowData.image}
      className="product-image"
    />
  );
};
