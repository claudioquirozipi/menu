import { useForm, Controller } from "react-hook-form";
import { useState, useEffect } from "react";

import { useSupabaseClient } from "@supabase/auth-helpers-react";

import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { classNames } from "primereact/utils";
import { Button } from "primereact/button";

import { CreateMenuDTO } from "../../interfaces/create-menu-dto";
import { Category } from "../../../category/interfaces/category";
import { SelectItemOptionsType } from "primereact/selectitem";
import { Menu, MenuType } from "../../interfaces/menu";

import styles from "./styles.module.css";
import { FormProps } from "./interface";
import ImageForm from "../image-form";

const defaultValues: CreateMenuDTO = {
  name: "",
  price: 0,
  images: [],
  category: [],
};

export default function Form(props: FormProps) {
  const { initialValue } = props;
  const [categories, setCategories] = useState<SelectItemOptionsType[]>([]);
  const supabase = useSupabaseClient();
  const { control, formState, handleSubmit, reset, setValue, watch } = useForm({
    defaultValues,
  });
  const { errors } = formState;
  const [formData, setFormData] = useState({});
  const [showMessage, setShowMessage] = useState(false);

  console.log("formData", formData);
  //   const handleSubmit = () => {};
  const getFormErrorMessage = (name: MenuType) => {
    return (
      errors[name] && <small className="p-error">{errors[name]?.message}</small>
    );
  };
  const onSubmit = async (formValue: any) => {
    console.log("hola");
    console.log("formValue", formValue);
    // setFormData(data);
    // setShowMessage(true);
    const { data, error } = await supabase.from("menu").insert([formValue]);

    reset();
  };

  async function getCategories() {
    const { data, error } = await supabase.from("category").select("*");
    const newData: any[] = data
      ? data?.map((d: Category) => ({
          label: d.name,
          value: d.id,
        }))
      : [];

    setCategories(newData);
  }

  console.log("categories", categories);
  const citySelectItems = [
    { label: "New York", value: "NY" },
    { label: "Rome", value: "RM" },
    { label: "London", value: "LDN" },
    { label: "Istanbul", value: "IST" },
    { label: "Paris", value: "PRS" },
  ];

  useEffect(() => {
    getCategories();
  }, []);
  const ola = () => {
    console.log("ola");
    // control.register("images", { onChange: () => "ola" });
    // setValue("images", ["hola"]);
  };
  const images = watch("images");
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
      <ImageForm setValue={setValue} images={images} />
      <div className="p-fluid">
        <div className="field">
          <span className="p-float-label">
            <Controller
              name="name"
              control={control}
              rules={{ required: "Name is required." }}
              render={({ field, fieldState }) => (
                <InputText
                  id={field.name}
                  {...field}
                  autoFocus
                  className={classNames({ "p-invalid": fieldState.invalid })}
                />
              )}
            />
            <label
              htmlFor="name"
              className={classNames({ "p-error": errors.name })}
            >
              Name*
            </label>
          </span>
          {getFormErrorMessage("name")}
        </div>
        <div className="field">
          <span className="p-float-label">
            <Controller
              name="price"
              control={control}
              rules={{ required: "price is required." }}
              render={({ field, fieldState }) => (
                <InputText
                  type={"number"}
                  id={field.name}
                  {...field}
                  autoFocus
                  className={classNames({ "p-invalid": fieldState.invalid })}
                />
              )}
            />
            <label
              htmlFor="price"
              className={classNames({ "p-error": errors.price })}
            >
              price*
            </label>
          </span>
          {getFormErrorMessage("price")}
        </div>
        <div className="field">
          <span className="p-float-label">
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Dropdown
                  id={field.name}
                  value={field.value}
                  onChange={(e) => field.onChange(e.value)}
                  options={categories}
                  //   optionLabel="Categoría"
                />
              )}
            />
            <label htmlFor="country">Categoría</label>
          </span>
        </div>

        <Button type="submit" label="Submit" className="mt-2" />
      </div>
    </form>
  );
}
