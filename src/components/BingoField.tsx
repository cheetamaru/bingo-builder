import BingoBlock from '@/components/BingoBlock'
import { useState } from 'react';

type BingoItem = {
    key: string;
    content: string;
}

const rows = 5;
const cols = 5;

const getInitialItems = (): BingoItem[][] => {
    return Array(rows)
        .fill(null)
        .map((_, rowIndex) => [
            ...Array(cols).fill(null).map((_, colIndex) => ({key: `${rowIndex}${colIndex}`, content: `${rowIndex}/${colIndex}`}))
        ])
}


export default function BingoField() {
    const [items, setItems] =  useState(getInitialItems())

    const handleClick = (content: BingoItem['content']) => {
        console.log(content)
    }

    const getCols = (row: BingoItem[]) => {
        return row.map(({key, content}) => {
            return <BingoBlock onClick={() => handleClick(content)} key={key}>
                {content}
            </ BingoBlock>
        })
    }

    const getEmptyBlocks = () => {
        return items.map((row, rowIndex) => {
            return <div key={rowIndex}>
                {getCols(row)}
            </div>
        })
    }

    return <>
        {getEmptyBlocks()}
    </>
}