import * as yup from "yup";

export class userSchemas {
  static create = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup
      .string()
      .required("Senha obrigatória")
      .min(8, "Deve conter no mínimo 8 caracteres")
      .matches(/[A-Z]/, "Deve conter ao menos uma letra maiúscula")
      .matches(/[a-z]/, "Deve conter ao menos uma letra minúscula")
      .matches(/[0-9]/, "Deve conter ao menos um número")
      .matches(/(\W)|_/, "Deve conter ao menos um caracter especial"),
    photo: yup.string().notRequired()
  });

  static updateUser = yup.object().shape({
    name: yup.string().notRequired(),
    email: yup.string().email().notRequired(),
    password: yup
      .string()
      .notRequired()
      .min(8, "Deve conter no mínimo 8 caracteres")
      .matches(/[A-Z]/, "Deve conter ao menos uma letra maiúscula")
      .matches(/[a-z]/, "Deve conter ao menos uma letra minúscula")
      .matches(/[0-9]/, "Deve conter ao menos um número")
      .matches(/(\W)|_/, "Deve conter ao menos um caracter especial"),
    photo: yup.string().notRequired(),
    isActive: yup.boolean().notRequired()
  });
}
