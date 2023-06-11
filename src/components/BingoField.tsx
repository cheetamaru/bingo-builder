import BingoBlock from '@/components/BingoBlock'

const rows = 5;
const cols = 5;

const items = Array(rows).fill(null).map(() => [...Array(cols).fill(null)])

const getCols = (row: null[], rowIndex: number) => {
    return row.map((col, colIndex) => {
        return <BingoBlock onClick={() => console.log('clicked', `${rowIndex}/${colIndex}`)} key={`${rowIndex}${colIndex}`}>
            {rowIndex}{colIndex}
        </ BingoBlock>
    })
}

const getEmptyBlocks = () => {
    return items.map((row, rowIndex) => {
        return <div key={rowIndex}>
            {getCols(row, rowIndex)}
        </div>
    })
}

export default function BingoField() {
    return <>
        {getEmptyBlocks()}
    </>
}