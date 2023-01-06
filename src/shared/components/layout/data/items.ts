import Router from "next/router";

export const items = [
  {
    label: "menú",
    items: [
      {
        label: "listar",
        command: () => Router.push("/admin/menu"),
      },
      {
        label: "Crear",
        command: () => Router.push("/admin/menu/create"),
      },
      {
        label: "editar",
        command: () => Router.push("/admin/menu/edit/1"),
      },
    ],
  },
  {
    label: "category",
    command: () => Router.push("/admin/category"),
  },
];
