import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Token {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ length: 255 })
    hash: string

    @Column({ length: 100 })
    username: string
}