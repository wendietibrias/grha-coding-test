import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDTO{
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name:string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;
  
    @ApiProperty()
    @IsNotEmpty()
    @MinLength(8)
    password: string;

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(8)
    confirm: string;
}