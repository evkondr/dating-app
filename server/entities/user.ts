import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Gender } from '../models/user/user.model';
import Message from './message';

@Entity()
export default class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
      type:'varchar',
    })
    name: string

    @Column({
      type:'varchar',
      unique: true
    })
    email: string

    @Column({
      type:'varchar',
    })
    password: string

    @Column({
      type: 'smallint',
    })
    age: number

    @Column({
      type: 'enum',
      enum: Gender
    })
    gender: Gender

    @Column({
      type: 'enum',
      enum: Gender
    })
    genderPreference: Gender

    @Column({
      type: 'varchar',
      default: ''
    })
    bio: string

    @Column({
      type: 'varchar',
      default: ''
    })
    image: string

    @ManyToMany(() => User)
    @JoinTable({
      name: 'user_likes', // Название таблицы для связи
      joinColumn: {
        name: 'liked_user_id', // Колонка для ID пользователя, которого лайкнули
        referencedColumnName: 'id',
      },
      inverseJoinColumn: {
        name: 'liking_user_id', // Колонка для ID пользователя, который лайкнул
        referencedColumnName: 'id',
      },
    })
    likes:User[]

    @ManyToMany(() => User)
    @JoinTable({
      name: 'user_dislikes',
      joinColumn: {
        name: 'disliked_user_id',
        referencedColumnName: 'id',
      },
      inverseJoinColumn: {
        name: 'disliking_user_id',
        referencedColumnName: 'id',
      },
    })
    dislikes:User[]

    @ManyToMany(() => User)
    @JoinTable({
      name: 'user_matches',
      joinColumn: {
        name: 'user_1',
        referencedColumnName: 'id',
      },
      inverseJoinColumn: {
        name: 'user_2',
        referencedColumnName: 'id',
      },
    })
    matches:User[]
    
    @OneToMany(() => Message, (message) => message.sender.id, {
      onDelete: 'CASCADE'
    })
    sentMessages: Message[]

    @OneToMany(() => Message, (message) => message.receiver.id, {
     onDelete: 'CASCADE'
    }
    )
    receivedMessages: Message[]

    @CreateDateColumn({
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP'
    })
    createdAt: Date;
    
    @UpdateDateColumn({
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP',
      onUpdate: 'CURRENT_TIMESTAMP'
    })
    updatedAt: Date;
}