import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FilterNotesDto } from './dto/filter-notes.dto';
import { CreateNoteDto } from './dto/create-notes.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { NotesService } from './notes.service';
import { Note } from './note.entity';

@ApiTags('notes')
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
  @ApiQuery({ name: 'site', required: false, description: 'Filter by site' })
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

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new note' })
  @ApiResponse({
    status: 201,
    description: 'Note created successfully',
    type: Note,
  })
  @ApiResponse({ status: 400, description: 'Validation error' })
  createNote(@Body() createNoteDto: CreateNoteDto) {
    return this.notesService.createNote(createNoteDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing note' })
  @ApiParam({ name: 'id', description: 'Note UUID' })
  @ApiResponse({
    status: 200,
    description: 'Note updated successfully',
    type: Note,
  })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 404, description: 'Note not found' })
  updateNote(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateNoteDto: UpdateNoteDto,
  ) {
    return this.notesService.updateNote(id, updateNoteDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a note' })
  @ApiParam({ name: 'id', description: 'Note UUID' })
  @ApiResponse({ status: 204, description: 'Note deleted successfully' })
  @ApiResponse({ status: 404, description: 'Note not found' })
  deleteNote(@Param('id', ParseUUIDPipe) id: string) {
    return this.notesService.deleteNote(id);
  }
}
