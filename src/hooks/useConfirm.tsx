import { useState, useCallback } from 'react';

interface UseConfirmOptions {
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
  onConfirm?: () => void | Promise<void>;
}

export const useConfirm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<UseConfirmOptions | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const confirm = useCallback((confirmOptions: UseConfirmOptions): Promise<boolean> => {
    return new Promise((resolve) => {
      setOptions({
        ...confirmOptions,
        onConfirm: async () => {
          setIsLoading(true);
          try {
            if (confirmOptions.onConfirm) {
              await confirmOptions.onConfirm();
            }
            resolve(true);
          } catch (error) {
            console.error('Confirmation action failed:', error);
            resolve(false);
          } finally {
            setIsLoading(false);
            setIsOpen(false);
          }
        }
      });
      setIsOpen(true);
    });
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setOptions(null);
  }, []);

  return {
    confirm,
    isOpen,
    close,
    options,
    isLoading
  };
};