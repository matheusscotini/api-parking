/* eslint-disable prettier/prettier */
import { IsInt, IsNotEmpty, IsString, Length, Max, Min } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger"

export class CompanyDto {

    @ApiProperty({
        description: 'Nome: nome da empresa',
        example: 'Microsoft'
    })
    @IsString({ message: 'O campo deve ser tipo string' })
    @IsNotEmpty({ message: 'Digite o nome' })
    @Length(1, 20, { message: 'Obrigatorio 1 a 20 caracteres no campo' })
    name?: string

    @ApiProperty({
        description: 'CNPJ: CNPJ da companhia',
        example: '123.456.789/0001-00'
    })
    @Length(1, 20, { message: 'Obrigatorio 1 a 20 caracteres no campo' })
    @IsString({ message: 'O campo deve ser tipo string' })
    @IsNotEmpty({ message: 'Digite o CNPJ' })
    cnpj?: string

    @ApiProperty({
        description: 'Endereco: endereço da empresa',
        example: 'Al Rio Negro, 123'
    })
    @Length(1, 20, { message: 'Obrigatorio 1 a 20 caracteres no campo' })
    @IsString({ message: 'O campo deve ser tipo stringEndereço deve ser do tipo string' })
    @IsNotEmpty({ message: 'Digite o endereco' })
    address?: string

    @ApiProperty({
        description: 'Fone: telefone da empresa',
        example: '(11)91234-5678'
    })
    @Length(1, 20, { message: 'Obrigatorio 1 a 20 caracteres no campo' })
    @IsString({ message: 'O campo deve ser tipo string' })
    @IsNotEmpty({ message: 'Digite o telefone' })
    phone?: string;

    @ApiProperty({
        description: 'Quantidade disponivel para motos: quantidade disponivel de motos no estacionamento',
        example: '22'
    })
    @IsInt({ message: 'O campo deve ser tipo number' })
    @Min(0, { message: 'Quantidade minima deve ser zero' })
    @Max(999, { message: 'Quantidade maxima deve ser 999' })
    amountAvailableMotorcycle?: number;

    @ApiProperty({
        description: 'Quantidade disponivel para carros: quantidade disponivel de carros no estacionamento',
        example: '19'
    })
    @IsInt({ message: 'O campo deve ser tipo number' })
    @Min(0, { message: 'Quantidade minima deve ser zero' })
    @Max(999, { message: 'Quantidade maxima deve ser 999' })
    amountAvailableCar?: number;
}