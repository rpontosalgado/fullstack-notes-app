import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsDateString, IsOptional } from 'class-validator';

export class UpdateNoteDto {
  @ApiPropertyOptional({ example: 'Martins S.A.', description: 'Site name' })
  @IsOptional()
  @IsString()
  site?: string;

  @ApiPropertyOptional({ example: 'Gerador', description: 'Equipment name' })
  @IsOptional()
  @IsString()
  equipment?: string;

  @ApiPropertyOptional({
    example: 'Tensão',
    description: 'Variable being measured',
  })
  @IsOptional()
  @IsString()
  variable?: string;

  @ApiPropertyOptional({
    example: '2024-08-01T18:48:37.381Z',
    description: 'ISO 8601 timestamp',
  })
  @IsOptional()
  @IsDateString()
  timestamp?: string;

  @ApiPropertyOptional({
    example: 'Márcia Albuquerque',
    description: 'Author of the note',
  })
  @IsOptional()
  @IsString()
  author?: string;

  @ApiPropertyOptional({
    example: 'Note message content',
    description: 'Note content',
  })
  @IsOptional()
  @IsString()
  message?: string;
}
