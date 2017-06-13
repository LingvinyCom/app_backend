import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne } from 'typeorm';

import { EmailAccount } from './EmailAccount';
import { Signature } from "./Signature";
import { Contact } from "./Contact";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;

  @OneToMany(type => EmailAccount, account => account.user)
  email_accounts: EmailAccount[];

  @OneToOne(type => Signature, signature => signature.user)
  signature: Signature;

  @OneToMany(type => Contact, contact => contact.user)
  contacts: Contact[];
}
