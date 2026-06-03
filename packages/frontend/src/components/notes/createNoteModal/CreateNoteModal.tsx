import { Modal } from '../../ui/modal/Modal';
import { useModalAction } from '../../../hooks/useModalAction';
import type { CreateNotePayload } from '../../../types/notes';
import { NoteForm } from '../noteForm/NoteForm';
import type { NoteFormPayload } from '../noteForm/NoteForm';
import { toLocalDateTimeString } from '../../../utils/date';

interface CreateNoteModalProps {
  onClose: () => void;
  onSubmit: (payload: CreateNotePayload) => Promise<void>;
}

const emptyForm: NoteFormPayload = {
  site: '',
  equipment: '',
  variable: '',
  timestamp: toLocalDateTimeString(new Date()),
  author: '',
  message: '',
};

export function CreateNoteModal({ onClose, onSubmit }: CreateNoteModalProps) {
  const { submitting, error, execute } = useModalAction(onClose);

  async function handleSubmit(values: NoteFormPayload) {
    await execute(
      () => onSubmit(values as CreateNotePayload),
      'Erro ao criar nota',
    );
  }

  return (
    <Modal title="Nova Nota" onClose={onClose} error={error}>
      <NoteForm
        initialValues={emptyForm}
        onSubmit={handleSubmit}
        onCancel={onClose}
        submitLabel="Salvar Nota"
        submitting={submitting}
      />
    </Modal>
  );
}
