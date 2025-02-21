import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import User from './user';

@Entity()
export default class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string
  
  @ManyToOne(() => User, (user) => user.sentMessages)
  sender: User
  
  @ManyToOne(() => User, (user) => user.receivedMessages)
  receiver: User
  
  @Column({
    type: 'varchar',
  })
  content: string

  @CreateDateColumn({
    type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'
  })
  createdAt: Date;
}