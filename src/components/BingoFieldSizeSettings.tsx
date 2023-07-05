import { BingoBlockService } from "@/services/BingoBlockService";
import React, { ChangeEvent } from "react";

interface Props {
    cols: number;
    rows: number;
    onColInput: (ev: ChangeEvent<HTMLInputElement>) => void;
    onRowInput: (ev: ChangeEvent<HTMLInputElement>) => void;
}

const { boardSize } = BingoBlockService

export default function BingoFieldSizeSettings({ cols, rows, onColInput, onRowInput }: Props) {
  const handleColInput = (ev: ChangeEvent<HTMLInputElement>) => {
    const newCols = Number(ev.target.value)

    if (newCols >=boardSize.minCols && newCols <= boardSize.maxCols) {
      onColInput(ev)
    }
  }

  const handleRowInput = (ev: ChangeEvent<HTMLInputElement>) => {
    const newRows = Number(ev.target.value)

    if (newRows >=boardSize.minRows && newRows <= boardSize.maxRows) {
      onRowInput(ev)
    }
  }


  return (
    <>
      <div>
          Board size:
          <input
              type="number"
              min={boardSize.minCols}
              max={boardSize.maxCols}
              value={cols}
              onChange={handleColInput}
          />
          x
          <input
              type="number"
              min={boardSize.minRows}
              max={boardSize.maxRows}
              value={rows}
              onChange={handleRowInput}
          />
      </div>
    </>
  )
}
  