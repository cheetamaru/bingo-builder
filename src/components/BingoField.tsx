import BingoBlock from '@/components/BingoBlock'
import { useState } from 'react';

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
    const [items, setItems] =  useState(getInitialArray())

    const handleClick = (content: BingoItem) => {
        const newItems = items.map((item) => {
            if (content.index === item.index) {
                return {
                    ...item,
                    content: "changed!"
                }
            }

            return item
        })

        setItems(newItems)
    }

    const getCols = (row: BingoItem[]) => {
        return row.map((block) => {
            const {key, content} = block
            return <BingoBlock onClick={() => handleClick(block)} key={key}>
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

    return <>
        {getEmptyBlocks()}
    </>
}