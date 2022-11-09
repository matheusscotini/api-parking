import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from './constants';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { TokenModule } from 'src/token/token.module';

@Module({
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy
  ],
  imports: [
    UserModule, 
    PassportModule,
    TokenModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    })
  ],
  exports: [
    AuthService,
    JwtModule
  ]
})
export class AuthModule {}
