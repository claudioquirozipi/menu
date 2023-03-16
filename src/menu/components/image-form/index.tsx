import { ChangeEvent, useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import Image from "next/image";

import { useSupabaseClient } from "@supabase/auth-helpers-react";

import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Badge } from "primereact/badge";

import { ImageFormProps } from "./interface";
import styles from "./styles.module.css";
import { ImageComponent } from "./image";
import { Footer } from "./footer";

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

  function removeToArrayImage(image: string) {
    const newImage = images.filter((img) => image !== img);
    setValue("images", newImage);
    // setVisible(false);
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
    <div className={styles.imagesContainer}>
      {images.map((img, i: number) => (
        <div
          key={i}
          className={`${styles.imageItem} ${i === 0 && styles.firstImageItem}`}
        >
          <Image
            src={`${imgUrl}/${img}`}
            alt="img"
            className={styles.img}
            width={250}
            height={250}
          />
          <Badge
            value="X"
            className={styles.badge}
            onClick={() => removeToArrayImage(img)}
          ></Badge>
        </div>
      ))}
      <Button
        className={styles.addImageButton}
        label="Agregar imagen"
        icon="pi pi-external-link"
        onClick={() => setVisible(true)}
      />
      <Dialog
        header="Header"
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => setVisible(false)}
        footer={() => (
          <Footer uploadImage={uploadImage} addToArrayImage={addToArrayImage} />
        )}
      >
        <div className={styles.imagesModalContainer}>
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
  );
}
