import { useCallback } from 'react';

export function useVisualEditorContext() {

  const uploadHandler = useCallback(async (file: File) => {
    return '';
  }, []);

  return {
    uploadHandler
  };
}