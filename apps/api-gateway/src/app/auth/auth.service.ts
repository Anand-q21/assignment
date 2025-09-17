import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '@shared/dtos';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  private users = [
    { id: 1, username: 'bob', password: 'secret' },
    { id: 2, username: 'alice', password: 'password' },
  ];

  async login(loginDto: LoginDto) {
    const user = this.users.find(
      (u) =>
        u.username === loginDto.username && u.password === loginDto.password,
    );

    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const payload = { username: user.username, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN ,
      }),
    };
  }
}