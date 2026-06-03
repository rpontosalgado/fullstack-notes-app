import styled from 'styled-components';
import { fadeIn, slideUp } from '../../../../styles/animations';

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

export const ModalCard = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radius.xl};
  width: 100%;
  max-width: 560px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  animation: ${slideUp} 0.2s ease;
`;

export const ModalBody = styled.div`
  padding: 20px 24px;
`;
