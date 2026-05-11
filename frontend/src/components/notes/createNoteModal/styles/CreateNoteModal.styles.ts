import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from { transform: translateY(16px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
  padding: 24px;
  animation: ${fadeIn} 0.15s ease;
`;

export const Modal = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radius.xl};
  width: 100%;
  max-width: 560px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  animation: ${slideUp} 0.2s ease;
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[100]};
`;

export const ModalTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray[800]};
`;

export const CloseButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.gray[100]};
  color: ${({ theme }) => theme.colors.gray[500]};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s;

  &:hover {
    background: ${({ theme }) => theme.colors.gray[100]};
    color: ${({ theme }) => theme.colors.gray[800]};
  }
`;

export const Form = styled.form`
  padding: 20px 24px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Label = styled.label`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray[600]};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const inputStyles = ({
  theme,
}: {
  theme: {
    colors: {
      gray: Record<string | number, string>;
      primary: Record<string | number, string>;
      bg: string;
    };
    radius: { md: string };
    font: { family: string };
  };
}) => `
  padding: 9px 12px;
  border: 1px solid ${theme.colors.gray[100]};
  border-radius: ${theme.radius.md};
  font-size: 13px;
  color: ${theme.colors.gray[800]};
  background: ${theme.colors.bg};
  transition: border-color 0.15s;
  font-family: ${theme.font.family};

  &:focus {
    border-color: ${theme.colors.primary[500]};
    background: white;
  }

  &::placeholder {
    color: ${theme.colors.gray[400]};
  }
`;

export const Input = styled.input`
  ${({ theme }) => inputStyles({ theme })}
`;

export const Textarea = styled.textarea`
  ${({ theme }) => inputStyles({ theme })}
  resize: vertical;
  line-height: 1.6;
`;

export const ErrorText = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.danger.main};
  background: #fff5f5;
  padding: 10px 12px;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.danger.light};
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding-top: 4px;
`;

export const CancelButton = styled.button`
  height: 38px;
  padding: 0 16px;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.gray[100]};
  background: transparent;
  color: ${({ theme }) => theme.colors.gray[500]};
  font-size: 13px;
  font-weight: 500;
  font-family: ${({ theme }) => theme.font.family};
  transition: all 0.15s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.gray[400]};
    color: ${({ theme }) => theme.colors.gray[800]};
  }
`;

export const SubmitButton = styled.button`
  height: 38px;
  padding: 0 20px;
  border-radius: ${({ theme }) => theme.radius.md};
  background-color: ${({ theme }) => theme.colors.primary[500]};
  color: ${({ theme }) => theme.colors.white};
  font-size: 13px;
  font-weight: 600;
  font-family: ${({ theme }) => theme.font.family};
  transition: background-color 0.15s;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.primary[600]};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
