import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateUserDTO {
  @ApiProperty()
  @IsString()
  displayName: string;
  @ApiPropertyOptional()
  ip?: string = '';
}

export class UserDTO {
    uid: string;
    selfDocID: string
    displayName: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    isDeleted: boolean;
    isBanned: boolean;

}