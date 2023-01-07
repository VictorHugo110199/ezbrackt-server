import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("users")
class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 30, nullable: false })
  name: string;

  @Column({ length: 50, nullable: false })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  photo: string;
}

export default User;
