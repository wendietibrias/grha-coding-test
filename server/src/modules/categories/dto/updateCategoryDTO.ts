import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UpdateCategoryDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    category_title:string;
}