import styled from 'styled-components';

interface TextInputProps {
  $variant?: 'default' | 'filled';
  $fullWidth?: boolean;
  $error?: boolean;
}

const inputStyles = ({
  theme,
  $variant,
  $error,
}: TextInputProps & {
  theme: {
    colors: Record<string, Record<string | number, string>>;
    radius: { md: string };
    font: { family: string };
  };
}) => `
  padding: 9px 12px;
  border: 1px solid ${$error ? theme.colors.danger.light : theme.colors.gray[100]};
  border-radius: ${theme.radius.md};
  font-size: 13px;
  color: ${theme.colors.gray[800]};
  background: ${$variant === 'filled' ? theme.colors.bg : theme.colors.white};
  transition: border-color 0.15s;
  font-family: ${theme.font.family};
  height: 38px;
  box-sizing: border-box;

  &:focus {
    border-color: ${$error ? theme.colors.danger.main : theme.colors.primary[500]};
    background: ${theme.colors.white};
  }

  &::placeholder {
    color: ${theme.colors.gray[400]};
  }
`;

export const TextInput = styled.input<{
  $variant?: 'default' | 'filled';
  $fullWidth?: boolean;
  $error?: boolean;
}>`
  ${(props) => inputStyles(props as never)}
  ${({ $fullWidth }) => $fullWidth && 'width: 100%;'}
`;
