import { Company } from 'src/company/entities/company.entity';
import { TypeVehicle, Vehicle } from 'src/vehicle/entities/vehicle.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Timestamp, OneToOne, NoVersionOrUpdateDateColumnError, OneToMany } from 'typeorm';

export enum SituationType {
    PARKED = 'PARKED',
    ENDED = 'ENDED'
}

@Entity()
export class Control {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(() => Company)
    @JoinColumn({ name: 'idcompany', referencedColumnName: 'id' })
    idcompany: string

    @ManyToOne(() => Vehicle)
    @JoinColumn({ name: 'idvehicle', referencedColumnName: 'id' })
    idvehicle: string

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    checkIn: Date

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'  })
    checkOut: Date

    @Column({ type: "enum", enum: TypeVehicle, default: TypeVehicle.VEHICLE })
    typeSpot: TypeVehicle

    @Column({ type: "enum", enum: SituationType, default: SituationType.PARKED })
    situation: SituationType
}