import { TextInput } from '../textInput/TextInput';
import styled from 'styled-components';

export const Textarea = styled(TextInput).attrs({ as: 'textarea' })`
  resize: vertical;
  line-height: 1.6;
  height: auto;
  min-height: 100px;
`;
