import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

import { CreateMenuDTO } from "../../../src/menu/interfaces/create-menu-dto";
import Layout from "../../../src/shared/components/layout";
import Form from "../../../src/menu/components/form";

export default function CreateMenu() {
  const supabase = useSupabaseClient();
  const router = useRouter();
  return (
    <Layout>
      <h1>Crear menu</h1>
      <Form createOrEditOnSubmit={createOnSubmit} type="create" />
    </Layout>
  );

  async function createOnSubmit(formValue: CreateMenuDTO) {
    const { data, error } = await supabase.from("menu").insert([formValue]);
    if (data) router.push("/admin/menu");
  }
}
