import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { AuthService } from "src/modules/auth/auth.service";


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private readonly authService: AuthService){}

    canActivate(context: ExecutionContext):  Promise<boolean> | Observable<boolean>{
        
        return new Promise<boolean>(async resolve => {
            let error = false;
            const authorization = context.switchToHttp().getRequest()?.headers?.authorization as string;       
            const token = authorization?.split(' ')[1];
            
            if(token){
                const resValid = await this.authService.isValidToken(token);
                error = resValid.error;

            }
            
            resolve(error)
        })


    }
    
}