import { IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger"
import { TypeVehicle } from '../entities/vehicle.entity';

export class VehicleDto {

    @ApiProperty({
        description: 'Marca: marca do veiculo',
        example: 'Ford'
    })
    @IsString({ message: 'O campo deve ser tipo string' })
    @IsNotEmpty({ message: 'Digite a marca' })
    @Length(1, 20, { message: 'Obrigatorio 1 a 20 caracteres no campo' })
    brand?: string;

    @ApiProperty({
        description: 'Modelo: modelo do veiculo',
        example: 'Fusion'
    })
    @IsString({ message: 'O campo deve ser tipo string' })
    @IsNotEmpty({ message: 'Digite o modelo' })
    @Length(1, 20, { message: 'Obrigatorio 1 a 20 caracteres no campo' })
    model?: string;

    @ApiProperty({
        description: 'Cor: cor do veiculo',
        example: 'Preto'
    })
    @IsString({ message: 'O campo deve ser tipo string' })
    @IsNotEmpty({ message: 'Digite a cor' })
    @Length(1, 20, { message: 'Obrigatorio 1 a 20 caracteres no campo' })
    color?: string;

    @ApiProperty({
        description: 'Placa: placa do veiculo',
        example: 'ABC-1234 / ABC-1D23'
    })
    @IsString({ message: 'O campo deve ser tipo string' })
    @IsNotEmpty({ message: 'Digite a placa' })
    @Length(1, 20, { message: 'Obrigatorio 1 a 20 caracteres no campo' })
    plate?: string;

    @ApiProperty({
        enum: ['VEHICLE', 'MOTORCICLE'],
        description: 'Tipo: tipo do veiculo',
        example: 'VEHICLE, MOTORCICLE'
    })
    @IsString({ message: 'O campo deve ser tipo string' })
    @IsNotEmpty({ message: 'Digite o tipo' })
    @Length(1, 20, { message: 'Obrigatorio 1 a 20 caracteres no campo' })
    type?: TypeVehicle;
}