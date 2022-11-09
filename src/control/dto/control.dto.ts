import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger"
import { SituationType } from '../entities/control.entity';
import { TypeVehicle } from 'src/vehicle/entities/vehicle.entity';

export class ControlDto {

    id?: string

    @ApiProperty({
        description: 'idvehicle: codigo do veiculo',
        example: '1qew8'
    })
    @IsNotEmpty({ message: 'Digite o Veiculo' })
    idvehicle?: string

    @ApiProperty({
        description: 'idcompany: codigo da empresa',
        example: '2fgh3'
    })
    @IsNotEmpty({ message: 'Digite a empresa' })
    idcompany?: string

    @ApiProperty({
        description: 'CheckIn: entrada do veiculo',
        example: '2022-11-09T12:20:00'
    })
    checkIn?: Date

    @ApiProperty({
        description: 'CheckOut: saida do veiculo',
        example: '2022-11-10T00:00:00'
    })
    checkOut?: Date

    @ApiProperty({
        enum: ['VEHICLE', 'MOTORCICLE'],
        description: 'type spot: tipo de veiculo',
        example: 'VEHICLE, MOTORCICLE'
    })
    @IsNotEmpty({ message: 'Digite o tipo do veiculo' })
    typeSpot?: TypeVehicle;

    @ApiProperty({
        enum: ['PARKED', 'ENDED'],
        description: 'Situacao da vaga de estacionamento',
        example: 'PARKED, ENDED'
    })
    @IsNotEmpty({ message: 'Digite a situacao' })
    situation?: SituationType;
}