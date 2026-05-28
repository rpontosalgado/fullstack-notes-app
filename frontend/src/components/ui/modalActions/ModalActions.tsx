import { Button } from '../button/Button';
import { Flex } from '../flex/Flex';

interface ModalActionsProps {
  onCancel: () => void;
  onSubmit?: () => void;
  submitLabel: string;
  submittingLabel?: string;
  submitting: boolean;
  submitType?: 'button' | 'submit';
  variant?: 'primary' | 'danger';
}

export function ModalActions({
  onCancel,
  onSubmit,
  submitLabel,
  submittingLabel = 'Salvando...',
  submitting,
  submitType = 'submit',
  variant = 'primary',
}: ModalActionsProps) {
  return (
    <Flex $justify="end" $gap={10} $padding="20px 0 0 0" style={{ width: '100%' }}>
      <Button type="button" $variant="secondary" onClick={onCancel}>
        Cancelar
      </Button>
      <Button
        type={submitType}
        $variant={variant}
        disabled={submitting}
        onClick={submitType === 'button' ? onSubmit : undefined}
      >
        {submitting ? submittingLabel : submitLabel}
      </Button>
    </Flex>
  );
}
