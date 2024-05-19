import { Body, Controller, Post, Version } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { LoginDTO } from "./dto/LoginDTO";
import { RegisterDTO } from "./dto/RegisterDTO";

@ApiTags('Auth - Endpoint')
@Controller('api/auth')
export class AuthController{
    constructor(
        private readonly authService: AuthService
    ){}

    @Version('1')
    @Post('login')
    async login(@Body() body: LoginDTO){
        return await this.authService.login(body);
    }

    @Version('1')
    @Post('register')
    async register(@Body() body: RegisterDTO){
        return await this.authService.register(body);
    }
}