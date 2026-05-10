import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { FilterNotesDto } from './dto/filter-notes.dto';
import { NotesService } from './notes.service';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { Note } from './note.entity';

@Controller('api/v1/notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  @ApiOperation({
    summary: 'List all notes with optional filters and pagination',
  })
  @ApiResponse({
    status: 200,
    description: 'Paginated list of notes',
    type: Note,
  })
  @ApiQuery({
    name: 'site',
    required: false,
    description: 'Filter by equipment',
  })
  @ApiQuery({
    name: 'equipment',
    required: false,
    description: 'Filter by equipment',
  })
  @ApiQuery({
    name: 'startDate',
    required: false,
    description: 'Filter from date (ISO 8601)',
  })
  @ApiQuery({
    name: 'endDate',
    required: false,
    description: 'Filter to date (ISO 8601)',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number (default: 1)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Items per page (default: 10)',
  })
  getAllNotes(@Query() filters: FilterNotesDto) {
    return this.notesService.getAllNotes(filters);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single note by ID' })
  @ApiParam({ name: 'id', description: 'Note UUID' })
  @ApiResponse({ status: 200, description: 'The note', type: Note })
  @ApiResponse({ status: 404, description: 'Note not found' })
  getNote(@Param('id', ParseUUIDPipe) id: string) {
    return this.notesService.getNote(id);
  }
}
