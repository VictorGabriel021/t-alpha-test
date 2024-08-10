import { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { CardContainer, CardContent, Form } from "./styles";

import { Button, CircularProgress } from "@mui/material";

import {
  formatCPF_CNPJ,
  formatForNumber,
} from "shared/utils/functions/formatters";

import { schema } from "./shema";

import { IBodyUserLogin } from "shared/types/body/user";

import {
  abortControllerHandler,
  getAbortController,
} from "shared/utils/functions/abortController";

import UserService from "shared/services/user";

import { useAuth } from "context/AuthContext";
import InputCustom from "shared/components/InputCustom";

const { login } = UserService();

const Login = () => {
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [abortController, setAbortController] = useState<AbortController>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { setToken } = useAuth();

  const changeTaxNumberHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValue("taxNumber", formatCPF_CNPJ(event));
  };

  const onSubmit = async (data: IBodyUserLogin) => {
    const formData: IBodyUserLogin = {
      ...data,
      taxNumber: formatForNumber(data.taxNumber),
    };

    const controller = getAbortController(setAbortController);

    setIsLoading(true);

    const response = await login(formData, controller);
    setIsLoading(false);

    if (response) {
      setToken(response!.data.token);
      navigate("/products");
    }
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
            Entrar
          </Button>

          <Link to="/register" style={{ textAlign: "center" }}>
            <Button variant="text">Criar nova conta</Button>
          </Link>
        </Form>
      </CardContent>
    </CardContainer>
  );
};

export default Login;
