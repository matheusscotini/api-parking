import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum TypeVehicle {
    VEHICLE = 'VEHICLE',
    MOTORCICLE = 'MOTORCICLE'
}

@Entity()
export class Vehicle {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ length: 20 })
    brand: string

    @Column({ length: 20 })
    model: string

    @Column({ length: 20 })
    color: string

    @Column({ length: 20 })
    plate: string

    @Column({ type: "enum", enum: TypeVehicle, default: TypeVehicle.VEHICLE })
    type: TypeVehicle
}