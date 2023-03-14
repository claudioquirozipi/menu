import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { useSupabaseClient } from "@supabase/auth-helpers-react";

import Layout from "../../../../../src/shared/components/layout";
import Form from "../../../../../src/menu/components/form";
import { Menu } from "../../../../../src/menu/interfaces/menu";
import { EditMenuDTO } from "../../../../../src/menu/interfaces/edit-menu-dto";
import { FormValue } from "../../../../../src/menu/components/form/interface";

export default function EditarMenu() {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const { id } = router.query;
  const [initialValue, setInitialValue] = useState<Menu | undefined>(undefined);

  useEffect(() => {
    if (id && typeof id === "string") initialize(id);
  }, [id]);

  return (
    <Layout>
      <h1>Editar menu {id}</h1>
      {initialValue ? (
        <Form initialValue={initialValue} createOrEditOnSubmit={editOnSubmit} />
      ) : (
        <h1>Cargando ...</h1>
      )}
    </Layout>
  );

  async function editOnSubmit(formValue: FormValue) {
    const { data, error } = await supabase
      .from("menu")
      .update({
        name: formValue.name,
        price: formValue.price,
        images: formValue.images,
        category: formValue.category,
      })
      .eq("id", formValue.id);
  }
  async function initialize(id: string) {
    const { data, error } = await supabase
      .from("menu")
      .select("*")
      .eq("id", id);
    if (data?.length) setInitialValue(data[0]);
  }
}
