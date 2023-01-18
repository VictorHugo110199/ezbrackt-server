import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Brackets } from "./Bracket.entity";
import Competitions from "./Competitions.entity";

@Entity("players")
export class Player {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  photo: string;

  @ManyToOne(() => Competitions, (competition) => competition.players)
  competition: Competitions;

  @OneToMany(
    () => Brackets,
    (brackets) => brackets.player1 || brackets.player2 || brackets.winner || brackets.loser
  )
  brackets: Brackets[];
}
