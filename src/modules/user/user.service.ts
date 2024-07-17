import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IResponse } from 'src/shared/models/response';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { genSalt, hash } from 'bcryptjs';
import { EMessageResponse } from 'src/shared/enums/messages';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    let response: IResponse;

    try {
      const { email, password } = createUserDto;

      if (!email || !password) {
        const param = email ? 'email' : 'password';
        response = {
          status: 400,
          error: true,
          message: EMessageResponse.ERROR_REQUIRED + param,
        };
        throw new BadRequestException(response);
      }

      const isUser = await this.userRepository.findOne({ where: { email } });

      if (isUser) {
        response = {
          status: 400,
          error: true,
          message: EMessageResponse.ERROR_EXIST + email,
        };
        throw new UnauthorizedException(response);
      }

      const salt = await genSalt();
      const passwordHash = await hash(password, salt);
      createUserDto = { ...createUserDto, password: passwordHash };
      delete createUserDto.id;

      const results = await this.userRepository.save(createUserDto);
      delete results.password
      response = {
        error: false,
        status: 201,
        results,
        message: EMessageResponse.SUCCESSO,
      };
      return response;
    } catch (error) {
      const { status, message } = error;
      response = { error: true, status, message };
      throw new BadRequestException(response);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    let response: IResponse;
    console.log('UPDATEE');

    try {
      const isUser = await this.userRepository.findOneBy({ id });
      console.log(isUser, id);
      
      if (!isUser) {
        response = {
          status: 401,
          error: true,
          message: EMessageResponse.ERROR_REQUIRED + 'Usuário valído',
        };
        throw new UnauthorizedException(response);
      }

      const { password } = updateUserDto;
      if (password) {
        const salt = await genSalt();
        const passwordHash = await hash(password, salt);
        updateUserDto = { ...updateUserDto, password: passwordHash };
      }

      const {affected} = await this.userRepository.update(id, updateUserDto);
      let results = {...isUser}
      if(affected > 0){
        results = {...results, ...updateUserDto}
      }

      delete results.password

      response = {
        error: false,
        status: 200,
        results,
        message: EMessageResponse.SUCCESSO,
      };
      return response;
    } catch (error) {
      const { status, message } = error;
      response = { error: true, status, message };
      throw new BadRequestException(response);
    }
  }

  async getOneByEmail(email: string){
    if(!email){return null}
    return await this.userRepository.findOne({where: {email}});
  }
}
