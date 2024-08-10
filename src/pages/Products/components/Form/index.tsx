import { useEffect, useState } from "react";

import { Form, ButtonContainer } from "./styles";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Button, CircularProgress, InputAdornment } from "@mui/material";

import {
  abortControllerHandler,
  getAbortController,
} from "shared/utils/functions/abortController";

import { schema } from "./schema";

import ProductService from "shared/services/products";

import { IBodyProduct } from "shared/types/body/products";

import { ICRUD } from "pages/Products";
import InputCustom from "shared/components/InputCustom";

const { createProduct, updateProduct, getProductId } = ProductService();

interface IProductFormProps {
  onClose: () => void;
  fetchList: () => void;
  formType: ICRUD | undefined;
  productId: number;
}

const ProductForm: React.FC<IProductFormProps> = ({
  onClose,
  fetchList,
  formType,
  productId,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [abortController, setAbortController] = useState<AbortController>();

  const onSubmit = async ({
    name,
    price,
    stock,
    description,
  }: IBodyProduct) => {
    const controller = getAbortController(setAbortController);
    setIsLoading(true);

    const formData: IBodyProduct = {
      name,
      description,
      price,
      stock,
    };

    let response;
    let updateSuccess;
    if (formType === ICRUD.CREATE)
      response = await createProduct(formData, controller);
    else updateSuccess = await updateProduct(productId, formData, controller);

    if (response?.success || updateSuccess) {
      onClose();
      fetchList();
    }

    setIsLoading(false);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      if (formType === ICRUD.EDIT) {
        setIsLoading(true);

        const controller = getAbortController(setAbortController);
        const response = await getProductId(productId, controller);

        if (response?.success) {
          reset(response.data.product);
        }
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [formType, reset, productId]);

  useEffect(() => {
    return () => {
      abortControllerHandler(abortController);
    };
  }, [abortController]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <InputCustom
        name="name"
        control={control}
        label="Nome*"
        errors={errors}
      />

      <InputCustom
        name="description"
        control={control}
        label="Descrição"
        errors={errors}
        multiline
        rows={4}
      />

      <InputCustom
        name="price"
        control={control}
        label="Preço*"
        errors={errors}
        type="number"
        InputProps={{
          startAdornment: <InputAdornment position="start">R$</InputAdornment>,
        }}
      />

      <InputCustom
        name="stock"
        control={control}
        label="Quantidade no estoque*"
        errors={errors}
        type="number"
      />

      <ButtonContainer>
        <Button variant="text" disabled={isLoading} onClick={onClose}>
          Fechar
        </Button>
        <Button
          type="submit"
          variant="contained"
          disabled={isLoading}
          endIcon={isLoading && <CircularProgress color="inherit" size={18} />}
        >
          Salvar
        </Button>
      </ButtonContainer>
    </Form>
  );
};

export default ProductForm;
