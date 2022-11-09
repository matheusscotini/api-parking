import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger"

export class UserDto {

    @ApiProperty({
        description: 'Nome: nome do usuario',
        example: 'Matheus Scotini'
    })
    @IsString({ message: 'O campo deve ser tipo string' })
    @IsNotEmpty({ message: 'Digite o Nome' })
    @Length(1, 100, { message: 'Obrigatorio 1 a 100 caracteres no campo' })
    name?: string

    @ApiProperty({
        description: 'Email: email do usuario',
        example: 'matheus@email.com.br'
    })
    @IsString({ message: 'O campo deve ser tipo string' })
    @IsNotEmpty({ message: 'Digite o email' })
    @Length(1, 100, { message: 'Obrigatorio 1 a 100 caracteres no campo' })
    @IsEmail({ message: 'Digite um email valido' })
    email?: string

    @ApiProperty({
        description: 'Senha: senha do usuario',
        example: 'pswrd123'
    })
    @Length(1, 100, { message: 'Obrigatorio 1 a 100 caracteres no campo' })
    @IsString({ message: 'O campo deve ser tipo string' })
    @IsNotEmpty({ message: 'Digite a senha' })
    password?: string
}