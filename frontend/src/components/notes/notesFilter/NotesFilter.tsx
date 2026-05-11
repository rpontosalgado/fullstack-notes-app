import { useState } from 'react';
import { FilterIcon } from '../../ui/icons';
import {
  Actions,
  ClearButton,
  DateRange,
  DateSeparator,
  FilterBar,
  FilterButton,
  Filters,
  Input,
} from './styles/NotesFiltes.styles';
import type { NotesFilters } from '../../../types/notes';

interface NotesFilterProps {
  onFilter: (filters: Omit<NotesFilters, 'page' | 'limit'>) => void;
}

export function NotesFilter({ onFilter }: NotesFilterProps) {
  const [site, setSite] = useState('');
  const [equipment, setEquipment] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  function handleFilter() {
    onFilter({
      site: site || undefined,
      equipment: equipment || undefined,
      startDate: startDate || undefined,
      endDate: endDate || undefined,
    });
  }

  function handleClear() {
    setSite('');
    setEquipment('');
    setStartDate('');
    setEndDate('');
    onFilter({});
  }

  return (
    <FilterBar>
      <Filters>
        <Input
          type="text"
          placeholder="Selecione um site"
          value={site}
          onChange={(e) => setSite(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Selecione um equipamento"
          value={equipment}
          onChange={(e) => setEquipment(e.target.value)}
        />
        <DateRange>
          <Input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <DateSeparator>até</DateSeparator>
          <Input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </DateRange>
      </Filters>

      <Actions>
        <ClearButton onClick={handleClear}>Limpar</ClearButton>
        <FilterButton onClick={handleFilter}>
          <FilterIcon />
          Filtrar
        </FilterButton>
      </Actions>
    </FilterBar>
  );
}
