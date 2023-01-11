import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany
} from "typeorm";

import { Brackets } from "./Bracket.entity";
import { Player } from "./Players.entity";
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

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Player, (player) => player.competition)
  @JoinColumn()
  players: Player[];

  @OneToMany(() => Brackets, (bracket) => bracket.competition)
  bracket: Brackets[];
}

export default Competitions;
