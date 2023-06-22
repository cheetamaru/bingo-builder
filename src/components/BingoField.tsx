import BingoBlock from '@/components/BingoBlock'
import { BingoBlockService } from '@/services/BingoBlockService';
import { BingoItem } from '@/types';
import { getShuffledArray } from '@/utils';
import { useState } from 'react';
import { useImmer } from 'use-immer';

const rows = 5;
const cols = 5;

const total = rows * cols;

const { getInitialArray, arrayToMatrix } = BingoBlockService

export default function BingoField() {
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

    const getEmptyBlocks = () => {
        const matrix = arrayToMatrix(items, cols)

        return matrix.map((row, rowIndex) => {
            return <div key={rowIndex}>
                {getCols(row)}
            </div>
        })
    }

    const handleShuffle = () => {
        updateItems(getShuffledArray(items))
    }

    return <>
        <button onClick={handleShuffle}>Shuffle</button>
        {getEmptyBlocks()}
    </>
}