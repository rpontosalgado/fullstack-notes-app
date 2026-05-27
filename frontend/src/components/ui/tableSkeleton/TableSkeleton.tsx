import { Skeleton } from '../skeleton/Skeleton';

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
}

export function TableSkeleton({ rows = 5, columns = 7 }: TableSkeletonProps) {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <tr key={i}>
          {Array.from({ length: columns }).map((__, j) => (
            <td key={j} style={{ padding: '14px 16px' }}>
              <Skeleton />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}
