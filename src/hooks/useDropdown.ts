import { useEffect, useRef, useState } from 'react';

interface UseDropdown {
  isOpen: boolean;
  toggleDropdown: () => void;
  fn: {
    closeDropdown: () => void;
    openDropdown: () => void;
  };
  dropdownRef: React.RefObject<HTMLDivElement>;
}

export function useDropdown(): UseDropdown {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState);
  };

  const openDropdown = () => setIsOpen(true);

  const closeDropdown = () => setIsOpen(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownRef]);

  return { isOpen, toggleDropdown, fn: { openDropdown, closeDropdown }, dropdownRef };
}
