import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm";

import Competitions from "./Competitions.entity";

@Entity("players")
class Players {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 30, nullable: false })
  name: string;

  @Column({ nullable: true })
  photo: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Competitions, (competitions) => competitions.players)
  competitions: Competitions;
}

export default Players;
