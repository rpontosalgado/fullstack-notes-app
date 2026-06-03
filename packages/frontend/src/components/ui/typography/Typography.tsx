import styled from 'styled-components';

type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'body'
  | 'caption'
  | 'error'
  | 'label';

const variantStyles: Record<
  TypographyVariant,
  (theme: {
    colors: Record<string, Record<string | number, string>>;
    font: { family: string };
  }) => string
> = {
  h1: (t) => `
    font-size: 24px;
    font-weight: 600;
    color: ${t.colors.gray[800]};
    line-height: 1.2;
  `,
  h2: (t) => `
    font-size: 18px;
    font-weight: 600;
    color: ${t.colors.gray[800]};
  `,
  h3: (t) => `
    font-size: 14px;
    font-weight: 600;
    color: ${t.colors.gray[500]};
    text-transform: uppercase;
    letter-spacing: 0.08em;
  `,
  body: () => `
    font-size: 14px;
    color: #444444;
    line-height: 1.6;
  `,
  caption: (t) => `
    font-size: 12px;
    color: ${t.colors.gray[400]};
  `,
  error: (t) => `
    font-size: 14px;
    color: ${t.colors.danger.main};
  `,
  label: (t) => `
    font-size: 12px;
    font-weight: 600;
    color: ${t.colors.gray[600]};
    text-transform: uppercase;
    letter-spacing: 0.05em;
  `,
};

export const Typography = styled.p<{
  $variant: TypographyVariant;
  $as?: React.ElementType;
  $align?: 'left' | 'center' | 'right';
}>`
  font-family: ${({ theme }) => theme.font.family};
  margin: 0;
  ${({ $variant, theme }) => variantStyles[$variant](theme as never)}
  ${({ $align }) => $align && `text-align: ${$align};`}
`;
