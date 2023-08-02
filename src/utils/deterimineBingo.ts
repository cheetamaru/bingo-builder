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
    isMarked: boolean,
    coord: Coords
}

const checkBingo = (arr: InnerArrayType[]): boolean => {
    return arr.reduce((prev, curr) => prev && curr.isMarked, true)
}

const determineBingo = (field: FieldItem[][]): ReturnValue => {
    const rowsBucket: InnerArrayType[][] = []
    const colsBucket: InnerArrayType[][] = [...Array(field[0].length).fill(null).map(() => [])]
    const diagBucket: InnerArrayType[][] = []

    field.forEach((row, rowIndex) => {
        rowsBucket.push(row.map((el, ind) => ({ isMarked: el, coord: {col: ind, row: rowIndex} })))

        row.forEach((cell, colIndex) => {
            if (!colsBucket[colIndex]) {
                colsBucket[colIndex] = []
            }
            colsBucket[colIndex].push({isMarked: cell, coord: { col: colIndex, row: rowIndex}})

            if (rowIndex === colIndex) {
                if (!diagBucket[0]) {
                    diagBucket[0] = []
                }
                diagBucket[0].push({isMarked: cell, coord: { col: colIndex, row: rowIndex}})
            }

            if (rowIndex + colIndex === field[0].length - 1) {
                if (!diagBucket[1]) {
                    diagBucket[1] = []
                }
                diagBucket[1].push({isMarked: cell, coord: { col: colIndex, row: rowIndex}})
            }
        })
    })

    const bingoRows: Coords[][] = rowsBucket.map((el) => checkBingo(el) ? el.map(elem => elem.coord) : []).filter((elem) => elem.length)
    const bingoCols: Coords[][] = colsBucket.map((el) => checkBingo(el) ? el.map(elem => elem.coord) : []).filter((elem) => elem.length)
    const bingoDiags: Coords[][] = diagBucket.map((el) => checkBingo(el) ? el.map(elem => elem.coord) : []).filter((elem) => elem.length)

    const isBingo = Boolean(bingoRows.length) || Boolean(bingoCols.length) || Boolean(bingoDiags.length)

    const bingoCoords = [...bingoRows, ...bingoCols, ...bingoDiags].flat()

    const bingoMatrix = Array(field.length).fill(null).map(() => [...Array(field[0].length).fill(false)])

    bingoCoords.forEach(({col, row}) => {
        bingoMatrix[row][col] = true
    })

    return {
        isBingo,
        bingoMatrix,
    }
}
