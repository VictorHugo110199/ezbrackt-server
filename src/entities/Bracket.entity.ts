import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import Competitions from "./Competitions.entity";
import { Player } from "./Players.entity";

@Entity("brackets")
export class Brackets {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  currentRound: number;

  @Column({ default: true })
  status: boolean;

  @ManyToOne(() => Player, (player) => player.id)
  @JoinColumn()
  winner: Player;

  @ManyToOne(() => Player, (player) => player.id)
  @JoinColumn()
  loser: Player | null;

  @ManyToOne(() => Competitions, (competition) => competition.bracket)
  competition: Competitions;

  @ManyToOne(() => Player, (player) => player.id)
  @JoinColumn()
  player1: Player;

  @ManyToOne(() => Player, (player) => player.id)
  @JoinColumn()
  player2: Player;
}
