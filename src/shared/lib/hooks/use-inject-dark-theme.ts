import { useEffect } from 'react';

export const useInjectDarkTheme = () => {
  useEffect(() => {
    document.documentElement.classList.add('dark');
    return () => document.documentElement.classList.remove('dark');
  }, []);
};
