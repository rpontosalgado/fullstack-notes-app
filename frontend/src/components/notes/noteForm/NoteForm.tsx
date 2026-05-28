import { useState } from 'react';
import { Flex } from '../../ui/flex/Flex';
import { FormField } from '../../ui/formField/FormField';
import { ModalActions } from '../../ui/modalActions/ModalActions';

export interface NoteFormPayload {
  site: string;
  equipment: string;
  variable: string;
  timestamp: string;
  author: string;
  message: string;
}

interface NoteFormProps {
  initialValues: NoteFormPayload;
  onSubmit: (values: NoteFormPayload) => Promise<void>;
  onCancel: () => void;
  submitLabel: string;
  submittingLabel?: string;
  submitting: boolean;
}

export function NoteForm({
  initialValues,
  onSubmit,
  onCancel,
  submitLabel,
  submittingLabel = 'Salvando...',
  submitting,
}: NoteFormProps) {
  const [form, setForm] = useState<NoteFormPayload>(initialValues);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    void onSubmit({
      ...form,
      timestamp: new Date(form.timestamp).toISOString(),
    });
  }

  return (
    <Flex as="form" $direction="column" $align="stretch" $gap={16} onSubmit={handleSubmit}>
      <Flex $gap={12} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        <FormField
          label="Site"
          name="site"
          value={form.site}
          onChange={handleChange}
          placeholder="Nome do site"
          required
        />
        <FormField
          label="Equipamento"
          name="equipment"
          value={form.equipment}
          onChange={handleChange}
          placeholder="Nome do equipamento"
          required
        />
      </Flex>

      <Flex $gap={12} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        <FormField
          label="Variável"
          name="variable"
          value={form.variable}
          onChange={handleChange}
          placeholder="Ex: Tensão, Corrente"
          required
        />
        <FormField
          label="Data e Hora"
          name="timestamp"
          type="datetime-local"
          value={form.timestamp}
          onChange={handleChange}
          required
        />
      </Flex>

      <FormField
        label="Autor"
        name="author"
        value={form.author}
        onChange={handleChange}
        placeholder="Nome do autor"
        required
      />

      <FormField
        label="Mensagem"
        name="message"
        value={form.message}
        onChange={handleChange}
        placeholder="Conteúdo da nota..."
        required
        multiline
        rows={4}
      />

      <ModalActions
        onCancel={onCancel}
        submitLabel={submitLabel}
        submittingLabel={submittingLabel}
        submitting={submitting}
        submitType="submit"
      />
    </Flex>
  );
}
