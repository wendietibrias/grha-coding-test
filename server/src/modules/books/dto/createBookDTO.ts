import { ApiProperty } from "@nestjs/swagger";
import {  Type } from "class-transformer";
import {
    IsDate,
    IsDateString,
    IsNotEmpty,
    IsNumber,
    IsString
} from 'class-validator';

export class CreateBookDTO{
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    title:string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description:string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    language:string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    publisher:string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    author:string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    release_date:Date;

    @ApiProperty()
    @IsNotEmpty()
    @Type(()=>Number)
    @IsNumber()
    total_page:number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    isbn:string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    category: string;

    @ApiProperty({ type: 'string', format: 'binary', required: true })
    cover: Express.Multer.File
}