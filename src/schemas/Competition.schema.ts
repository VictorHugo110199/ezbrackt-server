import * as yup from "yup";

export class CompetitionSchema {
  static create = yup.object().shape({
    name: yup.string().required("O nome da competição é obrigatório"),
    number_players: yup.number().required("É necessário definir um número de jogadores"),
    description: yup.string().notRequired()
  });
}
