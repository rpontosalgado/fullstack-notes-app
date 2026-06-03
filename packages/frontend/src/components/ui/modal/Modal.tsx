import { XIcon } from '../icons';
import { Flex } from '../flex/Flex';
import { Typography } from '../typography/Typography';
import { IconButton } from '../iconButton/styles/IconButton.styles';
import { ModalBody, ModalCard, Overlay } from './styles/Modal.styles';

interface ModalProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  showCloseButton?: boolean;
  error?: string | null;
}

export function Modal({
  title,
  onClose,
  children,
  showCloseButton = true,
  error,
}: ModalProps) {
  return (
    <Overlay onClick={onClose}>
      <ModalCard onClick={(e) => e.stopPropagation()}>
        <Flex
          $align="center"
          $justify="space-between"
          $padding="20px 24px 16px"
          style={{ borderBottom: '1px solid #E7E7E7' }}
        >
          <Typography $variant="h2">{title}</Typography>
          {showCloseButton && (
            <IconButton onClick={onClose} aria-label="Fechar">
              <XIcon />
            </IconButton>
          )}
        </Flex>
        <ModalBody>
          {children}
          {error && (
            <div
              style={{
                marginTop: 12,
                padding: '10px 12px',
                fontSize: 13,
                color: '#FC5050',
                background: '#fff5f5',
                borderRadius: 6,
                border: '1px solid #F97171',
              }}
            >
              {error}
            </div>
          )}
        </ModalBody>
      </ModalCard>
    </Overlay>
  );
}
