import { IsEmail, IsString, MinLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @MinLength(3)
  name: string;

  @ApiProperty({
    example: 'Password123!',
    description: 'Password must be at least 8 characters long and contain at least one letter, one number, and one special character',
  })
  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&].*$/, {
    message: 'Password must contain at least one letter, one number, and one special character',
  })
  password: string;
} 