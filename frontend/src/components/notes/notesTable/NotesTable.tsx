import type { Note } from '../../../types/notes';
import {
  EmptyCell,
  ErrorMessage,
  MessageTd,
  Skeleton,
  Table,
  TableWrapper,
  Td,
  Th,
  Tr,
} from './styles/NotesTable.styles';

interface NotesTableProps {
  notes: Note[];
  loading: boolean;
  error: string | null;
}

function formatDate(timestamp: string): string {
  const date = new Date(timestamp);
  return date.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

export function NotesTable({ notes, loading, error }: NotesTableProps) {
  if (error) {
    return <ErrorMessage>Erro ao carregar notas: {error}</ErrorMessage>;
  }

  return (
    <TableWrapper>
      <Table>
        <thead>
          <tr>
            <Th>Site</Th>
            <Th>Equipamento</Th>
            <Th>Monitoração</Th>
            <Th>Data</Th>
            <Th>Autor</Th>
            <Th>Mensagem</Th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <Tr key={i}>
                {Array.from({ length: 6 }).map((__, j) => (
                  <Td key={j}>
                    <Skeleton />
                  </Td>
                ))}
              </Tr>
            ))
          ) : notes.length === 0 ? (
            <tr>
              <EmptyCell colSpan={6}>Nenhuma nota encontrada.</EmptyCell>
            </tr>
          ) : (
            notes.map((note) => (
              <Tr key={note.id}>
                <Td>{note.site}</Td>
                <Td>{note.equipment}</Td>
                <Td>{note.variable}</Td>
                <Td>{formatDate(note.timestamp)}</Td>
                <Td>{note.author}</Td>
                <MessageTd>{note.message}</MessageTd>
              </Tr>
            ))
          )}
        </tbody>
      </Table>
    </TableWrapper>
  );
}
