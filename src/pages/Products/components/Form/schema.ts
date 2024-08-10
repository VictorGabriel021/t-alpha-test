import * as yup from "yup";

export const schema = yup
  .object({
    name: yup.string().required("O Nome é obrigatório"),
    description: yup.string().nullable(),
    price: yup
      .number()
      .nullable()
      .required("O Preço é obrigatório")
      .moreThan(0, "O Preço deve ser maior que zero")
      .typeError("O Preço deve ser maior que zero"),
    stock: yup
      .number()
      .nullable()
      .required("O Estoque é obrigatório")
      .moreThan(0, "O Preço deve ser maior que zero")
      .typeError("O Preço deve ser maior que zero"),
  })
  .required();
