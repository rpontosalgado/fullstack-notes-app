import 'reflect-metadata';
import * as fs from 'fs';
import * as path from 'path';
import { Note } from '../notes/note.entity';
import { AppDataSource } from './data-source';

interface NoteRecord {
  id: string;
  site: string;
  equipment: string;
  variable: string;
  timestamp: string;
  author: string;
  message: string;
}

function parseCsv(filePath: string): NoteRecord[] {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n').filter((line) => line.trim() !== '');
  const headers = lines[0].split(',').map((h) => h.trim());

  return lines.slice(1).map((line) => {
    const fields: string[] = [];
    let current = '';
    let insideQuotes = false;

    for (const char of line) {
      if (char === '"') {
        insideQuotes = !insideQuotes;
      } else if (char === ',' && !insideQuotes) {
        fields.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    fields.push(current.trim());

    return headers.reduce<NoteRecord>((record, header, index) => {
      return { ...record, [header]: fields[index] ?? '' };
    }, {} as NoteRecord);
  });
}

async function seed(): Promise<void> {
  console.log('Connecting to database...');
  await AppDataSource.initialize();

  const noteRepository = AppDataSource.getRepository(Note);

  const count = await noteRepository.count();
  if (count > 0) {
    console.log(`Database already has ${count} notes. Skipping seed.`);
    await AppDataSource.destroy();
    return;
  }

  const csvPath = path.resolve(__dirname, '../../materials/notes.csv');
  console.log(`Reading CSV from: ${csvPath}`);

  const records = parseCsv(csvPath);
  console.log(`Found ${records.length} records to seed...`);

  const notes: Note[] = records.map((record) => {
    const note = new Note();
    note.id = record.id;
    note.site = record.site;
    note.equipment = record.equipment;
    note.variable = record.variable;
    note.timestamp = new Date(record.timestamp);
    note.author = record.author;
    note.message = record.message;
    return note;
  });

  await noteRepository.save(notes);
  console.log(`Successfully seeded ${notes.length} notes!`);

  await AppDataSource.destroy();
}

seed().catch((err: Error) => {
  console.error('Seed failed:', err.message);
  process.exit(1);
});
