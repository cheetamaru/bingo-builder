import BingoBlock from '@/components/BingoBlock'
import { getShuffledArray } from '@/utils';
import { useState } from 'react';
import { useImmer } from 'use-immer';

type BingoItem = {
    key: string;
    content: string;
    xCoord?: number;
    yCoord?: number;
    index?: number;
}

const rows = 5;
const cols = 5;

const total = rows * cols;

const getInitialArray = (): BingoItem[] => {
    return Array(total).fill(null).map((el, index) => {
        return {
            key: String(index),
            content: `${index}`,
            index,
        }
    })
}

const arrayToMatrix = (arr: BingoItem[]): BingoItem[][] => {
    const matrix: BingoItem[][] = []

    let k = -1

    arr.forEach((el, index) => {
        if (index % cols === 0) {
            k++
            matrix[k] = []
        }

        matrix[k].push(el);
    })

    return matrix
}


export default function BingoField() {
    const [items, updateItems] =  useImmer<BingoItem[]>(getInitialArray())
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
        const matrix = arrayToMatrix(items)

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