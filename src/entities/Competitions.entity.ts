import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn
} from "typeorm";

import BracketCompetition from "./BracketCompetition.entity";
import Players from "./Players.entity";
import User from "./User.entity";

@Entity("competitions")
class Competitions {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn()
  user: User;

  @Column({ length: 30, nullable: false })
  name: string;

  @Column({ default: true })
  status: boolean;

  @Column({ nullable: true })
  winner: string;

  @Column()
  number_players: number;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Players, (players) => players.id)
  @JoinColumn()
  players: Players[];

  @OneToMany(() => BracketCompetition, (bracket) => bracket.competition)
  brackets: BracketCompetition[];

  @Column({ default: true })
  isActive: boolean;
}

export default Competitions;
