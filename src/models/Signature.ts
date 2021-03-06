import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

import { User } from "./User";

@Entity()
export class Signature {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  text: string;

  @OneToOne(type => User)
  @JoinColumn()
  user: User;
}
