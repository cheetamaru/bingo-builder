import { BingoFieldMode } from "@/types";
import React from "react";

interface Props {
    onClick: () => void;
    fieldMode: BingoFieldMode;
}

export default function BingoFieldModeBlock({ fieldMode, onClick }: Props) {
    return (
      <>
          <div>Mode: {fieldMode}</div>
          <button onClick={onClick}>Change mode</button>
      </>
    )
  }
  