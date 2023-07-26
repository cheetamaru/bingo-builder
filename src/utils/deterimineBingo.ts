type FieldItem = boolean

type Coords = [number, number]

type ReturnValue = {
    isBingo: boolean;
    bingoCoords: Coords[]
}

export const determineBingo = (field: FieldItem[][]): ReturnValue => {
    const bingoRows: Coords[] = []
    const bingoCols: Coords[] = []
    const bingoDiags: Coords[] = []

    // todo: logic

    const isBingo = Boolean(bingoRows.length) || Boolean(bingoCols.length) || Boolean(bingoDiags.length)

    const bingoNumsRepeated = [...bingoRows, ...bingoCols, ...bingoDiags]
    const bingoCoords = Array.from(new Set([...bingoNumsRepeated]))

    return {
        isBingo,
        bingoCoords,
    }
}