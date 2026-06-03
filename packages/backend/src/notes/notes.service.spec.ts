import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Logger, NotFoundException } from '@nestjs/common';
import { NotesService } from './notes.service';
import { Note } from './note.entity';

const mockNote: Note = {
  id: '123e4567-e89b-12d3-a456-426614174000',
  site: 'Martins S.A.',
  equipment: 'Gerador',
  variable: 'Tensão',
  timestamp: new Date('2024-01-15T10:00:00.000Z'),
  author: 'Daniel Moraes',
  message: 'Nota de teste',
};

const mockPaginatedResult = {
  data: [mockNote],
  total: 1,
  page: 1,
  limit: 10,
  totalPages: 1,
};

const mockRepository = {
  findAndCount: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  merge: jest.fn(),
  remove: jest.fn(),
};

describe('NotesService', () => {
  let service: NotesService;
  let repository: Repository<Note>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotesService,
        {
          provide: getRepositoryToken(Note),
          useValue: mockRepository,
        },
        Logger,
      ],
    }).compile();

    service = module.get<NotesService>(NotesService);
    repository = module.get<Repository<Note>>(getRepositoryToken(Note));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllNotes', () => {
    it('should return a paginated list of notes', async () => {
      mockRepository.findAndCount.mockResolvedValue([[mockNote], 1]);

      const result = await service.getAllNotes({ page: 1, limit: 10 });

      expect(result).toEqual(mockPaginatedResult);
      expect(repository.findAndCount).toHaveBeenCalledWith(
        expect.objectContaining({
          skip: 0,
          take: 10,
          order: { timestamp: 'DESC' },
        }),
      );
    });

    it('should apply site filter', async () => {
      mockRepository.findAndCount.mockResolvedValue([[mockNote], 1]);

      await service.getAllNotes({ site: 'Martins', page: 1, limit: 10 });

      expect(repository.findAndCount).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ site: expect.anything() }),
        }),
      );
    });

    it('should apply equipment filter', async () => {
      mockRepository.findAndCount.mockResolvedValue([[mockNote], 1]);

      await service.getAllNotes({ equipment: 'Gerador', page: 1, limit: 10 });

      expect(repository.findAndCount).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ equipment: expect.anything() }),
        }),
      );
    });

    it('should apply date range filter', async () => {
      mockRepository.findAndCount.mockResolvedValue([[mockNote], 1]);

      await service.getAllNotes({
        startDate: '2024-01-01',
        endDate: '2024-01-31',
        page: 1,
        limit: 10,
      });

      expect(repository.findAndCount).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ timestamp: expect.anything() }),
        }),
      );
    });

    it('should calculate pagination correctly', async () => {
      mockRepository.findAndCount.mockResolvedValue([[mockNote], 25]);

      const result = await service.getAllNotes({ page: 2, limit: 10 });

      expect(result.total).toBe(25);
      expect(result.page).toBe(2);
      expect(result.totalPages).toBe(3);
      expect(repository.findAndCount).toHaveBeenCalledWith(
        expect.objectContaining({ skip: 10, take: 10 }),
      );
    });

    it('should return empty data when no notes are found', async () => {
      mockRepository.findAndCount.mockResolvedValue([[], 0]);

      const result = await service.getAllNotes({ page: 1, limit: 10 });

      expect(result.data).toEqual([]);
      expect(result.total).toBe(0);
      expect(result.totalPages).toBe(0);
    });
  });

  describe('getNote', () => {
    it('should return a note by id', async () => {
      mockRepository.findOne.mockResolvedValue(mockNote);

      const result = await service.getNote(mockNote.id);

      expect(result).toEqual(mockNote);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: mockNote.id },
      });
    });

    it('should throw NotFoundException when note does not exist', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.getNote('non-existent-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('createNote', () => {
    it('should create and return a new note', async () => {
      const createDto = {
        site: 'Martins S.A.',
        equipment: 'Gerador',
        variable: 'Tensão',
        timestamp: '2024-01-15T10:00:00.000Z',
        author: 'Daniel Moraes',
        message: 'Nota de teste',
      };

      mockRepository.create.mockReturnValue(mockNote);
      mockRepository.save.mockResolvedValue(mockNote);

      const result = await service.createNote(createDto);

      expect(result).toEqual(mockNote);
      expect(repository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          site: createDto.site,
          equipment: createDto.equipment,
          variable: createDto.variable,
          author: createDto.author,
          message: createDto.message,
        }),
      );
      expect(repository.save).toHaveBeenCalledWith(mockNote);
    });
  });

  describe('updateNote', () => {
    it('should update and return the note', async () => {
      const updateDto = { message: 'Mensagem atualizada' };
      const updatedNote = { ...mockNote, message: 'Mensagem atualizada' };

      mockRepository.findOne.mockResolvedValue(mockNote);
      mockRepository.merge.mockReturnValue(updatedNote);
      mockRepository.save.mockResolvedValue(updatedNote);

      const result = await service.updateNote(mockNote.id, updateDto);

      expect(result).toEqual(updatedNote);
      expect(repository.merge).toHaveBeenCalledWith(
        mockNote,
        expect.objectContaining({ message: 'Mensagem atualizada' }),
      );
      expect(repository.save).toHaveBeenCalledWith(updatedNote);
    });

    it('should throw NotFoundException when note does not exist', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(
        service.updateNote('non-existent-id', { message: 'Teste' }),
      ).rejects.toThrow(NotFoundException);
    });

    it('should convert timestamp string to Date when provided', async () => {
      const updateDto = { timestamp: '2024-06-01T12:00:00.000Z' };
      const updatedNote = {
        ...mockNote,
        timestamp: new Date(updateDto.timestamp),
      };

      mockRepository.findOne.mockResolvedValue(mockNote);
      mockRepository.merge.mockReturnValue(updatedNote);
      mockRepository.save.mockResolvedValue(updatedNote);

      await service.updateNote(mockNote.id, updateDto);

      expect(repository.merge).toHaveBeenCalledWith(
        mockNote,
        expect.objectContaining({ timestamp: new Date(updateDto.timestamp) }),
      );
    });
  });

  describe('deleteNote', () => {
    it('should delete the note successfully', async () => {
      mockRepository.findOne.mockResolvedValue(mockNote);
      mockRepository.remove.mockResolvedValue(mockNote);

      await service.deleteNote(mockNote.id);

      expect(repository.remove).toHaveBeenCalledWith(mockNote);
    });

    it('should throw NotFoundException when note does not exist', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.deleteNote('non-existent-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
