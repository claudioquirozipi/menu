import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Form from "../../../src/menu/components/form";
import { CreateMenuDTO } from "../../../src/menu/interfaces/create-menu-dto";
import Layout from "../../../src/shared/components/layout";

export default function CreateMenu() {
  const supabase = useSupabaseClient();
  return (
    <Layout>
      <h1>Crear menu</h1>
      <Form createOrEditOnSubmit={createOnSubmit} />
    </Layout>
  );

  async function createOnSubmit(formValue: CreateMenuDTO) {
    const { data, error } = await supabase.from("menu").insert([formValue]);
  }
}
