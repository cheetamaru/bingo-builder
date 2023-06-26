import BingoBlock from '@/components/BingoBlock'
import { BingoBlockService } from '@/services/BingoBlockService';
import { BingoItem } from '@/types';
import { getShuffledArray } from '@/utils';
import { useMemo, useState } from 'react';
import { useImmer } from 'use-immer';

const { getInitialArray, arrayToMatrix, boardSize } = BingoBlockService

export default function BingoField() {
    const [rows, setRows] = useState<number>(boardSize.defaultRows)
    const [cols, setCols] = useState<number>(boardSize.defaultCols)

    const total = rows * cols;

    const [items, updateItems] =  useImmer<BingoItem[]>(getInitialArray(total))
    const [swapBuffer, setSwapBuffer] = useState<BingoItem | null>(null)

    const handleClick = (bingoItem: BingoItem) => {
        updateItems(draft => {
            const chosenItem = draft.find(item => item.index === bingoItem.index)

            if (!chosenItem) {
                throw new Error("Item Not Found")
            }

            chosenItem.content = "changed!"
        })
    }

    const handleSwap = (bingoItem: BingoItem) => {
        if (!swapBuffer) {
            setSwapBuffer(bingoItem)

            return
        }

        updateItems(draft => {
            const prevItem = draft.find(item => item.key === swapBuffer.key)

            if (!prevItem) {
                throw new Error("Buffered Item Not Found")
            }

            prevItem.content = bingoItem.content

            const chosenItem = draft.find(item => item.key === bingoItem.key)

            if (!chosenItem) {
                throw new Error("Item Not Found")
            }

            chosenItem.content = swapBuffer.content
        })

        setSwapBuffer(null)
    }

    const getCols = (row: BingoItem[]) => {
        return row.map((block) => {
            const {key, content} = block
            return <BingoBlock
                key={key}
                onClick={() => handleClick(block)}
                onSwap={() => handleSwap(block)}
            >
                {content}
            </ BingoBlock>
        })
    }

    const matrix = useMemo(() => arrayToMatrix(items, cols), [items, cols]) 

    const getEmptyBlocks = () => {
        return matrix.map((row, rowIndex) => {
            return <div key={rowIndex}>
                {getCols(row)}
            </div>
        })
    }

    const handleShuffle = () => {
        updateItems(getShuffledArray(items))
    }

    const handleColInput = (val: string) => {
        const newCols = Number(val)

        if (newCols >=boardSize.minCols && newCols <= boardSize.maxCols) {
            setCols(newCols)
            const total = rows * newCols;
            updateItems(getInitialArray(total))
        }
    }

    const handleRowInput = (val: string) => {
        const newRows = Number(val)

        if (newRows >=boardSize.minRows && newRows <= boardSize.maxRows) {
            setRows(newRows)
            const total = newRows * cols;
            updateItems(getInitialArray(total))
        }
    }


    return <>
        <div>
            Board size:
            <input
                type="number"
                min={boardSize.minCols}
                max={boardSize.maxCols}
                value={cols}
                onChange={(e) => handleColInput(e.target.value)}
            />
            x
            <input
                type="number"
                min={boardSize.minRows}
                max={boardSize.maxRows}
                value={rows}
                onChange={(e) => handleRowInput(e.target.value)}
            />
            <button onClick={handleShuffle}>Shuffle</button>
        </div>
        {getEmptyBlocks()}
    </>
}