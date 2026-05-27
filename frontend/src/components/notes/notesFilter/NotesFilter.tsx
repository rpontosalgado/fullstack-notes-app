import { useState } from 'react';
import { FilterIcon } from '../../ui/icons';
import { Flex } from '../../ui/flex/Flex';
import { Typography } from '../../ui/typography/Typography';
import { TextInput } from '../../ui/textInput/TextInput';
import { Button } from '../../ui/button/Button';
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
    <Flex $align="center" $gap={12} $wrap>
      <Flex $align="center" $gap={10} $flex={1} $wrap>
        <TextInput
          type="text"
          placeholder="Selecione um site"
          value={site}
          onChange={(e) => setSite(e.target.value)}
          style={{ minWidth: 160 }}
        />
        <TextInput
          type="text"
          placeholder="Selecione um equipamento"
          value={equipment}
          onChange={(e) => setEquipment(e.target.value)}
          style={{ minWidth: 160 }}
        />
        <Flex $align="center" $gap={8}>
          <TextInput
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            style={{ minWidth: 140 }}
          />
          <Typography $variant="caption">ate</Typography>
          <TextInput
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            style={{ minWidth: 140 }}
          />
        </Flex>
      </Flex>

      <Flex $align="center" $gap={8}>
        <Button $variant="secondary" type="button" onClick={handleClear}>
          Limpar
        </Button>
        <Button type="button" onClick={handleFilter}>
          <FilterIcon />
          Filtrar
        </Button>
      </Flex>
    </Flex>
  );
}
