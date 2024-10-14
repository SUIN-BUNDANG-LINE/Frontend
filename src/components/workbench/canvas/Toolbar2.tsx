import { Draggable, DraggableStateSnapshot, DraggableStyle, Droppable } from '@hello-pangea/dnd';
import Svg from '../misc/Svg';
import styles from './Toolbar2.module.css';

const tools = [
  {
    name: '단일 선택',
    path: 'M480-280q83 0 141.5-58.5T680-480q0-83-58.5-141.5T480-680q-83 0-141.5 58.5T280-480q0 83 58.5 141.5T480-280Zm0 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z',
    id: 'tool-radio',
  },
  {
    name: '다중 선택',
    path: 'm424-312 282-282-56-56-226 226-114-114-56 56 170 170ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z',
    id: 'tool-checkbox',
  },
  {
    name: '텍스트 입력',
    path: 'M280-160v-520H80v-120h520v120H400v520H280Zm360 0v-320H520v-120h360v120H760v320H640Z',
    id: 'tool-text',
  },
];

type Props = {
  openDraft: () => void;
};

function getStyle(style: DraggableStyle | undefined, snapshot: DraggableStateSnapshot) {
  if (!snapshot.isDropAnimating || !snapshot.dropAnimation) {
    return style;
  }
  const { curve } = snapshot.dropAnimation;

  return {
    ...style,
    transition: `all ${curve} 0.001s`,
  };
}

export default function Toolbar2({ openDraft }: Props) {
  return (
    <div className={styles.toolbar}>
      <div className={styles.title}>질문 추가</div>
      <Droppable droppableId="toolbar" direction="vertical" type="field" isDropDisabled>
        {(droppableProvided) => (
          <div {...droppableProvided.droppableProps} ref={droppableProvided.innerRef} className={styles.tools}>
            {tools.map((field, index) => (
              <Draggable key={field.id} draggableId={field.id} index={index}>
                {(provided, snapshot) => (
                  <>
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={styles.tool}
                      style={getStyle(provided.draggableProps.style, snapshot)}>
                      <Svg path={field.path} size="32px" />
                      <div className={styles.name}>{field.name}</div>
                    </div>
                    {snapshot.isDragging && (
                      <div className={styles.placeholder}>
                        <Svg path={field.path} size="32px" />
                        <div className={styles.name}>{field.name}</div>
                      </div>
                    )}
                  </>
                )}
              </Draggable>
            ))}
            <span style={{ display: 'none' }}>{droppableProvided.placeholder}</span>
          </div>
        )}
      </Droppable>
      <div className={styles.title}>AI 기능</div>
      <div className={styles.tools}>
        <button type="button" className={styles.tool} onClick={openDraft} style={{ cursor: 'pointer' }}>
          <Svg
            size="32px"
            path="M480-80q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-200v-80h320v80H320Zm10-120q-69-41-109.5-110T180-580q0-125 87.5-212.5T480-880q125 0 212.5 87.5T780-580q0 81-40.5 150T630-320H330Zm24-80h252q45-32 69.5-79T700-580q0-92-64-156t-156-64q-92 0-156 64t-64 156q0 54 24.5 101t69.5 79Zm126 0Z"
          />
          <span className={styles.name}>초안 생성</span>
        </button>
        <div className={styles.tool} style={{ cursor: 'pointer' }}>
          <Svg
            size="32px"
            path="M240-400h320v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z"
          />
          <span className={styles.name}>채팅 편집</span>
        </div>
      </div>
    </div>
  );
}
