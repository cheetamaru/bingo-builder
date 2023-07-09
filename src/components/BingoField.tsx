import BingoBlock from '@/components/BingoBlock'
import BingoFieldShuffleButton from './BingoFieldShuffleButton';
import { BingoBlockService } from '@/services/BingoBlockService';
import { BingoFieldReducerActions, BingoItem } from '@/types';
import React, { useMemo, useState, DragEvent, ChangeEvent } from 'react';
import { useImmerReducer } from 'use-immer';
import styles from './BingoField.module.css'
import BingoFieldSizeSettings from './BingoFieldSizeSettings';
import { bingoFieldReducer } from '@/reducers';

const { getInitialArray, arrayToMatrix, boardSize } = BingoBlockService

export default function BingoField() {
    const [rows, setRows] = useState<number>(boardSize.defaultRows)
    const [cols, setCols] = useState<number>(boardSize.defaultCols)

    const total = rows * cols;

    const [items, dispatch] = useImmerReducer<BingoItem[], BingoFieldReducerActions>(bingoFieldReducer, getInitialArray(total))
    const [swapBuffer, setSwapBuffer] = useState<BingoItem | null>(null)

    const handleClick = (bingoItem: BingoItem) => {
        dispatch({
            type: "startEdit",
            bingoItem
        })
    }

    const handleSwap = (bingoItem: BingoItem) => {
        if (!swapBuffer) {
            setSwapBuffer(bingoItem)

            return
        }

        dispatch({
            type: "swap",
            bingoItem,
            swapBuffer
        })

        setSwapBuffer(null)
    }


    const handleKeyUp = (bingoItem: BingoItem, key: KeyboardEvent["key"]) => {
        if (key === "Enter" || key === "Escape") {
            dispatch({
                type: "stopEdit",
                bingoItem
            })
        }
    }

    const handleEdit = (bingoItem: BingoItem, val: string) => {
        dispatch({
            type: "edit",
            bingoItem,
            inputedValue: val
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
        // const prevKey = ev.dataTransfer.getData("text/plain");
        // const currentKey = block.key

        // updateItems(draft => {
        //     const prevIndex = draft.findIndex(item => item.key === prevKey)

        //     const prevItem = draft.find(item => item.key === prevKey)

        //     if (!prevItem) {
        //         throw new Error("Item Not Found")
        //     }

        //     const prevItemCopy = {...prevItem}

        //     draft.splice(prevIndex, 1)

        //     const currentIndex = draft.findIndex(item => item.key === currentKey)

        //     draft.splice(currentIndex, 0, prevItemCopy);
        // })
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
        dispatch({
            type: "shuffle"
        })
    }

    const handleColInput = (ev: ChangeEvent<HTMLInputElement>) => {
        const newCols = Number(ev.target.value)
        setCols(newCols)
        const total = rows * newCols;
        dispatch({
            type: "changeSize",
            newTotal: total
        })
    }

    const handleRowInput = (ev: ChangeEvent<HTMLInputElement>) => {
        const newRows = Number(ev.target.value)
        setRows(newRows)
        const total = newRows * cols;
        dispatch({
            type: "changeSize",
            newTotal: total
        })
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