import { describe, it, expect } from 'vitest';
import { formatDate, formatLocalDate, toLocalDateTimeString } from './date';

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

describe('formatLocalDate', () => {
  it('returns YYYY-MM-DD using local time getters', () => {
    const date = new Date(2024, 5, 15, 14, 30, 0);
    expect(formatLocalDate(date)).toBe('2024-06-15');
  });

  it('returns the local calendar date when UTC and local differ', () => {
    const result = formatLocalDate(new Date('2024-01-02T02:00:00Z'));
    const localDate = new Date('2024-01-02T02:00:00Z');
    const expected = `${localDate.getFullYear()}-${String(localDate.getMonth() + 1).padStart(2, '0')}-${String(localDate.getDate()).padStart(2, '0')}`;
    expect(result).toBe(expected);
  });

  it('zero-pads month and day', () => {
    const date = new Date(2024, 0, 5, 0, 0, 0);
    expect(formatLocalDate(date)).toBe('2024-01-05');
  });
});

describe('toLocalDateTimeString', () => {
  it('returns YYYY-MM-DDTHH:mm using local time', () => {
    const date = new Date(2024, 5, 15, 14, 30, 0);
    expect(toLocalDateTimeString(date)).toBe('2024-06-15T14:30');
  });

  it('zero-pads all components', () => {
    const date = new Date(2024, 0, 5, 8, 5, 0);
    expect(toLocalDateTimeString(date)).toBe('2024-01-05T08:05');
  });

  it('round-trips through new Date().toISOString() back to the same instant', () => {
    const original = new Date('2024-06-15T14:30:00Z');
    const local = toLocalDateTimeString(original);
    const roundTripped = new Date(local).toISOString();
    expect(roundTripped).toBe(original.toISOString());
  });
});
