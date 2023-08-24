import BingoBlock from '@/components/BingoBlock'
import BingoFieldShuffleButton from './BingoFieldShuffleButton';
import { BingoBlockService } from '@/services/BingoBlockService';
import { BingoFieldMode, BingoFieldReducerActions, BingoItem } from '@/types';
import React, { useMemo, useState, DragEvent, ChangeEvent } from 'react';
import { useImmerReducer } from 'use-immer';
import styles from '@/styles/BingoField.module.css'
import BingoFieldSizeSettings from './BingoFieldSizeSettings';
import { bingoFieldReducer } from '@/reducers';
import { determineBingo } from '@/utils';
import BingoFieldModeBlock from './BingoFieldModeBlock';

const { getInitialArray, arrayToMatrix, boardSize } = BingoBlockService

export default function BingoField() {
    const [rows, setRows] = useState<number>(boardSize.defaultRows)
    const [cols, setCols] = useState<number>(boardSize.defaultCols)
    const [fieldMode, setFieldMode] = useState<BingoFieldMode>("edit")

    const total = rows * cols;

    const [items, dispatch] = useImmerReducer<BingoItem[], BingoFieldReducerActions>(bingoFieldReducer, getInitialArray(total))
    const [swapBuffer, setSwapBuffer] = useState<BingoItem | null>(null)
    const [dragBuffer, setDragBuffer] = useState<BingoItem | null>(null)

    const startEdit = (bingoItem: BingoItem) => {
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

    const stopEdit = (bingoItem: BingoItem) => {
        dispatch({
            type: "stopEdit",
            bingoItem
        })
    }

    const handleKeyUp = (bingoItem: BingoItem, key: KeyboardEvent["key"]) => {
        if (key === "Enter" || key === "Escape") {
           stopEdit(bingoItem)
        }
    }

    const handleEdit = (bingoItem: BingoItem, val: string) => {
        dispatch({
            type: "edit",
            bingoItem,
            inputedValue: val
        })
    }

    const handleDragStart = (ev: DragEvent<HTMLElement>, bingoItem: BingoItem) => {
        ev.dataTransfer.setData("text/plain", JSON.stringify(bingoItem));
        setDragBuffer({...bingoItem})
        dispatch({
            type: "dragStart",
            bingoItem
        })
        ev.dataTransfer.effectAllowed = "move";
    }

    const handleDragOver = (ev: DragEvent<HTMLElement>, block: BingoItem) => {
        ev.preventDefault();
        ev.dataTransfer.dropEffect = "move";
    }

    const handleDragEnter = (ev: DragEvent<HTMLElement>, block: BingoItem) => {
        ev.preventDefault();
        ev.dataTransfer.dropEffect = "move";
    }

    const handleDragLeave = (ev: DragEvent<HTMLElement>, block: BingoItem) => {
        ev.preventDefault();
        ev.dataTransfer.dropEffect = "move";
    }

    const handleDrop = (ev: DragEvent<HTMLElement>, bingoItem: BingoItem) => {
        ev.preventDefault();
        const prevItem = JSON.parse(ev.dataTransfer.getData("text/plain"));

        dispatch({
            type: "drop",
            bingoItem,
            prevKey: prevItem.key
        })
        setDragBuffer(null)
    }

    const handleModeChange = () => {
        if (fieldMode === "edit") {
            setFieldMode("play")

            return
        }

        setFieldMode("edit")
    }

    const handleClick = (bingoItem: BingoItem) => {
        if (fieldMode === "play") {
            dispatch({
                type: "mark",
                bingoItem
            })
        }
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
                autoFocus
                className={styles["bingo-field__edit-input"]}
                value={content}
                onKeyUp={(e) => handleKeyUp(block, e.key)}
                onChange={(e) => handleEdit(block, e.target.value)}
                onBlur={() => stopEdit(block)}
            />
        </>
    }

    const getIsSwapping = (bingoItem: BingoItem) => {
        return bingoItem.key === swapBuffer?.key
    }

    const getCols = (row: BingoItem[]) => {
        return row.map((block) => {
            return <BingoBlock
                key={block.key}
                mode={fieldMode}
                onSwap={() => handleSwap(block)}
                onDragStart={(ev) => handleDragStart(ev, block)}
                onDragOver={(ev) => handleDragOver(ev, block)}
                onDragEnter={(ev) => handleDragEnter(ev, block)}
                onDragLeave={(ev) => handleDragLeave(ev, block)}
                onDrop={(ev) => handleDrop(ev, block)}
                isSwapping={getIsSwapping(block)}
                onEdit={() => startEdit(block)}
                onClick={() => handleClick(block)}
                isMarked={block.isMarked}
            >
                {getBlockContent(block)}
            </ BingoBlock>
        })
    }

    const matrix = useMemo(() => arrayToMatrix(items, cols), [items, cols]) 

    const { isBingo } = useMemo(() => {
        return determineBingo(matrix.map(el => el.map(elem => Boolean(elem.isMarked))));
    }, [matrix])

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

    const habdleResetMarkings = () => {
        dispatch({
            type: "resetMarkings"
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

    const getEditSettings = () => {
        return <>
            <BingoFieldSizeSettings
                cols={cols}
                rows={rows}
                onColInput={handleColInput}
                onRowInput={handleRowInput}
            />
            <BingoFieldShuffleButton onClick={handleShuffle} />
        </>
    }

    const getPlaySettings = () => {
        return <>
            <button onClick={habdleResetMarkings}>Reset markings</button>
            <div>
                {isBingo && "Bingo!"}
            </div>
        </>
    }

    const getSettings = () => {
        if (fieldMode === "edit") {
            return getEditSettings()
        }

        if (fieldMode === "play") {
            return getPlaySettings()
        }
    }

    return <>
        <div className={styles.container}>
            <div className={styles.top}>
                <div className={styles.mode}>
                    <BingoFieldModeBlock
                        fieldMode={fieldMode}
                        onClick={handleModeChange}
                    />
                </div>
                <div className={styles.settings}>
                    {getSettings()}
                </div>
            </div>
            <div className={styles["bingo-field"]}>
                {getBlocks()}
            </div>
        </div> 
    </>
}