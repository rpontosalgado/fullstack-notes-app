import { useState } from 'react';
import { useNotes } from '../../../hooks/useNotes';
import type { Note } from '../../../types/notes';
import { DownloadIcon, PlusIcon } from '../../ui/icons';
import { Pagination } from '../../ui/pagination/Pagination';
import { CreateNoteModal } from '../createNoteModal/CreateNoteModal';
import { DeleteConfirmModal } from '../deleteConfirmModal/DeleteConfirmModal';
import { EditNoteModal } from '../editNoteModal/EditNoteModal';
import { NotesFilter } from '../notesFilter/NotesFilter';
import { NotesTable } from '../notesTable/NotesTable';
import { Flex } from '../../ui/flex/Flex';
import { Card } from '../../ui/card/Card';
import { Typography } from '../../ui/typography/Typography';
import { Button } from '../../ui/button/Button';

function exportToCSV(notes: Note[]) {
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
  link.download = `notas_${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

export function NotesPage() {
  const {
    data,
    loading,
    error,
    applyFilters,
    goToPage,
    addNote,
    editNote,
    removeNote,
  } = useNotes();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [deletingNote, setDeletingNote] = useState<Note | null>(null);

  return (
    <Flex $direction="column" $gap={20} $fullHeight>
      <Flex $align="center" $justify="space-between">
        <Typography $variant="h1">Notas</Typography>
        <Flex $gap={10}>
          {data && data.data.length > 0 && (
            <Button $variant="secondary" $size="md" onClick={() => exportToCSV(data.data)}>
              <DownloadIcon />
              Exportar CSV
            </Button>
          )}
          <Button $size="md" onClick={() => setShowCreateModal(true)}>
            <PlusIcon />
            Nova Nota
          </Button>
        </Flex>
      </Flex>

      <Card $padding={16}>
        <NotesFilter onFilter={applyFilters} />
      </Card>

      <NotesTable
        notes={data?.data ?? []}
        loading={loading}
        error={error}
        onEdit={setEditingNote}
        onDelete={setDeletingNote}
      />

      {data && data.totalPages > 1 && (
        <Flex $align="center" $justify="space-between" $padding="4px 0">
          <Typography $variant="caption">
            {data.total} nota{data.total !== 1 ? 's' : ''} encontrada
            {data.total !== 1 ? 's' : ''}
          </Typography>
          <Pagination
            currentPage={data.page}
            totalPages={data.totalPages}
            onPageChange={goToPage}
          />
        </Flex>
      )}

      {showCreateModal && (
        <CreateNoteModal
          onClose={() => setShowCreateModal(false)}
          onSubmit={addNote}
        />
      )}

      {editingNote && (
        <EditNoteModal
          note={editingNote}
          onClose={() => setEditingNote(null)}
          onSubmit={editNote}
        />
      )}

      {deletingNote && (
        <DeleteConfirmModal
          noteId={deletingNote.id}
          onClose={() => setDeletingNote(null)}
          onConfirm={removeNote}
        />
      )}
    </Flex>
  );
}
