import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { exportToCSV } from './csvExport';
import { formatLocalDate } from './date';
import type { Note } from '../types/notes';

const sampleNotes: Note[] = [
  {
    id: '1',
    site: 'Site A',
    equipment: 'Bomba',
    variable: 'Corrente',
    timestamp: '2024-01-02T10:54:22.000Z',
    author: 'Daniel',
    message: 'Test message',
  },
  {
    id: '2',
    site: 'Site B',
    equipment: 'Motor',
    variable: 'Tensao',
    timestamp: '2024-01-03T14:00:00.000Z',
    author: 'Alice',
    message: 'he said "hi"',
  },
];

describe('exportToCSV', () => {
  let capturedBlob: Blob | null;
  let anchor: HTMLAnchorElement;
  let clickSpy: ReturnType<typeof vi.fn<() => void>>;
  let createObjectURLSpy: ReturnType<typeof vi.spyOn>;
  let revokeObjectURLSpy: ReturnType<typeof vi.spyOn>;
  let createElementSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    capturedBlob = null;
    anchor = document.createElement('a');
    clickSpy = vi.fn<() => void>();
    anchor.click = clickSpy;

    createObjectURLSpy = vi
      .spyOn(URL, 'createObjectURL')
      .mockImplementation(((blob: Blob) => {
        capturedBlob = blob;
        return 'blob:mock-url';
      }) as typeof URL.createObjectURL);

    revokeObjectURLSpy = vi
      .spyOn(URL, 'revokeObjectURL')
      .mockImplementation(() => undefined);

    const originalCreateElement = document.createElement.bind(document);
    createElementSpy = vi
      .spyOn(document, 'createElement')
      .mockImplementation(((tag: string) => {
        if (tag.toLowerCase() === 'a') return anchor;
        return originalCreateElement(tag);
      }) as typeof document.createElement);
  });

  afterEach(() => {
    createObjectURLSpy.mockRestore();
    revokeObjectURLSpy.mockRestore();
    createElementSpy.mockRestore();
  });

  async function getCsvText(): Promise<string> {
    if (!capturedBlob) throw new Error('No blob captured');
    const buffer = await capturedBlob.arrayBuffer();
    return new TextDecoder('utf-8', { ignoreBOM: false }).decode(buffer);
  }

  it('emits the header row in order with values joined by commas (no per-value quoting)', async () => {
    exportToCSV(sampleNotes);
    const text = await getCsvText();
    const firstLine = text.replace(/^\uFEFF/, '').split('\n')[0];
    expect(firstLine).toBe('ID,Site,Equipamento,Variavel,Data,Autor,Mensagem');
  });

  it('prepends a UTF-8 BOM as the first three bytes of the blob', async () => {
    exportToCSV(sampleNotes);
    if (!capturedBlob) throw new Error('No blob captured');
    const buffer = new Uint8Array(await capturedBlob.arrayBuffer());
    expect(buffer[0]).toBe(0xef);
    expect(buffer[1]).toBe(0xbb);
    expect(buffer[2]).toBe(0xbf);
  });

  it('wraps plain message values in double quotes', async () => {
    exportToCSV(sampleNotes);
    const text = await getCsvText();
    expect(text).toContain('"Test message"');
  });

  it('escapes double quotes inside message values by doubling them (RFC 4180)', async () => {
    exportToCSV(sampleNotes);
    const text = await getCsvText();
    expect(text).toContain('"he said ""hi"""');
  });

  it('creates a blob with the CSV mime type', () => {
    exportToCSV(sampleNotes);
    expect(capturedBlob).not.toBeNull();
    expect(capturedBlob?.type).toBe('text/csv;charset=utf-8;');
  });

  it('uses a notas_YYYY-MM-DD.csv filename in local time', () => {
    exportToCSV(sampleNotes);
    const expected = `notas_${formatLocalDate(new Date())}.csv`;
    expect(anchor.download).toBe(expected);
  });

  it('clicks the anchor and revokes the object URL', () => {
    exportToCSV(sampleNotes);
    expect(clickSpy).toHaveBeenCalledTimes(1);
    expect(revokeObjectURLSpy).toHaveBeenCalledWith('blob:mock-url');
  });
});
