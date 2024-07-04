'use client';

import React, { useState } from 'react';
import { FaAngleDown } from 'react-icons/fa';
import styles from './Dropdown.module.css';

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  options: DropdownOption[];
  onSelect: (value: string) => unknown;
  defaultValue?: string;
  placeholder?: string;
  width?: string;
}

function Dropdown({ options, onSelect, defaultValue, placeholder, width }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(defaultValue || null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (value: string) => {
    setSelectedOption(value);
    setIsOpen(false);
    onSelect(value);
  };

  return (
    <div className={styles.dropdown} style={{ width }}>
      <button type="button" onClick={toggleDropdown}>
        <div>{options.find((option) => option.value === selectedOption)?.label || placeholder || '선택해주세요'}</div>
        <div className={styles.arrow}>
          <FaAngleDown />
        </div>
      </button>

      {isOpen && (
        <ul className={styles.dropdownList}>
          {options.map((option) => (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
            <li className={styles.dropdownListItem} key={option.value} onClick={() => handleOptionClick(option.value)}>
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
