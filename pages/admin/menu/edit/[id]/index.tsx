import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { useSupabaseClient } from "@supabase/auth-helpers-react";

import Layout from "../../../../../src/shared/components/layout";
import Form from "../../../../../src/menu/components/form";
import { Menu } from "../../../../../src/menu/interfaces/menu";

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
      <Form initialValue={initialValue} />
      {JSON.stringify(initialValue)}
    </Layout>
  );

  async function initialize(id: string) {
    const { data, error } = await supabase
      .from("menu")
      .select("*")
      .eq("id", id);
    if (data?.length) setInitialValue(data[0]);
  }
}
