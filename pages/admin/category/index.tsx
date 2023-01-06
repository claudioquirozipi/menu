import { useEffect, useState } from "react";

import { useSupabaseClient } from "@supabase/auth-helpers-react";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import { Category } from "../../../src/category/interfaces/category";
import Layout from "../../../src/shared/components/layout";
import { Button } from "primereact/button";

export default function CategoryPage() {
  const supabase = useSupabaseClient();
  const [category, setCategory] = useState<any>([]);

  const initialize = async () => {
    const { data, error } = await supabase.from("category").select("*");
    setCategory(data);
  };
  useEffect(() => {
    initialize();
  }, []);

  console.log("category", category);

  return (
    <Layout>
      <DataTable
        value={category}
        dataKey="id"
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25]}
        responsiveLayout="scroll"
      >
        <Column field="name" header="Categoría" sortable></Column>
        <Column
          body={(rowData) => <Button label="Edit" />}
          header="Editar"
        ></Column>
        <Column
          body={(rowData) => <Button label="Delete" />}
          header="Borrar"
        ></Column>
      </DataTable>
    </Layout>
  );
}
