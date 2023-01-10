import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import Competitions from "./Competitions.entity";

@Entity("players")
export class Player {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  photo: string;

  @ManyToOne(() => Competitions, (competition) => competition.players)
  competition: Competitions;
}
