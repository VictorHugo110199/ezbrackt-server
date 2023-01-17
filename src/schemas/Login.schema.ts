import * as yup from "yup";

export class LoginSchema {
  static login = yup.object().shape({
    email: yup.string().email().required("Email obrigatório"),
    password: yup.string().required("Senha obrigatória")
  });
}
