/* eslint-disable no-param-reassign, jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */

import { Draggable } from '@hello-pangea/dnd';
import { v4 as uuidv4 } from 'uuid';
import React from 'react';
import type { Field, RadioField } from '../types';
import { useSurveyStore } from '../store';
import styles from './Field.module.css'; // Import styles
import Svg from '../misc/Svg';

type Props = {
  index: number;
  field: Field;
  activeState: [string | null, React.Dispatch<React.SetStateAction<string | null>>];
};

type TitleProps = {
  required: boolean;
  title: string;
  handleEdit: (updates: Partial<Field>) => void;
  active: boolean;
};

function RenderTitle({ required, title, handleEdit, active }: TitleProps) {
  return (
    <div className={styles.title}>
      {required && <span className={styles.requiredTag}>필수</span>}
      <input
        type="text"
        value={active || title !== '' ? title : '제목 없는 질문'}
        onChange={(e) => handleEdit({ title: e.target.value })}
        placeholder="질문을 입력해주세요."
        maxLength={100}
      />
    </div>
  );
}

type DescriptionProps = {
  description: string;
  handleEdit: (updates: Partial<Field>) => void;
  active: boolean;
};

function RenderDescription({ description, handleEdit, active }: DescriptionProps) {
  return (
    <div className={styles.description}>
      <textarea
        value={active || description !== '' ? description : '질문 설명이 없습니다.'}
        onChange={(e) => handleEdit({ description: e.target.value })}
        placeholder="설명을 입력해주세요."
        maxLength={1000}
      />
    </div>
  );
}

function RenderTextResponse() {
  return (
    <div className={`${styles.response} ${styles.textResponse}`}>
      <div className={styles.input}>텍스트 입력...</div>
    </div>
  );
}

type RadioResponseProps = {
  type: 'radio' | 'checkbox';
  options: RadioField['options'];
  handleEdit: (updates: Partial<Field>) => void;
  active: boolean;
  other: boolean;
};

function RenderSelectableResponse({ type, options, handleEdit, active, other }: RadioResponseProps) {
  function handleContentEdit(id: string, value: string) {
    const replica = structuredClone(options);
    const index = replica.findIndex((o) => o.id === id);
    replica.splice(index, 1, { id, content: value });
    handleEdit({ options: replica });
  }

  function handleDelete(id: string) {
    const newOptions = options.filter((o) => o.id !== id);
    if (newOptions.length === 0) newOptions.push({ id: uuidv4(), content: '' });
    handleEdit({ options: newOptions });
  }

  const indicatorClass = type === 'radio' ? styles.radioIndicator : styles.checkboxIndicator;

  return (
    <div className={`${styles.response} ${styles.selectableResponse}`}>
      {options.map(({ id, content }) => (
        <div className={styles.selectableResponseItem} key={id}>
          <div className={indicatorClass} />
          <input
            key={id}
            type="text"
            value={active || content !== '' ? content : '빈 선택지'}
            onChange={(e) => handleContentEdit(id, e.target.value)}
            placeholder="선택지를 입력해주세요."
            maxLength={100}
          />
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button type="button" onClick={() => handleDelete(id)} className={styles.deleteSelectableResponseItem}>
            <Svg path="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </button>
        </div>
      ))}
      {options.length < 20 && (
        <button
          type="button"
          onClick={() => {
            const newOptions = [...options, { id: uuidv4(), content: '' }];
            handleEdit({ options: newOptions });
          }}
          className={styles.addOption}>
          + 선택지 추가
        </button>
      )}
      {options.length >= 20 && (
        <div style={{ fontSize: '14px', color: 'var(--gray)', padding: '8px 0' }}>
          선택지는 20개까지 만들 수 있습니다.
        </div>
      )}
      {other && (
        <div className={styles.selectableResponseItem}>
          <div className={indicatorClass} />
          <input type="text" value="" placeholder="기타 응답" readOnly />
        </div>
      )}
    </div>
  );
}

function RenderTypeSelector({ handleEdit }: { handleEdit: (updates: Partial<Field>) => void }) {
  const items = [
    {
      path: 'M480-280q83 0 141.5-58.5T680-480q0-83-58.5-141.5T480-680q-83 0-141.5 58.5T280-480q0 83 58.5 141.5T480-280Zm0 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z',
      label: '단일 선택',
      id: 'radio',
    },
    {
      path: 'm424-312 282-282-56-56-226 226-114-114-56 56 170 170ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z',
      label: '다중 선택',
      id: 'checkbox',
    },
    {
      path: 'M280-160v-520H80v-120h520v120H400v520H280Zm360 0v-320H520v-120h360v120H760v320H640Z',
      label: '텍스트',
      id: 'text',
    },
  ] as const;

  return (
    <div className={styles.typeSelector}>
      {items.map((item) => (
        <button type="button" onClick={() => handleEdit({ type: item.id })} key={item.id}>
          <Svg path={item.path} size="16px" />
          <div>{item.label}</div>
        </button>
      ))}
    </div>
  );
}

// ===== ===== MAIN COMPONENT ===== =====

function FieldComponent({ index, field, activeState }: Props) {
  const active = activeState[0] === field.fieldId;
  const setActiveField = activeState[1];

  const editField = useSurveyStore((state) => state.editField);
  const copyField = useSurveyStore((state) => state.copyField);
  const deleteField = useSurveyStore((state) => state.deleteField);
  const [showTypeSelector, setShowTypeSelector] = React.useState<boolean>(false);

  function handleActivate() {
    setActiveField(field.fieldId);
    setShowTypeSelector(false);
  }

  const handleEdit = (updates: Partial<Field>) => {
    editField({ fieldId: field.fieldId, updates });
  };

  function handleDelete() {
    deleteField({ fieldId: field.fieldId });
  }

  function handleCopy() {
    copyField({ sectionId: field.sectionId, index, field });
  }

  return (
    <Draggable key={field.fieldId} draggableId={field.fieldId} index={index}>
      {(provided) => {
        const transform = provided.draggableProps.style?.transform;
        if (provided.draggableProps.style && transform) {
          const t = transform.split(',')[1];
          provided.draggableProps.style.transform = `translate(0px,${t}`;
        }
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            className={`${styles.field} ${active ? styles.active : ''}`}
            onClick={handleActivate}>
            <div className={styles.dragHandle} {...provided.dragHandleProps}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 960" width="20px" height="20px">
                <g xmlns="http://www.w3.org/2000/svg" transform="matrix(0 1 -1 0 0 -0)">
                  <path
                    fill="#a0a0a0"
                    d="M360-160q-33 0-56.5-23.5T280-240q0-33 23.5-56.5T360-320q33 0 56.5 23.5T440-240q0 33-23.5 56.5T360-160Zm240 0q-33 0-56.5-23.5T520-240q0-33 23.5-56.5T600-320q33 0 56.5 23.5T680-240q0 33-23.5 56.5T600-160ZM360-400q-33 0-56.5-23.5T280-480q0-33 23.5-56.5T360-560q33 0 56.5 23.5T440-480q0 33-23.5 56.5T360-400Zm240 0q-33 0-56.5-23.5T520-480q0-33 23.5-56.5T600-560q33 0 56.5 23.5T680-480q0 33-23.5 56.5T600-400ZM360-640q-33 0-56.5-23.5T280-720q0-33 23.5-56.5T360-800q33 0 56.5 23.5T440-720q0 33-23.5 56.5T360-640Zm240 0q-33 0-56.5-23.5T520-720q0-33 23.5-56.5T600-800q33 0 56.5 23.5T680-720q0 33-23.5 56.5T600-640Z"
                  />
                </g>
              </svg>
            </div>

            <div className={styles.fieldActions}>
              <button type="button" className={styles.fieldAction} onClick={handleCopy}>
                <Svg
                  size="16px"
                  path="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z"
                />
                <div>복제</div>
              </button>
              <button type="button" className={styles.fieldAction} onClick={handleDelete}>
                <Svg
                  size="16px"
                  path="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"
                />
                <div>삭제</div>
              </button>
            </div>

            <RenderTitle required={field.required} title={field.title} handleEdit={handleEdit} active={active} />

            <RenderDescription description={field.description} handleEdit={handleEdit} active={active} />

            {field.type === 'text' && <RenderTextResponse />}
            {(field.type === 'radio' || field.type === 'checkbox') && (
              <RenderSelectableResponse
                type={field.type}
                options={field.options}
                handleEdit={handleEdit}
                active={active}
                other={field.other}
              />
            )}

            <div className={styles.menu}>
              <div className={styles.menuGroup}>
                <button
                  type="button"
                  className={styles.menuItem}
                  onClick={() => handleEdit({ required: !field.required })}>
                  <Svg
                    path="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z"
                    fill={field.required ? '#ffa347' : '#5f6368'}
                  />
                  <div style={{ color: field.required ? '#ffa347' : '#5f6368' }}>필수</div>
                </button>
                {field.type !== 'text' && (
                  <button type="button" className={styles.menuItem} onClick={() => handleEdit({ other: !field.other })}>
                    <Svg
                      path="M480-400q-50 0-85-35t-35-85v-240q0-50 35-85t85-35q50 0 85 35t35 85v240q0 50-35 85t-85 35Zm0-240Zm-40 520v-123q-104-14-172-93t-68-184h80q0 83 58.5 141.5T480-320q83 0 141.5-58.5T680-520h80q0 105-68 184t-172 93v123h-80Zm40-360q17 0 28.5-11.5T520-520v-240q0-17-11.5-28.5T480-800q-17 0-28.5 11.5T440-760v240q0 17 11.5 28.5T480-480Z"
                      fill={field.other ? '#ffa347' : '#5f6368'}
                    />
                    <div style={{ color: field.other ? '#ffa347' : '#5f6368' }}>기타</div>
                  </button>
                )}
              </div>
              {showTypeSelector && active && <RenderTypeSelector handleEdit={handleEdit} />}
              <div className={styles.menuGroup}>
                <button
                  type="button"
                  className={styles.menuItem}
                  onClick={(e) => {
                    if (!active) handleActivate();
                    e.stopPropagation();
                    setShowTypeSelector((p) => !p);
                  }}>
                  <Svg path="M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q69 0 132 28.5T720-690v-110h80v280H520v-80h168q-32-56-87.5-88T480-720q-100 0-170 70t-70 170q0 100 70 170t170 70q77 0 139-44t87-116h84q-28 106-114 173t-196 67Z" />
                  <div>유형 변경</div>
                </button>
              </div>
            </div>
          </div>
        );
      }}
    </Draggable>
  );
}

export default FieldComponent;
