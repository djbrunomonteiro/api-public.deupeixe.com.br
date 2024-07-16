import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EResponse } from 'src/shared/models/response';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import {genSalt, hash} from 'bcryptjs'
import { EMessageResponse } from 'src/shared/enums/messages';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ){}

  async create(createUserDto: CreateUserDto) {
    let response: EResponse;

    try {

      const {email, password} = createUserDto;

      if(!email || !password){
        const param = email ? 'email' : 'password'
        response = { status: 400, error: true, message: EMessageResponse.ERROR_REQUIRED + param}
        throw new BadRequestException(response) 
      }

      const isUser = await this.userRepository.findOne({ where: { email }});

      if(isUser){
        response = { status: 400, error: true, message: EMessageResponse.ERROR_EXIST + email }
        throw new UnauthorizedException(response) 
      }

      const salt = await genSalt()
      const passwordHash = await hash(createUserDto.password, salt);
      createUserDto = {...createUserDto, password: passwordHash};
      delete createUserDto.id;

      const results = await this.userRepository.save(createUserDto);
      response = {error: false, status: 201, results, message: EMessageResponse.SUCCESSO}
      return response
      
    } catch (error) {
      const {status, message} = error;
      response = {error: true, status, message}
      throw new BadRequestException(response);
      
    }

  }


  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
