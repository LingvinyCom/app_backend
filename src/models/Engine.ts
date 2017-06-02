import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { EmailAccount } from "./EmailAccount";

@Entity()
export class Engine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  host: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column('int')
  server_port: number;

  @Column()
  authentication_type: string;

  @Column('boolean')
  is_ssl: boolean;

  @OneToMany(type => EmailAccount, account => account.engine)
  email_accounts: EmailAccount[];
}