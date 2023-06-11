import { ReactNode } from "react";

interface Props {
    children: ReactNode;
    onClick: () => void;
}

export default function BingoBlock({ onClick, children }: Props) {
    return (
      <>
        <button onClick={onClick}>
            {children}
        </button>
      </>
    )
  }
  