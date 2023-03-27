import Card from "./components/card";
import { HomeV1Props } from "./interfaces";

export default function HomeV1(props: HomeV1Props) {
  const { menu } = props;
  return (
    <div style={{ display: "grid", gap: "1rem" }}>
      {menu.map((m) => (
        <Card key={m.id} menu={m} />
      ))}
    </div>
  );
}
