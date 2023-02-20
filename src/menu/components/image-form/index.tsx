import { ChangeEvent, useState, useEffect } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { ImageFormProps } from "./interfaces/props";
import { v4 as uuid } from "uuid";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import styles from "./css/styles.module.css";
import { Footer } from "./footer";
import { ImageComponent } from "./image";

export default function ImageForm(props: ImageFormProps) {
  const { images = [], setValue } = props;
  const [image, setImage] = useState<any>([]);
  const supabase = useSupabaseClient();
  const [title, setTitle] = useState("");
  const [visible, setVisible] = useState(false);
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

  const getImages = async () => {
    const { data, error } = await supabase.storage.from("menus").list();
    console.log("data", data);
    if (data?.length) setImage(data);
  };

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

  useEffect(() => {
    getImages();
  }, []);

  console.log("hola", image);

  return (
    <div>
      <h1>image form a</h1>

      <div>
        {/* <input type="text" value={title} onChange={handleChange} /> */}
        {images.map((img) => (
          <img src={`${imgUrl}/${img}`} alt="img" style={{ width: "50px" }} />
        ))}
        <button onClick={addImage}>Add image</button>

        <Button
          label="Show"
          icon="pi pi-external-link"
          onClick={() => setVisible(true)}
        />
        <Dialog
          header="Header"
          visible={visible}
          style={{ width: "50vw" }}
          onHide={() => setVisible(false)}
          footer={() => <Footer uploadImage={uploadImage} />}
        >
          <div className={styles.imagesContainer}>
            {image.map((img: any) => (
              <ImageComponent
                key={img.id}
                img={img}
                deleteImage={deleteImage}
              />
            ))}
          </div>
        </Dialog>
      </div>
    </div>
  );
}
