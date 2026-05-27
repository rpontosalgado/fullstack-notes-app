import type { ChangeEvent } from 'react';
import { Flex } from '../flex/Flex';
import { Typography } from '../typography/Typography';
import { TextInput } from '../textInput/TextInput';
import { Textarea } from '../textarea/Textarea';

interface FormFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: 'text' | 'date' | 'datetime-local';
  placeholder?: string;
  required?: boolean;
  multiline?: boolean;
  rows?: number;
}

export function FormField({
  label,
  name,
  value,
  onChange,
  type = 'text',
  placeholder,
  required,
  multiline,
  rows = 4,
}: FormFieldProps) {
  return (
    <Flex $direction="column" $gap={6}>
      <Typography $variant="label" $as="label">
        {label}
      </Typography>
      {multiline ? (
        <Textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          rows={rows}
        />
      ) : (
        <TextInput
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          $variant="filled"
        />
      )}
    </Flex>
  );
}
