import type { Note } from '../../../types/notes';
import { formatDate } from '../../../utils/date';
import { DeleteIcon, EditIcon } from '../../ui/icons';
import { IconButton } from '../../ui/iconButton/styles/IconButton.styles';
import { TableSkeleton } from '../../ui/tableSkeleton/TableSkeleton';
import {
  ActionsTd,
  EmptyCell,
  MessageTd,
  Table,
  TableWrapper,
  Td,
  Th,
  Tr,
} from './styles/NotesTable.styles';
import { Typography } from '../../ui/typography/Typography';

interface NotesTableProps {
  notes: Note[];
  loading: boolean;
  error: string | null;
  onEdit: (note: Note) => void;
  onDelete: (note: Note) => void;
}

export function NotesTable({
  notes,
  loading,
  error,
  onEdit,
  onDelete,
}: NotesTableProps) {
  if (error) {
    return <Typography $variant="error" $align="center" style={{ padding: 32 }}>Erro ao carregar notas: {error}</Typography>;
  }

  return (
    <TableWrapper>
      <Table>
        <thead>
          <tr>
            <Th>Site</Th>
            <Th>Equipamento</Th>
            <Th>Monitoracao</Th>
            <Th>Data</Th>
            <Th>Autor</Th>
            <Th>Mensagem</Th>
            <Th>Acoes</Th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <TableSkeleton rows={5} columns={7} />
          ) : notes.length === 0 ? (
            <tr>
              <EmptyCell colSpan={7}>Nenhuma nota encontrada.</EmptyCell>
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
                <ActionsTd>
                  <IconButton title="Editar" onClick={() => onEdit(note)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    $danger
                    title="Excluir"
                    onClick={() => onDelete(note)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ActionsTd>
              </Tr>
            ))
          )}
        </tbody>
      </Table>
    </TableWrapper>
  );
}
