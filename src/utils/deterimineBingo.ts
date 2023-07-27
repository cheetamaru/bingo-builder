type FieldItem = boolean

type Coords = [number, number]

type ReturnValue = {
    isBingo: boolean;
    bingoCoords: Coords[]
}

type InnerArrayType = {
    isMarked: boolean,
    coord: Coords
}

export const determineBingo = (field: FieldItem[][]): ReturnValue => {
    const rowsBucket: InnerArrayType[][] = []
    const colsBucket: InnerArrayType[][] = [...Array(field[0].length).fill(null).map(() => [])]
    const diagBucket: InnerArrayType[][] = []

    field.forEach((row, rowIndex) => {
        rowsBucket.push(row.map((el, ind) => ({ isMarked: el, coord: [ind, rowIndex] })))

        row.forEach((cell, colIndex) => {
            colsBucket[colIndex].push({isMarked: cell, coord: [colIndex, rowIndex]})

            if (rowIndex === colIndex) {
                diagBucket[0].push({isMarked: cell, coord: [colIndex, rowIndex]})
            }

            if (rowIndex + colIndex === field[0].length) {
                diagBucket[1].push({isMarked: cell, coord: [colIndex, rowIndex]})
            }
        })
    })

    // todo: finish logic

    const bingoRows: Coords[] = []
    const bingoCols: Coords[] = []
    const bingoDiags: Coords[] = []

    const isBingo = Boolean(bingoRows.length) || Boolean(bingoCols.length) || Boolean(bingoDiags.length)

    const bingoNumsRepeated = [...bingoRows, ...bingoCols, ...bingoDiags]
    const bingoCoords = Array.from(new Set([...bingoNumsRepeated]))

    return {
        isBingo,
        bingoCoords,
    }
}