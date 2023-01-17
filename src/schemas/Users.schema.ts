import * as yup from "yup";

export class UserSchemas {
  static create = yup.object().shape({
    name: yup.string().required("É obrigatório definir um nome"),
    email: yup.string().email().required("Email é obrigatório"),
    password: yup
      .string()
      .required("Senha obrigatória")
      .min(8, "Senha deve conter no mínimo 8 caracteres")
      .matches(/[A-Z]/, "Senha deve conter ao menos uma letra maiúscula")
      .matches(/[a-z]/, "Senha deve conter ao menos uma letra minúscula")
      .matches(/[0-9]/, "Senha deve conter ao menos um número")
      .matches(/(\W)|_/, "Senha deve conter ao menos um caracter especial"),
    photo: yup.string().notRequired()
  });

  static update = yup.object().shape({
    name: yup.string().notRequired(),
    email: yup.string().email().notRequired(),
    password: yup
      .string()
      .notRequired()
      .min(8, "Senha deve conter no mínimo 8 caracteres")
      .matches(/[A-Z]/, "Senha deve conter ao menos uma letra maiúscula")
      .matches(/[a-z]/, "Senha deve conter ao menos uma letra minúscula")
      .matches(/[0-9]/, "Senha deve conter ao menos um número")
      .matches(/(\W)|_/, "Senha deve conter ao menos um caracter especial"),
    photo: yup.string().notRequired(),
    isActive: yup.boolean().notRequired()
  });
}
