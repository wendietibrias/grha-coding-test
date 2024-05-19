import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";

export class GetBookDTO {
    @ApiProperty({ default:1 })
    @IsNotEmpty()
    @Type(()=>Number)
    @IsNumber()
    page:number;

    @ApiProperty({ default:10 })
    @IsNotEmpty()
    @Type(()=>Number)
    @IsNumber()
    per_page:number;
}