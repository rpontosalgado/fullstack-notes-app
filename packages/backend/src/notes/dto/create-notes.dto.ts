import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateNoteDto {
  @ApiProperty({ example: 'Martins S.A.', description: 'Site name' })
  @IsString()
  @IsNotEmpty()
  site!: string;

  @ApiProperty({ example: 'Gerador', description: 'Equipment name' })
  @IsString()
  @IsNotEmpty()
  equipment!: string;

  @ApiProperty({ example: 'Tensão', description: 'Variable being measured' })
  @IsString()
  @IsNotEmpty()
  variable!: string;

  @ApiProperty({
    example: '2024-08-01T18:48:37.381Z',
    description: 'ISO 8601 timestamp',
  })
  @IsDateString()
  @IsNotEmpty()
  timestamp!: string;

  @ApiProperty({
    example: 'Márcia Albuquerque',
    description: 'Author of the note',
  })
  @IsString()
  @IsNotEmpty()
  author!: string;

  @ApiProperty({ example: 'Note message content', description: 'Note content' })
  @IsString()
  @IsNotEmpty()
  message!: string;
}
