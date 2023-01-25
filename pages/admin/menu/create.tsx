import { useState } from "react";
import Form from "../../../src/menu/components/form";
import Layout from "../../../src/shared/components/layout";

import { Menu } from "../../../src/menu/interfaces/menu";

export default function CreateMenu() {
  return (
    <Layout>
      <h1>Crear menu</h1>
      <Form />
    </Layout>
  );
}
