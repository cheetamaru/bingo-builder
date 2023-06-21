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

export const BingoBlockService = {
    getInitialArray,
}
