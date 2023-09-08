type FieldItem = boolean

type Coords = {
    row: number;
    col: number;
}

type ReturnValue = {
    isBingo: boolean;
    bingoMatrix: boolean[][]
}

type InnerArrayType = {
    isMarked: boolean;
    coord: Coords;
    checkSum: string;
}

const checkBingo = (arr: InnerArrayType[]): boolean => {
    return arr.reduce((prev, curr) => prev && curr.isMarked, true)
}

const bucketToCoordsTransformer = (bucket: InnerArrayType[][]): Coords[][] => {
    return bucket
        .map((el) => checkBingo(el) ? el.map(elem => elem.coord) : [])
        .filter((elem) => elem.length)
}

const initialaizeBuckets = (colLength: number) => {
    const rowsBucket: InnerArrayType[][] = []
    const colsBucket: InnerArrayType[][] = [...Array(colLength).fill(null).map(() => [])]
    const diagBucket: InnerArrayType[][] = [[],[]]

    return {
        rowsBucket,
        colsBucket,
        diagBucket
    }
}

const getCheckSum = (col: number, row: number) => `${col}-${row}`

const getFormattedRow = (row: FieldItem[], rowIndex: number): InnerArrayType[] => {
    return row.map((el, ind) => ({ isMarked: el, coord: {col: ind, row: rowIndex}, checkSum: getCheckSum(ind, rowIndex) }))
}

const getEmptyMatrix = (field: FieldItem[][]) => {
    return Array(field.length).fill(null).map(() => [...Array(field[0].length).fill(false)])
}
 
export const determineBingo = (field: FieldItem[][]): ReturnValue => {
    const colLength = field[0].length
    const isDiagonalPossible = field.length === colLength

    const {
        rowsBucket,
        colsBucket,
        diagBucket
    } = initialaizeBuckets(colLength)

    field.forEach((row, rowIndex) => {
        rowsBucket.push(getFormattedRow(row, rowIndex))

        row.forEach((cell, colIndex) => {
            const newElement: InnerArrayType = {
                isMarked: cell,
                coord: { col: colIndex, row: rowIndex},
                checkSum: getCheckSum(colIndex, rowIndex)
            }

            colsBucket[colIndex].push(newElement)

            const isAscendingDiagonal = isDiagonalPossible && rowIndex === colIndex
            const isDescendingDiagonal = isDiagonalPossible && rowIndex + colIndex === colLength - 1

            if (isAscendingDiagonal) {
                diagBucket[0].push(newElement)
            }

            if (isDescendingDiagonal) {
                diagBucket[1].push(newElement)
            }
        })
    })

    const bingoRows: Coords[][] = bucketToCoordsTransformer(rowsBucket)
    const bingoCols: Coords[][] = bucketToCoordsTransformer(colsBucket)
    const bingoDiags: Coords[][] = bucketToCoordsTransformer(diagBucket)

    const isBingo = Boolean(bingoRows.length) || Boolean(bingoCols.length) || Boolean(bingoDiags.length)

    const bingoMatrix = getEmptyMatrix(field)

    if (!isBingo) {
        return {
            isBingo,
            bingoMatrix
        }
    }

    const bingoCoords = [...bingoRows, ...bingoCols, ...bingoDiags].flat()

    bingoCoords.forEach(({col, row}) => {
        bingoMatrix[row][col] = true
    })

    return {
        isBingo,
        bingoMatrix,
    }
}
