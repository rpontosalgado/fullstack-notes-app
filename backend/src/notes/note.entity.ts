import { Entity, PrimaryColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('notes')
export class Note {
  @ApiProperty({ example: 'uuid-v4', description: 'Unique identifier (UUID)' })
  @PrimaryColumn('uuid')
  id!: string;

  @ApiProperty({ example: 'Martins S.A.', description: 'Site name' })
  @Column()
  site!: string;

  @ApiProperty({ example: 'Gerador', description: 'Equipment name' })
  @Column()
  equipment!: string;

  @ApiProperty({ example: 'Tensão', description: 'Variable being measured' })
  @Column()
  variable!: string;

  @ApiProperty({
    example: '2024-08-01T18:48:37.381Z',
    description: 'ISO 8601 timestamp',
  })
  @Column({ type: 'timestamptz' })
  timestamp!: Date;

  @ApiProperty({
    example: 'Márcia Albuquerque',
    description: 'Author of the note',
  })
  @Column()
  author!: string;

  @ApiProperty({ example: 'Note message text', description: 'Note content' })
  @Column({ type: 'text' })
  message!: string;
}
