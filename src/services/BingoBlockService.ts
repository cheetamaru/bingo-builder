import { BingoItem } from "@/types"

const getInitialArray = (total: number): BingoItem[] => {
    return Array(total).fill(null).map((el, index) => {
        return {
            key: String(index),
            content: `${index}`,
            index,
        }
    })
}

const arrayToMatrix = (arr: BingoItem[], cols: number): BingoItem[][] => {
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

const boardSize = {
    minRows: 2,
    maxRows: 10,
    minCols: 2,
    maxCols: 10,
    defaultRows: 5,
    defaultCols: 5
}

export const BingoBlockService = {
    getInitialArray,
    arrayToMatrix,
    boardSize,
}
