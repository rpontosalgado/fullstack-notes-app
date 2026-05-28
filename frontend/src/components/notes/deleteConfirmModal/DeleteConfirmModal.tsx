import { Modal } from '../../ui/modal/Modal';
import { useModalAction } from '../../../hooks/useModalAction';
import { Typography } from '../../ui/typography/Typography';
import { ModalActions } from '../../ui/modalActions/ModalActions';

interface DeleteConfirmModalProps {
  noteId: string;
  onClose: () => void;
  onConfirm: (id: string) => Promise<void>;
}

export function DeleteConfirmModal({
  noteId,
  onClose,
  onConfirm,
}: DeleteConfirmModalProps) {
  const { submitting, error, execute } = useModalAction(onClose);

  async function handleDelete() {
    await execute(() => onConfirm(noteId), 'Erro ao excluir nota');
  }

  return (
    <Modal
      title="Excluir Nota"
      onClose={onClose}
      showCloseButton={false}
      error={error}
    >
      <Typography $variant="body">
        Tem certeza que deseja excluir esta nota? Esta ação nao pode ser
        desfeita.
      </Typography>

      <ModalActions
        onCancel={onClose}
        onSubmit={handleDelete}
        submitLabel="Excluir"
        submittingLabel="Excluindo..."
        submitting={submitting}
        submitType="button"
        variant="danger"
      />
    </Modal>
  );
}
