import React, { ReactNode, DragEvent } from "react";
import styles from './BingoBlock.module.css'

interface Props {
    children: ReactNode;
    onSwap: () => void;
    onEdit: () => void;
    onDragStart: (e: DragEvent<HTMLElement>) => void;
    onDragOver: (e: DragEvent<HTMLElement>) => void;
    onDrop: (e: DragEvent<HTMLElement>) => void;
    onClick?: () => void;
    isSwapping?: boolean;
}

export default function BingoBlock({ onClick, children, onSwap, onEdit, onDragOver, onDrop, onDragStart, isSwapping }: Props) {
    const bingoBlockClasses = `${styles["bingo-block"]} ${isSwapping ? styles["bingo-block--swapping"] : ""}`

    return (
      <>
        <div
          className={bingoBlockClasses}
          draggable
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDrop={onDrop}
        >
          <div className={styles["bingo-block__tools"]}>
            <button onClick={onSwap}>↔</button>
            <button onClick={onEdit}>🛠️</button>
          </div>
          <div
            className={styles["bingo-block__content"]}
            onClick={onClick}
          >
              {children}
          </div>
        </div>
      </>
    )
  }
  