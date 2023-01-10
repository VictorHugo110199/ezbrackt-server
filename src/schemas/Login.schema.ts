import * as yup from "yup";

export class loginSchema {
  static login = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required("Senha obrigatória")
  });
}
