import { Modal } from '../../ui/modal/Modal';
import { useModalAction } from '../../../hooks/useModalAction';
import type { Note, UpdateNotePayload } from '../../../types/notes';
import { NoteForm } from '../noteForm/NoteForm';
import type { NoteFormPayload } from '../noteForm/NoteForm';

interface EditNoteModalProps {
  note: Note;
  onClose: () => void;
  onSubmit: (id: string, payload: UpdateNotePayload) => Promise<void>;
}

function noteToForm(note: Note): NoteFormPayload {
  return {
    site: note.site,
    equipment: note.equipment,
    variable: note.variable,
    timestamp: note.timestamp.slice(0, 16),
    author: note.author,
    message: note.message,
  };
}

export function EditNoteModal({ note, onClose, onSubmit }: EditNoteModalProps) {
  const { submitting, error, execute } = useModalAction(onClose);

  async function handleSubmit(values: NoteFormPayload) {
    await execute(
      () => onSubmit(note.id, values as UpdateNotePayload),
      'Erro ao atualizar nota',
    );
  }

  return (
    <Modal title="Editar Nota" onClose={onClose} error={error}>
      <NoteForm
        initialValues={noteToForm(note)}
        onSubmit={handleSubmit}
        onCancel={onClose}
        submitLabel="Salvar Alterações"
        submitting={submitting}
      />
    </Modal>
  );
}
