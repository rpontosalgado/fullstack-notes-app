import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Like, Repository } from 'typeorm';
import { Note } from './note.entity';
import { FilterNotesDto } from './dto/filter-notes.dto';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private readonly notesRepository: Repository<Note>,
  ) {}

  async getAllNotes(filters: FilterNotesDto) {
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
      // Set end date to end of day
      end.setHours(23, 59, 59, 999);
      where.timestamp = Between(start, end);
    }

    const [data, total] = await this.notesRepository.findAndCount({
      where,
      order: { timestamp: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}
