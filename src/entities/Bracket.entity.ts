import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import Competitions from "./Competitions.entity";
import { Player } from "./Players.entity";

@Entity("brackets")
export class Brackets {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  currentRound: number;

  @Column()
  keyRound: number;

  @Column({ default: true })
  status: boolean;

  @OneToOne(() => Player, (player) => player.id)
  @JoinColumn()
  winner: Player;

  @OneToOne(() => Player, (player) => player.id)
  @JoinColumn()
  loser: string;

  @ManyToOne(() => Competitions, (competition) => competition.bracket)
  competition: Competitions;

  @OneToOne(() => Player, (player) => player.id)
  @JoinColumn()
  player1: Player;

  @OneToOne(() => Player, (player) => player.id)
  @JoinColumn()
  player2: Player;
}
