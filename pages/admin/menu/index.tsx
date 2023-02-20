import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import { DataTable } from "primereact/datatable";
import { Toolbar } from "primereact/toolbar";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Avatar } from "primereact/avatar";
import { Toast } from "primereact/toast";

import Layout from "../../../src/shared/components/layout";
import { Menu } from "../../../src/menu/interfaces/menu";

export default function MenuPage() {
  const supabase = useSupabaseClient();
  const toast: any = useRef(null);
  const router = useRouter();
  const [menu, setMenu] = useState<Menu[]>([]);

  const initialize = async () => {
    const { data, error } = await supabase.from("menu").select("*");
    if (data) setMenu(data);
  };
  useEffect(() => {
    initialize();
  }, []);

  return (
    <Layout>
      <Toolbar
        className="mb-4"
        left={<p>Categorías</p>}
        right={
          <Button
            label="Crear"
            onClick={() => router.push("/admin/menu/create")}
          />
        }
      />

      <DataTable value={menu}>
        <Column header="Nombre" field="name" />
        <Column header="Precio" field="price" />
        <Column header="Categoría" field="category" />
        <Column
          field="image"
          header="Image"
          body={(rowData) => (
            // <img
            //   style={{ width: "150px" }}
            //   src={`https://hxuqbrrlfvuyhhdldwme.supabase.co/storage/v1/object/${rowData?.images[0]}`}
            //   alt={rowData.image}
            //   className="product-image"
            // />
            <Avatar
              image={`https://hxuqbrrlfvuyhhdldwme.supabase.co/storage/v1/object/${rowData?.images[0]}`}
              size="large"
              shape="circle"
            />
          )}
        ></Column>
        <Column
          body={(rowData) => (
            <Button
              label="Editar"
              onClick={() => router.push(`/admin/menu/edit/${rowData.id}`)}
            />
          )}
          header="Editar"
        ></Column>
        <Column
          body={(rowData) => (
            <Button label="Borrar" onClick={() => deleteMenu(rowData.id)} />
          )}
          header="Borrar"
        ></Column>
      </DataTable>
      <Toast ref={toast} />
      <ConfirmDialog />
    </Layout>
  );
  async function deleteMenu(id: string) {
    console.log("delete", id);
    const confirm = () => {
      confirmDialog({
        message: "Are you sure you want to proceed?",
        header: "Confirmation",
        icon: "pi pi-exclamation-triangle",
        accept: async () => {
          const { data, error } = await supabase
            .from("menu")
            .delete()
            .eq("id", id);
          if (!error) {
            const newMenu = menu.filter((m) => m.id !== id);
            setMenu(newMenu);
            toast.current.show({
              severity: "success",
              summary: "Rejected",
              detail: "You have rejected",
              life: 3000,
            });
          } else {
            toast.current.show({
              severity: "error",
              summary: "Rejected",
              detail: "You have rejected",
              life: 3000,
            });
          }
        },
        reject: () => {
          toast.current.show({
            severity: "warn",
            summary: "Rejected",
            detail: "You have rejected",
            life: 3000,
          });
        },
      });
    };
    confirm();
  }
}
