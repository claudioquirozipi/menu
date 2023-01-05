import { useRouter } from "next/router";
import { useEffect } from "react";
import Link from "next/link";

import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

import { LayoutProps } from "./interface/props";
import styles from "./styles.module.css";

export default function Layout(props: LayoutProps) {
  const { children, mode = "admin" } = props;
  const supabase = useSupabaseClient();
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (mode === "auth" && session) router.push("/admin/menu");
    if (mode === "admin" && !session) router.push("/auth/login");
  }, [session]);

  if (mode === "lessAuth") return <> {children}</>;
  if (mode === "auth")
    return <div className={styles.login_container}> {children}</div>;

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/auth/login">Login</Link>
          </li>
          <li>
            <Link href="/admin/images">Imagenes</Link>
          </li>
          <li>
            <Link href="/admin/menu">menu</Link>
          </li>
          <li>
            <Link href="/admin/menu/create">menu</Link>
          </li>
          <li>
            <Link href="/admin/menu/edit/id">menu</Link>
          </li>
        </ul>
        <button onClick={handleClick}>Logout</button>
      </nav>
      <h1>{mode}</h1>
      {children}
    </div>
  );

  function handleClick() {
    supabase.auth.signOut();
  }
}
