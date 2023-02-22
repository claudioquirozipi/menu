import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Layout from "../../src/shared/components/layout";
import { useState, useEffect, ChangeEvent } from "react";
import { v4 as uuid } from "uuid";

export default function Images() {
  const [images, setImagenes] = useState<any>([]);
  const supabase = useSupabaseClient();

  const getImages = async () => {
    const { data, error } = await supabase.storage.from("menus").list();
    if (data?.length) setImagenes(data);
  };

  useEffect(() => {
    getImages();
  }, []);

  async function uploadImage(e: ChangeEvent<HTMLInputElement>) {
    let file;
    if (e.target.files) {
      file = e.target.files[0];
      const { data, error } = await supabase.storage
        .from("menus")
        .upload(file.name + "-" + uuid(), file); // Cooper/ASDFASDFASDF uuid, taylorSwift.png -> taylorSwift.png

      if (data) {
        getImages();
      } else {
        console.log(error);
      }
    }
  }

  async function deleteImage(imageName: string) {
    const { error } = await supabase.storage.from("menus").remove([imageName]);

    if (error) {
      alert(error);
    } else {
      getImages();
    }
  }

  return (
    <Layout>
      <h1>imagenes</h1>
      <input type={"file"} onChange={(e) => uploadImage(e)} />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "2rem",
        }}
      >
        {images.map((image: any) => (
          <div key={image.id}>
            <h1>imagen</h1>
            <img
              style={{ width: "200px" }}
              src={`https://hxuqbrrlfvuyhhdldwme.supabase.co/storage/v1/object/public/menus/${image.name}`}
              alt=""
            />
            <button onClick={() => deleteImage(image.name)}>delete</button>
          </div>
        ))}
      </div>
    </Layout>
  );
}
