import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
    IsDateString,
    IsOptional,
    IsNumber,
    IsString
} from 'class-validator';

export class UpdateBookDTO{
    @ApiProperty()
    @IsOptional()
    @IsString()
    title:string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    description:string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    language:string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    publisher:string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    author:string;

    @ApiProperty()
    @IsOptional()
    @IsDateString()
    release_date:Date;

    @ApiProperty()
    @IsOptional()
    @Type(()=>Number)
    @IsNumber()
    total_page:number;

    @ApiProperty()
    @IsOptional()
    @IsString()
    isbn:string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    category: string;

    @ApiProperty({ type: 'string', format: 'binary', required: false })
    @IsOptional()
    cover: Express.Multer.File

    @ApiProperty()
    @IsString()
    @IsOptional()
    old_cover_id:string;
}