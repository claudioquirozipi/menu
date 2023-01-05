import { useEffect } from "react";
import Layout from "../../src/shared/components/layout";
import { useRouter } from "next/router";

export default function Admin() {
  const router = useRouter();

  useEffect(() => {
    router.push("/admin/menu");
  }, []);
  return <Layout />;
}
