import { useState } from 'react';
import type { CreateNotePayload } from '../../../types/notes';
import {
  CancelButton,
  CloseButton,
  ErrorText,
  Field,
  Form,
  Input,
  Label,
  Modal,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Overlay,
  Row,
  SubmitButton,
  Textarea,
} from './styles/CreateNoteModal.styles';
import { XIcon } from '../../ui/icons';

interface CreateNoteModalProps {
  onClose: () => void;
  onSubmit: (payload: CreateNotePayload) => Promise<void>;
}

const emptyForm: CreateNotePayload = {
  site: '',
  equipment: '',
  variable: '',
  timestamp: new Date().toISOString().slice(0, 16),
  author: '',
  message: '',
};

export function CreateNoteModal({ onClose, onSubmit }: CreateNoteModalProps) {
  const [form, setForm] = useState<CreateNotePayload>(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const payload: CreateNotePayload = {
        ...form,
        timestamp: new Date(form.timestamp).toISOString(),
      };
      await onSubmit(payload);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar nota');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Nova Nota</ModalTitle>
          <CloseButton onClick={onClose}>
            <XIcon />
          </CloseButton>
        </ModalHeader>

        <Form
          onSubmit={(e) => {
            void handleSubmit(e);
          }}
        >
          <Row>
            <Field>
              <Label>Site</Label>
              <Input
                name="site"
                value={form.site}
                onChange={handleChange}
                placeholder="Nome do site"
                required
              />
            </Field>
            <Field>
              <Label>Equipamento</Label>
              <Input
                name="equipment"
                value={form.equipment}
                onChange={handleChange}
                placeholder="Nome do equipamento"
                required
              />
            </Field>
          </Row>

          <Row>
            <Field>
              <Label>Variável</Label>
              <Input
                name="variable"
                value={form.variable}
                onChange={handleChange}
                placeholder="Ex: Tensão, Corrente"
                required
              />
            </Field>
            <Field>
              <Label>Data e Hora</Label>
              <Input
                name="timestamp"
                type="datetime-local"
                value={form.timestamp}
                onChange={handleChange}
                required
              />
            </Field>
          </Row>

          <Field>
            <Label>Autor</Label>
            <Input
              name="author"
              value={form.author}
              onChange={handleChange}
              placeholder="Nome do autor"
              required
            />
          </Field>

          <Field>
            <Label>Mensagem</Label>
            <Textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Conteúdo da nota..."
              rows={4}
              required
            />
          </Field>

          {error && <ErrorText>{error}</ErrorText>}

          <ModalFooter>
            <CancelButton type="button" onClick={onClose}>
              Cancelar
            </CancelButton>
            <SubmitButton type="submit" disabled={submitting}>
              {submitting ? 'Salvando...' : 'Salvar Nota'}
            </SubmitButton>
          </ModalFooter>
        </Form>
      </Modal>
    </Overlay>
  );
}
