import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Gender } from '../models/user.model';

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
    age: string

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

    @Column('simple-array')
    likes: string[]

    @Column('simple-array')
    dislikes: string[]

    @Column('simple-array')
    matches: string[]
}