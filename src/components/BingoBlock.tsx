import React, { ReactNode, DragEvent } from "react";
import styles from './BingoBlock.module.css'
import { BingoFieldMode } from "@/types";

interface Props {
    children: ReactNode;
    mode: BingoFieldMode;
    onSwap?: () => void;
    onEdit?: () => void;
    onDragStart?: (e: DragEvent<HTMLElement>) => void;
    onDragOver?: (e: DragEvent<HTMLElement>) => void;
    onDragEnter?: (e: DragEvent<HTMLElement>) => void;
    onDragLeave?: (e: DragEvent<HTMLElement>) => void;
    onDrop?: (e: DragEvent<HTMLElement>) => void;
    onClick?: () => void;
    isSwapping?: boolean;
}

export default function BingoBlock(props: Props) {
  const {
    onClick,
    children,
    onSwap,
    onEdit,
    onDragOver,
    onDrop,
    onDragStart,
    onDragEnter,
    onDragLeave,
    isSwapping,
    mode
  } = props 
  
  const bingoBlockClasses = `${styles["bingo-block"]} ${isSwapping ? styles["bingo-block--swapping"] : ""}`

  const getTools = () => {
    if (mode === "play") {
      return <></>
    }

    return <>
        <div className={styles["bingo-block__tools"]}>
          <button onClick={onSwap}>↔</button>
          <button onClick={onEdit}>🛠️</button>
        </div>
    </>
  }

  const isDraggable = mode === "edit"


  return (
    <>
      <div
        className={bingoBlockClasses}
        draggable={isDraggable}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
      >
        {getTools()}
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
  