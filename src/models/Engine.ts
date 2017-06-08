import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { EmailAccount } from './EmailAccount';

@Entity()
export class Engine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  host: string;

  @Column('int', { nullable: true })
  server_port: number;

  @Column('boolean', { nullable: true })
  is_ssl: boolean;

  @Column('boolean', { 'default': true })
  is_custom: boolean;

  @OneToMany(type => EmailAccount, account => account.engine)
  email_accounts: EmailAccount[];
}
