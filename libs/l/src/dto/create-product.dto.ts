import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsPositive, IsString } from "class-validator";

export class CreateProductDto {
    @ApiProperty({ example: 'nimadir' })
    @IsString()
    name: string

    @ApiProperty({ example: 12312321 })
    @IsInt()
    @IsPositive()
    @Type(() => Number)
    price: number
}