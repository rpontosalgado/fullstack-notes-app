import { Controller, Get, Query } from '@nestjs/common';
import { FilterNotesDto } from './dto/filter-notes.dto';
import { NotesService } from './notes.service';

@Controller('api/v1/notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  getAllNotes(@Query() filters: FilterNotesDto) {
    return this.notesService.getAllNotes(filters);
  }
}
