import { Controller, Post, Body} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthTokenDto, LoginAuthDto } from './dto/create-auth.dto';

@Controller({
  path: 'auth',
  version: '1'
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.create(loginAuthDto);
  }

  @Post('validate')
  async validateToken(@Body() body: AuthTokenDto){
      return this.authService.isValidToken(body.access_token);
  }

}
