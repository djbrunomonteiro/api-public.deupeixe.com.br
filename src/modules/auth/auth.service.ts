import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto, LoginAuthDto } from './dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { IResponse } from 'src/shared/models/response';
import { EMessageResponse } from 'src/shared/enums/messages';
import { compare } from 'bcryptjs';
import { TokenEntity } from './entities/token.entity';
import { UserService } from '../user/user.service';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(TokenEntity)
    private tokenRepository: Repository<TokenEntity>,
    private jwtService: JwtService,
    private userService: UserService
){}

  async create(loginAuthDto: LoginAuthDto) {
    let response: IResponse;
    try {
      const {email, password} = loginAuthDto;
      const user = await this.userService.getOneByEmail(email);
      if(!user || !await compare(password, user.password)){
        response = {status: 401, error: true, message: EMessageResponse.ERROR_LOGIN};
        throw new UnauthorizedException(response);
      };
      const access_token = await this.createToken(user);
      const tokenDto: CreateAuthDto = {id_user: user.id, access_token}
      await this.tokenRepository.save(tokenDto) 
      delete user.password;

      const results = {access_token, user}
      response = {status: 200, error: false, results, message: EMessageResponse.SUCCESSO};
      return response;
    } catch (error) {
      console.log(error);
      
      const { status, message } = error;
      response = { error: true, status, message };
      throw new BadRequestException(response);
    }
  }

  async createToken(user: UserEntity){
    return await this.jwtService.sign({
        id: user.id,
        name: user.name,
        email: user.email,
        perms: user.permission
    },{
        expiresIn: "300 days",
        subject: String(user.id)
    })

}

  async isValidToken(access_token: string){
    let response: IResponse;
    try{
      const exist = await this.tokenRepository.find({where: {access_token}});
      if(!exist){
        response = {error: true, status: 404, message: EMessageResponse.EMPTY};
        throw new UnauthorizedException(response);
      }

      const results = this.jwtService.verify(access_token);
      response = {error: true, status: 200, results, message: EMessageResponse.SUCCESSO};
      return response;

    } catch (error){
      const { status, message } = error;
      response = { error: true, status, message };
      throw new BadRequestException(response);
    }

}


}
