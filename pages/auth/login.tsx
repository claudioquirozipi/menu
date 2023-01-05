import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import {
  useSession,
  useSupabaseClient,
  useUser,
} from "@supabase/auth-helpers-react";
import Layout from "../../src/shared/components/layout";

export default function Login() {
  const supabase = useSupabaseClient();
  return (
    <Layout mode="auth">
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        theme="dark"
        magicLink
      />
    </Layout>
  );
}
