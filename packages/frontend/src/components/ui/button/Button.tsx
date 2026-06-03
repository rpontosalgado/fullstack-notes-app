import styled from 'styled-components';

type ButtonVariant = 'primary' | 'secondary' | 'danger';
type ButtonSize = 'sm' | 'md';

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'height: 38px; padding: 0 14px;',
  md: 'height: 40px; padding: 0 18px;',
};

const variantStyles: Record<
  ButtonVariant,
  (theme: { colors: Record<string, Record<string | number, string>> }) => string
> = {
  primary: (t) => `
    background-color: ${t.colors.primary[500]};
    color: ${t.colors.white};
    &:hover {
      background-color: ${t.colors.primary[600]};
    }
  `,
  secondary: (t) => `
    background: transparent;
    border: 1px solid ${t.colors.gray[100]};
    color: ${t.colors.gray[500]};
    &:hover {
      border-color: ${t.colors.gray[400]};
      color: ${t.colors.gray[800]};
    }
  `,
  danger: (t) => `
    background-color: ${t.colors.danger.main};
    color: ${t.colors.white};
    &:hover:not(:disabled) {
      background-color: ${t.colors.danger.dark};
    }
  `,
};

export const Button = styled.button<{
  $variant?: ButtonVariant;
  $size?: ButtonSize;
  $fullWidth?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: 13px;
  font-weight: 600;
  font-family: ${({ theme }) => theme.font.family};
  transition: background-color 0.15s, border-color 0.15s, color 0.15s;
  border: none;
  cursor: pointer;

  ${({ $size }) => sizeStyles[$size ?? 'sm']}
  ${({ $variant, theme }) => variantStyles[$variant ?? 'primary'](theme as never)}
  ${({ $fullWidth }) => $fullWidth && 'width: 100%;'}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
