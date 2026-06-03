import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Like, Repository } from 'typeorm';
import { Note } from './note.entity';
import { FilterNotesDto } from './dto/filter-notes.dto';
import { CreateNoteDto } from './dto/create-notes.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private readonly notesRepository: Repository<Note>,
    private readonly logger: Logger = new Logger(NotesService.name),
  ) {}

  async getAllNotes(filters: FilterNotesDto) {
    this.logger.debug(
      {
        method: this.getAllNotes.name,
        msg: `Getting all notes with filters: ${JSON.stringify(filters)}`,
      },
      NotesService.name,
    );

    const {
      site,
      equipment,
      startDate,
      endDate,
      page = 1,
      limit = 10,
    } = filters;

    const where: any = {};

    if (site) {
      where.site = Like(`%${site}%`);
    }

    if (equipment) {
      where.equipment = Like(`%${equipment}%`);
    }

    if (startDate || endDate) {
      const start = startDate ? new Date(startDate) : new Date('1970-01-01');
      const end = endDate ? new Date(endDate) : new Date();
      end.setHours(23, 59, 59, 999);
      where.timestamp = Between(start, end);
    }

    const [data, total] = await this.notesRepository.findAndCount({
      where,
      order: { timestamp: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    this.logger.log(
      {
        method: this.getAllNotes.name,
        msg: `Success: found ${data.length} notes (total: ${total})`,
        filters: { site, equipment, startDate, endDate },
        pagination: { page, limit },
      },
      NotesService.name,
    );

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getNote(id: string): Promise<Note> {
    this.logger.debug(
      {
        method: this.getNote.name,
        msg: `Getting note with ID: ${id}`,
      },
      NotesService.name,
    );

    const note = await this.notesRepository.findOne({ where: { id } });
    if (!note) {
      throw new NotFoundException(`Note with ID "${id}" not found`);
    }

    this.logger.log(
      {
        method: this.getNote.name,
        msg: `Success: found note with ID ${id}`,
        result: note,
      },
      NotesService.name,
    );

    return note;
  }

  async createNote(createNoteDto: CreateNoteDto): Promise<Note> {
    this.logger.debug(
      {
        method: this.createNote.name,
        msg: `Creating note`,
        data: createNoteDto,
      },
      NotesService.name,
    );

    const note = this.notesRepository.create({
      id: uuidv4(),
      ...createNoteDto,
      timestamp: new Date(createNoteDto.timestamp),
    });

    const saved = await this.notesRepository.save(note);

    this.logger.log(
      {
        method: this.createNote.name,
        msg: `Note created successfully`,
        result: saved,
      },
      NotesService.name,
    );

    return saved;
  }

  async updateNote(id: string, updateNoteDto: UpdateNoteDto): Promise<Note> {
    this.logger.debug(
      {
        method: this.updateNote.name,
        msg: `Updating note with ID: ${id}`,
        data: updateNoteDto,
      },
      NotesService.name,
    );

    const note = await this.getNote(id);

    const updated = this.notesRepository.merge(note, {
      ...updateNoteDto,
      ...(updateNoteDto.timestamp && {
        timestamp: new Date(updateNoteDto.timestamp),
      }),
    });

    const saved = await this.notesRepository.save(updated);

    this.logger.log(
      {
        method: this.updateNote.name,
        msg: `Note updated successfully`,
        result: saved,
      },
      NotesService.name,
    );

    return saved;
  }

  async deleteNote(id: string): Promise<void> {
    this.logger.debug(
      {
        method: this.deleteNote.name,
        msg: `Deleting note with ID: ${id}`,
      },
      NotesService.name,
    );

    const note = await this.getNote(id);
    await this.notesRepository.remove(note);

    this.logger.log(
      {
        method: this.deleteNote.name,
        msg: `Note deleted successfully`,
        id,
      },
      NotesService.name,
    );
  }
}
