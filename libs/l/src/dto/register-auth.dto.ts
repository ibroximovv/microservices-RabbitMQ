import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class RegisterAuthDto {
    @ApiProperty({ example: 'kimdirda' })
    @IsString()
    username: string

    @ApiProperty({ example: 'parool' })
    @IsString()
    password: string
}