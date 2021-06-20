import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, isBoolean, IsBoolean, IsInt, IsNumber, isString, IsString } from 'class-validator';
export class CreateGameDto {
    @ApiProperty()
    @IsString()
    banner_img_self_link: string;
    @ApiProperty()
    @IsString()
    developer: string;
    @ApiProperty()
    @IsString()
    game_id: string;
    @ApiProperty()
    @IsString()
    game_title: string;
    @ApiProperty()
    @IsString()
    img_self_link: string;
    @ApiProperty()
    @IsBoolean()
    is_digital: boolean;
    @ApiProperty()
    @IsBoolean()
    is_physical: boolean;
    @ApiProperty()
    @IsArray({context: IsString})
    platforms: [string];
    @ApiProperty()
    @IsNumber()
    msrp: number;
    @ApiProperty()
    @IsString()
    publisher: string;
    @ApiProperty()
    release_date: Date;
    @ApiProperty()
    @IsString()
    switch_img_self_link: string;
    @ApiProperty()
    @IsBoolean()
    visibility: boolean
}
