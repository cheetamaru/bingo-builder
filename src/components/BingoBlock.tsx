import React, { ReactNode, DragEvent } from "react";
import styles from '@/styles/BingoBlock.module.css'
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
    isMarked?: boolean;
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
    isMarked,
    mode
  } = props 
  
  const getBingoBlockClasses = () => {
    const classes = [styles["bingo-block"]]

    if (isSwapping) {
      classes.push(styles["bingo-block--swapping"])
    }

    if (isMarked && mode === "play") {
      classes.push(styles["bingo-block--marked"])
    }

    if (mode === "play") {
      classes.push(styles["bingo-block--play"])
    }

    return classes.join(" ")
  }

  const getTools = () => {
    if (mode === "play") {
      return <></>
    }

    return <>
        <button className={styles["bingo-block__tools--right-bottom"]} onClick={onSwap}>↔</button>
        <button className={styles["bingo-block__tools--right-top"]} onClick={onEdit}>🛠️</button>
    </>
  }

  const isDraggable = mode === "edit"

  return (
    <>
      <div
        className={getBingoBlockClasses()}
        draggable={isDraggable}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onClick={onClick}
      >
        {getTools()}
        <div
          className={styles["bingo-block__content"]}
        >
            {children}
        </div>
      </div>
    </>
  )
}
  