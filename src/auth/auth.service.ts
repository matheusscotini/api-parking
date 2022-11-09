/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { TokenService } from 'src/token/token.service';
import { UserDto } from 'src/user/dto/user.dto';

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private tokenService: TokenService
    ) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.findOneByEmail(email)
        if(user && bcrypt.compareSync(password, user.password)){
            const { password, ...result } = user
            
            return result
        }
        return null
    }

    async login(user: any) {
        const payload = { username: user.email, sub: user.id };
        const token = this.jwtService.sign(payload)

        this.tokenService.save(token, user.email)

        return {
          access_token: token
        };
    }

    async loginToken(token: string) {
        const usuario: UserDto = await this.tokenService.getUsuarioByToken(token)
        if (usuario){
            return this.login(usuario)
        }else{
            return new HttpException({
                errorMessage: 'Token inválido'
            }, HttpStatus.UNAUTHORIZED)
        }
    }
}
