export interface LayoutProps {
  mode?: Mode;
  children?: any;
}

type Mode = "admin" | "auth" | "lessAuth";
