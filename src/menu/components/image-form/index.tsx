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
  const [visible, setVisible] = useState(false);
  const [imgSelected, setImgSelected] = useState("");
  const imgUrl = "https://hxuqbrrlfvuyhhdldwme.supabase.co/storage/v1/object";

  const getImages = async () => {
    const { data, error } = await supabase.storage.from("menus").list();
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

  function addToArrayImage(image: string) {
    const newImage = [...images, "public/menus/" + imgSelected];
    setValue("images", newImage);
    setVisible(false);
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

  return (
    <div>
      <h1>image form</h1>

      <div>
        {images.map((img, i: number) => (
          <img
            key={i}
            src={`${imgUrl}/${img}`}
            alt="img"
            style={{ width: "50px" }}
          />
        ))}

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
          footer={() => (
            <Footer
              uploadImage={uploadImage}
              addToArrayImage={addToArrayImage}
            />
          )}
        >
          <div className={styles.imagesContainer}>
            {image.map((img: any) => (
              <ImageComponent
                key={img.id}
                img={img}
                deleteImage={deleteImage}
                imgSelected={imgSelected}
                setImgSelected={setImgSelected}
              />
            ))}
          </div>
        </Dialog>
      </div>
    </div>
  );
}
