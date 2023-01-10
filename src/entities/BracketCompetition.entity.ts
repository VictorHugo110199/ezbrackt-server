import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

import Competitions from "./Competitions.entity";
import Players from "./Players.entity";

@Entity("bracket_competition")
class BracketCompetition {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Competitions, (competitions) => competitions.id)
  competition: Competitions;

  @Column()
  bracket: string;

  @Column()
  key_bracket: number;

  @ManyToOne(() => Players, (players) => players.id)
  player_1: Players;

  @Column({ default: "NotPlay" })
  player_1_status: string;

  @ManyToOne(() => Players, (players) => players.id)
  player_2: Players;

  @Column({ default: "NotPlay" })
  player_2_status: string;

  @ManyToOne(() => Players, (players) => players.id)
  winner_player: string;

  @Column({ default: "NotPlay" })
  status: string;
}

export default BracketCompetition;
