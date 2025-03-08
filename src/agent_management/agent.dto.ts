import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class AgentDTO {
  @ApiProperty({ example: 'John Doe', description: 'Name of the agent' })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'johndoe@example.com',
    description: 'Email of the agent',
  })
  @IsEmail()
  email: string;
}
