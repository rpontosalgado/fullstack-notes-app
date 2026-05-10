import { Controller, Get, Query } from '@nestjs/common';
import { FilterNotesDto } from './dto/filter-notes.dto';

@Controller('api/v1/notes')
export class NotesController {
  constructor() {}

  @Get()
  getAllNotes(@Query() filters: FilterNotesDto) {
    return filters;
  }
}
