import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { Engine } from './Engine';
import { User } from './User';

@Entity()
export class EmailAccount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column('boolean')
  is_master: boolean;

  @ManyToOne(type => Engine, engine => engine.email_accounts)
  engine: Engine;

  @ManyToOne(type => User, user => user.email_accounts)
  user: User;

  @Column()
  state_code: string;

  @Column()
  access_token: string;

  @Column()
  expiry_date: string;

  @Column()
  token_type: string;

  @Column()
  refresh_token: string;
}