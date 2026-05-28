import { describe, it, expect } from 'vitest';
import { formatDate } from './date';

describe('formatDate', () => {
  it('formats an ISO timestamp to pt-BR locale', () => {
    const result = formatDate('2024-01-02T10:54:22.000Z');
    expect(result).toMatch(/02\/01\/2024/);
  });

  it('returns a string with dd/mm/yyyy HH:MM:SS format', () => {
    const date = new Date('2024-06-15T14:30:00Z');
    const result = formatDate(date.toISOString());
    expect(result).toMatch(/\d{2}\/\d{2}\/\d{4}, \d{2}:\d{2}:\d{2}/);
  });
});
