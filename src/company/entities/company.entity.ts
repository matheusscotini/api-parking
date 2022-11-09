import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Company {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ length: 100 })
    name: string

    @Column({ length: 20 })
    cnpj: string

    @Column({ length: 100 })
    address: string

    @Column({ length: 20 })
    phone: string

    @Column('int', { default: 0 })
    amountAvailableMotorcycle: number

    @Column('int', { default: 0 })
    amountAvailableCar: number
}