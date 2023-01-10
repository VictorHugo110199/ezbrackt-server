import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from "typeorm";

import BracketCompetition from "./BracketCompetition.entity";
import Players from "./Players.entity";
import User from "./User.entity";

@Entity("competitions")
class Competitions {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToMany(() => User, (user) => user.id)
  createUser: User;

  @Column({ length: 30, nullable: false, unique: true })
  name: string;

  @Column({ default: true })
  status: boolean;

  @Column()
  winner: string;

  @Column()
  number_players: number;

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Players, (players) => players.id)
  players: Players[];

  @OneToMany(() => BracketCompetition, (bracketCompetition) => bracketCompetition.competition)
  brackets: BracketCompetition[];
}

export default Competitions;
