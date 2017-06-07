import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { EmailAccount } from './EmailAccount';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;

  @OneToMany(type => EmailAccount, account => account.user)
  email_accounts: EmailAccount[];
}