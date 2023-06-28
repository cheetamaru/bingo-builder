import { ReactNode, DragEvent } from "react";
import styles from './BingoBlock.module.css'

interface Props {
    children: ReactNode;
    onClick: () => void;
    onSwap: () => void;
    onDragStart: (e: DragEvent<HTMLElement>) => void;
    onDragOver: (e: DragEvent<HTMLElement>) => void;
    onDrop: (e: DragEvent<HTMLElement>) => void; 
}

export default function BingoBlock({ onClick, children, onSwap, onDragOver, onDrop, onDragStart }: Props) {
    return (
      <>
        <div
          className={styles["bingo-block"]}
          draggable
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDrop={onDrop}
        >
          <button onClick={onClick}>
              {children}
          </button>
          <button onClick={onSwap}>↔</button>
        </div>
      </>
    )
  }
  