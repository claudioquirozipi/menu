import { useEffect, useState } from "react";
import Head from "next/head";

import { useSupabaseClient } from "@supabase/auth-helpers-react";

import { Button } from "primereact/button";

import Layout from "../src/shared/components/layout";
import { Menu } from "../src/menu/interfaces/menu";
import { Card } from "../src/menu/components/card";
import { ItemContainer } from "../src/menu/components/itemContainer";
import HomeV1 from "../src/home/homeV1";
import { useMenuList } from "../src/menu/hooks/useMenuList";
import Navbar from "../src/home/homeV1/components/navbar";
import WhatsappButton from "../src/home/homeV1/components/whatsappButton";

export default function Home() {
  const supabase = useSupabaseClient();
  const [menuFiltered, setMenuFiltered] = useState<any>([]);
  const { menu, menuError, menuLoading } = useMenuList();

  const initialize = async () => {
    const { data, error } = await supabase.from("menu").select("*");
    const { data: category, error: errorCategory } = await supabase
      .from("category")
      .select("*");
    let dataFiltered: any = {};

    data?.forEach((d) => {
      const cate = category?.find((c) => c.id === d.category).name;
      if (cate) {
        if (!dataFiltered[cate]) {
          dataFiltered[cate] = [];
        }
        dataFiltered[cate].push(d);
      }
    });
    const arrayFiltered = [];
    for (const property in dataFiltered) {
      arrayFiltered.push({
        id: dataFiltered[property][0].id,
        category: property,
        menu: dataFiltered[property],
      });
    }
    // console.log("arrayFiltered", arrayFiltered);s
    setMenuFiltered(arrayFiltered);
  };

  useEffect(() => {
    initialize();
  }, []);
  return (
    <>
      <Layout mode="lessAuth">
        <Head>
          <title>Lari´s Pastry</title>
          <meta name="description" content="Tu repostería de confianza" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
          <meta property="og:image" content="/logo.png" />
        </Head>

        <div
          style={{
            backgroundColor: "#fff",
          }}
        >
          <Navbar />
          <div
            style={{
              padding: "1rem",
            }}
          >
            <HomeV1 menu={menu} />
            {/* {menuFiltered?.map((filtered: any, i: number) => (
            <ItemContainer key={i} category={filtered.category}>
            {filtered.menu.map((m: Menu) => (
              <Card key={m.id} menu={m} />
              ))}
              </ItemContainer>
            ))} */}
          </div>
        </div>
        <WhatsappButton />
        <h1>titulo</h1>
      </Layout>
    </>
  );
}
