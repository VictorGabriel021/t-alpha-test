import * as yup from "yup";

import {
  validCpfOrCnpjProp,
  validCNPJ,
  validCpf,
} from "shared/utils/functions/validations";

export const schema = yup
  .object({
    taxNumber: yup
      .string()
      .required("CPF ou CNPJ é obrigatório")
      .test(
        "isValid",
        "CPF ou CNPJ inválido",
        (taxNumber: validCpfOrCnpjProp) =>
          validCNPJ(taxNumber) || validCpf(taxNumber)
      ),
    password: yup
      .string()
      .required("A senha é obrigatória")
      .matches(
        /^(?=.*[A-Z]).{6,}$/,
        "A senha deve ter pelo menos 6 caracteres e conter pelo menos uma letra maiúscula."
      ),
  })
  .required();
