import React from "react";

interface Props {
    onClick: () => void;
}

export default function BingoFieldShuffleButton({ onClick }: Props) {
    return (
      <>
        <button onClick={onClick}>Shuffle</button>
      </>
    )
  }
  