import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({
    description: 'User ID',
    example: 1,
    type: Number,
  })
  id: number;

  @ApiProperty({
    description: 'Username',
    example: 'john_doe',
    type: String,
  })
  username: string;

  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
    type: String,
  })
  email: string;

  @ApiProperty({
    description: 'User first name',
    example: 'John',
    type: String,
  })
  firstName: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Doe',
    type: String,
  })
  lastName: string;
}

export class AuthResponseDto {
  @ApiProperty({
    description: 'JWT access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    type: String,
  })
  access_token: string;

  @ApiProperty({
    description: 'User information',
    type: UserResponseDto,
  })
  user: UserResponseDto;
}
