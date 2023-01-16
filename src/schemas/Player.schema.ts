import * as yup from 'yup'

export class PlayerSchema{
  static create = yup.object().shape({
    name: yup.string().required('Nome do jogador é obrigatório'),
    photo: yup.string().notRequired()
  })

  static update = yup.object().shape({
    name: yup.string().notRequired(),
    photo: yup.string().notRequired()
  })
}