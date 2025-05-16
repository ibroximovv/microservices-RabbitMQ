import { LoginAuthDto, RegisterAuthDto } from '@app/l';
import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'apps/prisma/prisma.service';
import * as bcrypt from "bcrypt";
@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService, private readonly jwt: JwtService){}
  async registerAuht(data: RegisterAuthDto) {
    try {
      const findone = await this.prisma.user.findFirst({ where: { username: data.username }})
      if(findone) throw new BadRequestException('User already exists')
      const hashedPasssword = bcrypt.hashSync(data.password, 10)
      return await this.prisma.user.create({ data: {
        ...data,
        password: hashedPasssword
      }})
    } catch (error) {
      if (error instanceof BadRequestException) throw error
      throw new InternalServerErrorException(error.message || 'Internal server error')
    }
  }

  async loginAuth(data: LoginAuthDto) {
    try {
      const findone = await this.prisma.user.findFirst({ where: { username: data.username }})
      if(!findone) throw new BadRequestException('User not found')
      const matchPassword = bcrypt.compareSync(data.password, findone.password)
      if(!matchPassword) throw new BadRequestException('Password not provided')
      const token = this.jwt.sign({ id: findone.id })
      return { token }
    } catch (error) {
      if (error instanceof BadRequestException) throw error
      throw new InternalServerErrorException(error.message || 'Internal server error')
    }
  }

  async getAllUser() {
    try {
      return await this.prisma.user.findMany()
    } catch (error) {
      if (error instanceof BadRequestException) throw error
      throw new InternalServerErrorException(error.message || 'Internal server error')
    }
  }
}
