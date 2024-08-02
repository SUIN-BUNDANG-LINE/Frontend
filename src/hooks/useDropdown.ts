import { useEffect, useRef, useState } from 'react';

interface UseDropdown {
  isOpen: boolean;
  toggleDropdown: () => void;
  dropdownRef: React.RefObject<HTMLDivElement>;
}

interface Options {
  closeOnInnerClick?: boolean;
}

const defaultOptions = {
  closeOnInnerClick: false,
};

export function useDropdown(options?: Options): UseDropdown {
  const { closeOnInnerClick } = { ...defaultOptions, ...options };

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (closeOnInnerClick || (dropdownRef.current && !dropdownRef.current.contains(event.target as Node))) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeOnInnerClick, dropdownRef]);

  return { isOpen, toggleDropdown, dropdownRef };
}
