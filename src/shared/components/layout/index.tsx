import { useRouter } from "next/router";
import { useEffect } from "react";

import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";

import { LayoutProps } from "./interface/props";
import styles from "./styles.module.css";
import { items } from "./data/items";

export default function Layout(props: LayoutProps) {
  const { children, mode = "admin" } = props;
  const supabase = useSupabaseClient();
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (mode === "auth" && session) router.push("/admin/menu");
    // if (mode === "admin" && !session) router.push("/auth/login");
  }, [session]);

  if (mode === "lessAuth") return <> {children}</>;
  if (mode === "auth")
    return <div className={styles.login_container}> {children}</div>;
  return (
    <>
      <Menubar
        model={items}
        end={
          <Button label="Logout" icon="pi pi-power-off" onClick={handleClick} />
        }
      />
      <div className={styles.admin_container}>{children}</div>
    </>
  );

  function handleClick() {
    supabase.auth.signOut();
  }
}
