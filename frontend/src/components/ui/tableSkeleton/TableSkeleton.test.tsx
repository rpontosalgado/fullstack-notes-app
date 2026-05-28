import { describe, it, expect } from 'vitest';

import { TableSkeleton } from './TableSkeleton';
import { renderWithTheme } from '../../../test/renderWithTheme';

describe('TableSkeleton', () => {
  it('renders default 5 rows and 7 columns', () => {
    const { container } = renderWithTheme(<table><tbody><TableSkeleton /></tbody></table>);
    expect(container.querySelectorAll('tbody tr').length).toBe(5);
    expect(container.querySelectorAll('tbody tr:first-child td').length).toBe(7);
  });

  it('renders custom rows and columns', () => {
    const { container } = renderWithTheme(
      <table><tbody><TableSkeleton rows={3} columns={4} /></tbody></table>,
    );
    expect(container.querySelectorAll('tbody tr').length).toBe(3);
    expect(container.querySelectorAll('tbody tr:first-child td').length).toBe(4);
  });
});
