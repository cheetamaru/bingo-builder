import { BingoFieldReducerAction, BingoFieldReducerActionType, BingoItem } from "@/types"
import { shuffleArray } from "@/utils"

type ReducerDispatchCall = (draft: BingoItem[], action: BingoFieldReducerAction) => void

export const bingoFieldReducer = (draft: BingoItem[], action: BingoFieldReducerAction) => {
    const actionMapper: Record<BingoFieldReducerActionType, ReducerDispatchCall> = {
        startEdit: performStartEdit,
        stopEdit: performStopEdit,
        edit: performEdit,
        swap: performSwap,
        shuffle: shuffleArray
    }

    actionMapper[action.type](draft, action)
}

const performStartEdit = (draft: BingoItem[], action: BingoFieldReducerAction) => {
    const { bingoItem } = action

    const chosenItem = draft.find(item => item.index === bingoItem?.index)

    if (!chosenItem) {
        throw new Error("Item Not Found")
    }

    chosenItem.isEditing = true
}

const performStopEdit = (draft: BingoItem[], action: BingoFieldReducerAction) => {
    const { bingoItem } = action

    const chosenItem = draft.find(item => item.key === bingoItem?.key)
    
    if (!chosenItem) {
        throw new Error("Item Not Found")
    }

    chosenItem.isEditing = false
}

const performEdit = (draft: BingoItem[], action: BingoFieldReducerAction) => {
    const { bingoItem, inputedValue } = action

    const chosenItem = draft.find(item => item.key === bingoItem?.key)

    if (!chosenItem) {
        throw new Error("Item Not Found")
    }

    chosenItem.content = inputedValue || ""
}

const performSwap = (draft: BingoItem[], action: BingoFieldReducerAction) => {
    const { bingoItem, swapBuffer } = action

    const prevItem = draft.find(item => item.key === swapBuffer?.key)

    if (!prevItem) {
        throw new Error("Buffered Item Not Found")
    }

    prevItem.content = bingoItem?.content || ""

    const chosenItem = draft.find(item => item.key === bingoItem?.key)

    if (!chosenItem) {
        throw new Error("Item Not Found")
    }

    chosenItem.content = swapBuffer?.content || ""
}