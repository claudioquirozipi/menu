import { useEffect, useState, useRef } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

import { CreateCategoryDTO } from "../../../src/category/interfaces/create-category-dto";
import CreateCategory from "../../../src/category/components/create-category";
import DeleteCategory from "../../../src/category/components/delete-category";
import { Category } from "../../../src/category/interfaces/category";
import Layout from "../../../src/shared/components/layout";
import EditCategory from "../../../src/category/components/edit-category";
import { EditCategoryDTO } from "../../../src/category/interfaces/edit-category-dto";
// import { getCategories } from "../../../src/category/hooks/getCategories";

export default function CategoryPage() {
  const supabase = useSupabaseClient();
  const [category, setCategory] = useState<Category[]>([]);
  const toast: any = useRef(null);

  useEffect(() => {
    getCategories();
  }, []);

  console.log("category", category);

  return (
    <Layout>
      <CreateCategory onClick={createCategory} />
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
          body={(rowData) => (
            <EditCategory category={rowData} onClick={editCategory} />
          )}
          header="Editar"
        ></Column>
        <Column
          body={(rowData) => (
            <DeleteCategory id={rowData.id} onClick={deleteCategory} />
          )}
          header="Borrar"
        ></Column>
      </DataTable>
      <ConfirmDialog />
      <Toast ref={toast} />
    </Layout>
  );
  async function getCategories() {
    const { data, error } = await supabase.from("category").select("*");
    if (data) setCategory(data);
  }

  async function createCategory(createCategoryDTO: CreateCategoryDTO) {
    const { data, error } = await supabase
      .from("category")
      .insert([createCategoryDTO]);
    console.log("data create", data);
    if (!error) {
      getCategories();
    }
  }
  async function editCategory(editCategoryDTO: EditCategoryDTO) {
    const { data, error } = await supabase
      .from("category")
      .update({ name: editCategoryDTO.name })
      .eq("id", editCategoryDTO.id);
    if (!error) {
      const categoriesList = category.map((c) =>
        c.id === editCategoryDTO.id ? editCategoryDTO : c
      );
      setCategory(categoriesList);
    }
    console.log("se editó", data);
  }

  async function deleteCategory(id: string) {
    const confirm = () => {
      confirmDialog({
        message: "Are you sure you want to proceed?",
        header: "Confirmation",
        icon: "pi pi-exclamation-triangle",
        accept: async () => {
          const { data, error } = await supabase
            .from("category")
            .delete()
            .eq("id", id);
          if (!error) {
            const newCategory = category.filter((c) => c.id !== id);
            setCategory(newCategory);
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
