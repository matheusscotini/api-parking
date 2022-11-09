import { Injectable, Inject } from '@nestjs/common';
import { validate } from 'class-validator';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserDto } from './dto/user.dto';
import { UserPartialDto } from './dto/userPartial.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<UserDto[]> {
    try {
      return this.userRepository.find();
    } catch (error) {
      return error;
    }
  }

  async findOne(id: string): Promise<UserDto> {
    try {
      return await this.userRepository.findOneBy({ id: id })
    } catch (error) {
      return error;
    }
  }

  async findOneByEmail(email: string): Promise<UserDto | undefined> {
    try {
      return await this.userRepository.findOneBy({ email })
    } catch (error) {
      return error;
    }
  }

  async create(data: UserDto): Promise<UserDto> {
    let user = new UserDto()

    try {
      const errors = await validate(data)

      user = data
      user.password = bcrypt.hashSync(data.password, 8)

      if (errors.length > 0) {
        throw new Error(`Validation failed!`)
      } else {
        return this.userRepository.save(user)
      }
    } catch (error) {
      return error;
    }
  }

  async update(oldData: UserDto, newValues: UserPartialDto): Promise<UserDto> {
    const updatedData = oldData;

    try {
      Object.keys(newValues).forEach((key) => {
        updatedData[key] = newValues[key];
      });

      const errors = await validate(updatedData)

      if (errors.length > 0) {
        throw new Error(`Validation failed!`)
      } else {
        return await this.userRepository.save(updatedData);
      }
    } catch (error) {
      return error;
    }
  }

  async delete(id: string) {
   try {
      return await this.userRepository.delete(id);
    } catch (error) {
      return error
    }
  }
}