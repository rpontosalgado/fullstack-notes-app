import { useState, useCallback } from 'react';

export function useModalAction(onClose: () => void): {
  submitting: boolean;
  error: string | null;
  execute: <T>(
    asyncFn: () => Promise<T>,
    fallbackMessage: string,
  ) => Promise<T | undefined>;
} {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(
    async <T>(
      asyncFn: () => Promise<T>,
      fallbackMessage: string,
    ): Promise<T | undefined> => {
      setSubmitting(true);
      setError(null);
      try {
        const result = await asyncFn();
        onClose();
        return result;
      } catch (err) {
        setError(err instanceof Error ? err.message : fallbackMessage);
        return undefined;
      } finally {
        setSubmitting(false);
      }
    },
    [onClose],
  );

  return { submitting, error, execute };
}
