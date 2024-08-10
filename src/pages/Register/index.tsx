import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { CardContainer, CardContent, Form } from "../Login/styles";

import { Button, CircularProgress } from "@mui/material";

import {
  formatCPF_CNPJ,
  formatForNumber,
  formatPhone,
} from "shared/utils/functions/formatters";

import {
  abortControllerHandler,
  getAbortController,
} from "shared/utils/functions/abortController";

import { schema } from "./schema";

import UserService from "shared/services/user";

import { IBodyUserRegister } from "shared/types/body/user";
import InputCustom from "shared/components/InputCustom";

const { register } = UserService();

const Register = () => {
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [abortController, setAbortController] = useState<AbortController>();
  const navigate = useNavigate();

  const changeTaxNumberHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValue("taxNumber", formatCPF_CNPJ(event));
  };

  const changePhoneHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue("phone", formatPhone(event.target.value));
  };

  const onSubmit = async (data: IBodyUserRegister) => {
    const formData: IBodyUserRegister = {
      ...data,
      phone: formatForNumber(data.phone),
      taxNumber: formatForNumber(data.taxNumber),
    };

    const controller = getAbortController(setAbortController);

    setIsLoading(true);
    const success = await register(formData, controller);
    setIsLoading(false);

    if (success) navigate("/");
  };

  useEffect(() => {
    return () => {
      abortControllerHandler(abortController);
    };
  }, [abortController]);

  return (
    <CardContainer>
      <CardContent>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputCustom
            name="name"
            control={control}
            label="Nome*"
            errors={errors}
          />

          <InputCustom
            name="mail"
            control={control}
            label="Email*"
            errors={errors}
          />

          <InputCustom
            name="phone"
            control={control}
            label="Celular*"
            errors={errors}
            onChange={changePhoneHandler}
          />

          <InputCustom
            name="taxNumber"
            control={control}
            label="CPF/CNPJ*"
            errors={errors}
            onChange={changeTaxNumberHandler}
          />

          <InputCustom
            name="password"
            type="password"
            control={control}
            label="Senha*"
            errors={errors}
            autoComplete='autoComplete'
          />

          <Button
            type="submit"
            variant="contained"
            disabled={isLoading}
            endIcon={
              isLoading && <CircularProgress color="inherit" size={18} />
            }
          >
            Cadastrar
          </Button>

          <Button variant="text" onClick={() => navigate("/")}>
            Login
          </Button>
        </Form>
      </CardContent>
    </CardContainer>
  );
};

export default Register;
