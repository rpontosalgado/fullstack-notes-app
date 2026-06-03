import { ChevronLeftIcon, ChevronRightIcon } from '../icons';
import { Flex } from '../flex/Flex';
import { Typography } from '../typography/Typography';
import {
  Ellipsis,
  NavButton,
  PageButton,
} from './styles/Pagination.styles';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages: (number | '...')[] = [];

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage > 3) pages.push('...');
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push('...');
    pages.push(totalPages);
  }

  return (
    <Flex $align="center" $justify="center" $gap={4}>
      <NavButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeftIcon />
      </NavButton>

      {pages.map((page, i) =>
        page === '...' ? (
          <Ellipsis key={`ellipsis-${i}`}>
            <Typography $variant="caption">...</Typography>
          </Ellipsis>
        ) : (
          <PageButton
            key={page}
            $active={page === currentPage}
            onClick={() => onPageChange(page)}
          >
            {page}
          </PageButton>
        ),
      )}

      <NavButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRightIcon />
      </NavButton>
    </Flex>
  );
}
