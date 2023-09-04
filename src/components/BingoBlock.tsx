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
    onDisable?: () => void;
    isDisabled?: boolean;
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
    onDisable,
    isSwapping,
    isMarked,
    mode,
    isDisabled
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

    if (isDisabled) {
      classes.push(styles["bingo-block--disabled"])
    }

    return classes.join(" ")
  }

  const getToolsClass = (additionalClass: string) => {
    return `${styles["bingo-block__tools"]} ${additionalClass}`
  }

  const getTools = () => {
    if (mode === "play") {
      return <></>
    }

    return <>
        <button className={getToolsClass(styles["bingo-block__tools--right-bottom"])} onClick={onSwap}>↔</button>
        <button className={getToolsClass(styles["bingo-block__tools--right-top"])} onClick={onEdit}>🛠️</button>
        <button className={getToolsClass(styles["bingo-block__tools--left-top"])} onClick={onDisable}>
          {isDisabled ? "🟢" : "🚫"}
        </button>
        <button className={getToolsClass(styles["bingo-block__tools--left-bottom"])}>🧲</button>
    </>
  }

  const isDraggable = mode === "edit"

  const handleClick = () => {
    if(isDisabled) {
      return
    }

    onClick?.()
  }

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
        onClick={handleClick}
      >
        {getTools()}
        <div
          className={styles["bingo-block__content"]}
        >
            {isDisabled ? "X" : children}
        </div>
      </div>
    </>
  )
}
  