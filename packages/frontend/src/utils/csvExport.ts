import type { Note } from '../types/notes';
import { formatLocalDate } from './date';

export function exportToCSV(notes: Note[]) {
  const headers = [
    'ID',
    'Site',
    'Equipamento',
    'Variavel',
    'Data',
    'Autor',
    'Mensagem',
  ];
  const rows = notes.map((note) =>
    [
      note.id,
      note.site,
      note.equipment,
      note.variable,
      note.timestamp,
      note.author,
      note.message.replace(/"/g, '""'),
    ]
      .map((val) => `"${val}"`)
      .join(','),
  );

  const BOM = '\uFEFF';
  const csv = BOM + [headers.join(','), ...rows].join('\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `notas_${formatLocalDate(new Date())}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}
