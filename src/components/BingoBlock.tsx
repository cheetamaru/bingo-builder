import { ReactNode } from "react";
import styles from './BingoBlock.module.css'

interface Props {
    children: ReactNode;
    onClick: () => void;
    onSwap: () => void;
}

export default function BingoBlock({ onClick, children, onSwap }: Props) {
    return (
      <>
        <div className={styles["bingo-block"]}>
          <button onClick={onClick}>
              {children}
          </button>
          <button onClick={onSwap}>↔</button>
        </div>
      </>
    )
  }
  