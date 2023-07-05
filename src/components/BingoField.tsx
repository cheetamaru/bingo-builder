import BingoBlock from '@/components/BingoBlock'
import BingoFieldShuffleButton from './BingoFieldShuffleButton';
import { BingoBlockService } from '@/services/BingoBlockService';
import { BingoItem } from '@/types';
import { getShuffledArray } from '@/utils';
import React, { useMemo, useState, DragEvent, ChangeEvent } from 'react';
import { useImmer } from 'use-immer';
import styles from './BingoField.module.css'
import BingoFieldSizeSettings from './BingoFieldSizeSettings';

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

            chosenItem.isEditing = true
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


    const handleKeyUp = (block: BingoItem, key: KeyboardEvent["key"]) => {
        if (key === "Enter" || key === "Escape") {
            updateItems(draft => {
                const chosenItem = draft.find(item => item.key === block.key)
    
                if (!chosenItem) {
                    throw new Error("Item Not Found")
                }
    
                chosenItem.isEditing = false
            })
        }
    }

    const handleEdit = (block: BingoItem, val: string) => {
        updateItems(draft => {
            const chosenItem = draft.find(item => item.key === block.key)

            if (!chosenItem) {
                throw new Error("Item Not Found")
            }

            chosenItem.content = val
        })
    }

    const handleDragStart = (ev: DragEvent<HTMLElement>, block: BingoItem) => {
        ev.dataTransfer.setData("text/plain", block.key);
        ev.dataTransfer.effectAllowed = "move";
    }

    const handleDragOver = (ev: DragEvent<HTMLElement>, block: BingoItem) => {
        ev.preventDefault();
        ev.dataTransfer.dropEffect = "move";
    }

    const handleDrop = (ev: DragEvent<HTMLElement>, block: BingoItem) => {
        ev.preventDefault();
        const prevKey = ev.dataTransfer.getData("text/plain");
        const currentKey = block.key

        updateItems(draft => {
            const prevIndex = draft.findIndex(item => item.key === prevKey)

            const prevItem = draft.find(item => item.key === prevKey)

            if (!prevItem) {
                throw new Error("Item Not Found")
            }

            const prevItemCopy = {...prevItem}

            draft.splice(prevIndex, 1)

            const currentIndex = draft.findIndex(item => item.key === currentKey)

            draft.splice(currentIndex, 0, prevItemCopy);
        })
    }

    const getBlockContent = (block: BingoItem) => {
        const { content, isEditing } = block

        if (!isEditing) {
            return <>
                {content}
            </>
        }

        return <>
            <input
                value={content}
                onKeyUp={(e) => handleKeyUp(block, e.key)}
                onChange={(e) => handleEdit(block, e.target.value)}
            />
        </>
    }

    const getCols = (row: BingoItem[]) => {
        return row.map((block) => {
            return <BingoBlock
                key={block.key}
                onClick={() => handleClick(block)}
                onSwap={() => handleSwap(block)}
                onDragStart={(ev) => handleDragStart(ev, block)}
                onDragOver={(ev) => handleDragOver(ev, block)}
                onDrop={(ev) => handleDrop(ev, block)}
            >
                {getBlockContent(block)}
            </ BingoBlock>
        })
    }

    const matrix = useMemo(() => arrayToMatrix(items, cols), [items, cols]) 

    const getBlocks = () => {
        return matrix.map((row, rowIndex) => {
            return <div className={styles["bingo-field__row"]} key={rowIndex}>
                {getCols(row)}
            </div>
        })
    }

    const handleShuffle = () => {
        updateItems(getShuffledArray(items))
    }

    const handleColInput = (ev: ChangeEvent<HTMLInputElement>) => {
        const newCols = Number(ev.target.value)
        setCols(newCols)
        const total = rows * newCols;
        updateItems(getInitialArray(total))
    }

    const handleRowInput = (ev: ChangeEvent<HTMLInputElement>) => {
        const newRows = Number(ev.target.value)
        setRows(newRows)
        const total = newRows * cols;
        updateItems(getInitialArray(total))
    }

    return <>
        <div>
            <BingoFieldSizeSettings
                cols={cols}
                rows={rows}
                onColInput={handleColInput}
                onRowInput={handleRowInput}
            />
            <BingoFieldShuffleButton onClick={handleShuffle} />
        </div>
        <div className={styles["bingo-field"]}>
            {getBlocks()}
        </div>
    </>
}