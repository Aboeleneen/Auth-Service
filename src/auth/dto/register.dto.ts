import { IsEmail, IsString, MinLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'The email address of the user'
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the user',
    minLength: 3
  })
  @IsString()
  @MinLength(3)
  name: string;

  @ApiProperty({
    example: 'Pass123!@#',
    description: 'User password - must contain at least one letter, one number, and one special character',
    minLength: 8
  })
  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&].*$/, {
    message: 'Password must contain at least one letter, one number, and one special character',
  })
  password: string;
} 