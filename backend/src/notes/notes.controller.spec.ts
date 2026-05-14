import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { type Server } from 'http';

const mockNote = {
  id: '123e4567-e89b-12d3-a456-426614174000',
  site: 'Martins S.A.',
  equipment: 'Gerador',
  variable: 'Tensão',
  timestamp: '2024-01-15T10:00:00.000Z',
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

const mockNotesService = {
  getAllNotes: jest.fn(),
  getNote: jest.fn(),
  createNote: jest.fn(),
};

describe('NotesController (integration)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotesController],
      providers: [
        {
          provide: NotesService,
          useValue: mockNotesService,
        },
      ],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  afterEach(async () => {
    jest.clearAllMocks();
    await app.close();
  });

  describe('GET /api/v1/notes', () => {
    it('should return a paginated list of notes', async () => {
      mockNotesService.getAllNotes.mockResolvedValue(mockPaginatedResult);

      const response = await request(app.getHttpServer() as Server)
        .get('/api/v1/notes')
        .expect((res) => console.log(res.body));

      expect(response.body).toEqual(mockPaginatedResult);
      expect(mockNotesService.getAllNotes).toHaveBeenCalledTimes(1);
    });

    it('should pass site filter to service', async () => {
      mockNotesService.getAllNotes.mockResolvedValue(mockPaginatedResult);

      await request(app.getHttpServer() as Server)
        .get('/api/v1/notes?site=Martins')
        .expect(200);

      expect(mockNotesService.getAllNotes).toHaveBeenCalledWith(
        expect.objectContaining({ site: 'Martins' }),
      );
    });

    it('should pass equipment filter to service', async () => {
      mockNotesService.getAllNotes.mockResolvedValue(mockPaginatedResult);

      await request(app.getHttpServer() as Server)
        .get('/api/v1/notes?equipment=Gerador')
        .expect(200);

      expect(mockNotesService.getAllNotes).toHaveBeenCalledWith(
        expect.objectContaining({ equipment: 'Gerador' }),
      );
    });

    it('should pass date range filters to service', async () => {
      mockNotesService.getAllNotes.mockResolvedValue(mockPaginatedResult);

      await request(app.getHttpServer() as Server)
        .get('/api/v1/notes?startDate=2024-01-01&endDate=2024-01-31')
        .expect(200);

      expect(mockNotesService.getAllNotes).toHaveBeenCalledWith(
        expect.objectContaining({
          startDate: '2024-01-01',
          endDate: '2024-01-31',
        }),
      );
    });

    it('should pass pagination params to service', async () => {
      mockNotesService.getAllNotes.mockResolvedValue(mockPaginatedResult);

      await request(app.getHttpServer() as Server)
        .get('/api/v1/notes?page=2&limit=5')
        .expect(200);

      expect(mockNotesService.getAllNotes).toHaveBeenCalledWith(
        expect.objectContaining({ page: 2, limit: 5 }),
      );
    });
  });

  describe('GET /api/v1/notes/:id', () => {
    it('should return a single note by id', async () => {
      mockNotesService.getNote.mockResolvedValue(mockNote);

      const response = await request(app.getHttpServer() as Server)
        .get(`/api/v1/notes/${mockNote.id}`)
        .expect(200);

      expect(response.body).toEqual(mockNote);
    });

    it('should return 404 when note is not found', async () => {
      mockNotesService.getNote.mockRejectedValue(
        Object.assign(new Error('Not found'), { status: 404 }),
      );

      await request(app.getHttpServer() as Server)
        .get('/api/v1/notes/non-existent-id')
        .expect(400); // 400 because uuid pipe rejects invalid uuid format
    });
  });

  describe('POST /api/v1/notes', () => {
    const validPayload = {
      site: 'Martins S.A.',
      equipment: 'Gerador',
      variable: 'Tensão',
      timestamp: '2024-01-15T10:00:00.000Z',
      author: 'Daniel Moraes',
      message: 'Nota de teste',
    };

    it('should create and return a new note', async () => {
      mockNotesService.createNote.mockResolvedValue(mockNote);

      const response = await request(app.getHttpServer() as Server)
        .post('/api/v1/notes')
        .send(validPayload)
        .expect(201);

      expect(response.body).toEqual(mockNote);
      expect(mockNotesService.createNote).toHaveBeenCalledWith(validPayload);
    });

    it('should return 400 when required fields are missing', async () => {
      await request(app.getHttpServer() as Server)
        .post('/api/v1/notes')
        .send({ site: 'Martins S.A.' })
        .expect(400);

      expect(mockNotesService.createNote).not.toHaveBeenCalled();
    });

    it('should return 400 when timestamp is not a valid date', async () => {
      await request(app.getHttpServer() as Server)
        .post('/api/v1/notes')
        .send({ ...validPayload, timestamp: 'not-a-date' })
        .expect(400);

      expect(mockNotesService.createNote).not.toHaveBeenCalled();
    });

    it('should return 400 when extra fields are sent', async () => {
      await request(app.getHttpServer() as Server)
        .post('/api/v1/notes')
        .send({ ...validPayload, unexpectedField: 'value' })
        .expect(400);

      expect(mockNotesService.createNote).not.toHaveBeenCalled();
    });
  });
});
