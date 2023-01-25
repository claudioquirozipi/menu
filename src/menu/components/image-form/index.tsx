import { ChangeEvent, useState, FormEvent } from "react";
import { Image } from "../../../image/interfaces/image";
import { ImageFormProps } from "./interfaces/props";
import { v4 as uuid } from "uuid";

export default function ImageForm(props: ImageFormProps) {
  const { images = [], setValue } = props;
  const [title, setTitle] = useState("");
  // https://hxuqbrrlfvuyhhdldwme.supabase.co/storage/v1/object/public/menus/0212226.jpg
  const imgUrl = "https://hxuqbrrlfvuyhhdldwme.supabase.co/storage/v1/object";
  const addImage = () => {
    const image: string = "public/menus/0212226.jpg";
    console.log("hola");
    const newImage = [...images, image];
    setValue("images", newImage);
  };
  console.log("imagen", images);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);

  return (
    <div>
      <h1>image form a</h1>

      <div>
        {/* <input type="text" value={title} onChange={handleChange} /> */}
        {images.map((img) => (
          <img src={`${imgUrl}/${img}`} alt="img" style={{ width: "50px" }} />
        ))}
        <button onClick={addImage}>Add image</button>
      </div>
    </div>
  );
}
