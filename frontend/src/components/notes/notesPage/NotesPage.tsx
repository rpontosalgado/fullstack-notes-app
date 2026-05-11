import { useState } from 'react';
import { useNotes } from '../../../hooks/useNotes';
import { PlusIcon } from '../../ui/icons';
import { Pagination } from '../../ui/pagination/Pagination';
import { CreateNoteModal } from '../createNoteModal/CreateNoteModal';
import { NotesFilter } from '../notesFilter/NotesFilter';
import { NotesTable } from '../notesTable/NotesTable';
import {
  FilterSection,
  NewButton,
  Page,
  PageHeader,
  PageTitle,
  PaginationInfo,
  PaginationSection,
} from './styles/NotesPage.styles';

export function NotesPage() {
  const { data, loading, error, applyFilters, goToPage, addNote } = useNotes();
  const [showModal, setShowModal] = useState(false);

  return (
    <Page>
      <PageHeader>
        <PageTitle>Notas</PageTitle>
        <NewButton onClick={() => setShowModal(true)}>
          <PlusIcon />
          Nova Nota
        </NewButton>
      </PageHeader>

      <FilterSection>
        <NotesFilter onFilter={applyFilters} />
      </FilterSection>

      <NotesTable notes={data?.data ?? []} loading={loading} error={error} />

      {data && data.totalPages > 1 && (
        <PaginationSection>
          <PaginationInfo>
            {data.total} nota{data.total !== 1 ? 's' : ''} encontrada
            {data.total !== 1 ? 's' : ''}
          </PaginationInfo>
          <Pagination
            currentPage={data.page}
            totalPages={data.totalPages}
            onPageChange={goToPage}
          />
        </PaginationSection>
      )}

      {showModal && (
        <CreateNoteModal
          onClose={() => setShowModal(false)}
          onSubmit={addNote}
        />
      )}
    </Page>
  );
}
