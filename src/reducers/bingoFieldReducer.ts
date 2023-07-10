import { BingoBlockService } from "@/services/BingoBlockService"
import { BingoFieldChangeSizeAction, BingoFieldDropAction, BingoFieldEditAction, BingoFieldReducerActions, BingoFieldStartEditAction, BingoFieldStopEditAction, BingoFieldSwapAction, BingoItem } from "@/types"
import { shuffleArray } from "@/utils"

const { getInitialArray } = BingoBlockService;

export const bingoFieldReducer = (draft: BingoItem[], action: BingoFieldReducerActions) => {
    switch(action.type) {
        case "startEdit": {
            performStartEdit(draft, action)
            break;
        }
        case "stopEdit": {
            performStopEdit(draft, action)
            break;
        }
        case "edit": {
            performEdit(draft, action)
            break;
        }
        case "swap": {
            performSwap(draft, action)
            break;
        }
        case "shuffle": {
            shuffleArray(draft)
            break;
        }
        case "changeSize": {
            return performChangeSize(draft, action)
        }
        case "drop": {
            performDrop(draft, action)
            break;
        }
        default: {
            throw Error('Unknown action');
        }
    }
}

const performStartEdit = (draft: BingoItem[], action: BingoFieldStartEditAction) => {
    const { bingoItem } = action

    const chosenItem = draft.find(item => item.index === bingoItem?.index)

    if (!chosenItem) {
        throw new Error("Item Not Found")
    }

    chosenItem.isEditing = true
}

const performStopEdit = (draft: BingoItem[], action: BingoFieldStopEditAction) => {
    const { bingoItem } = action

    const chosenItem = draft.find(item => item.key === bingoItem?.key)
    
    if (!chosenItem) {
        throw new Error("Item Not Found")
    }

    chosenItem.isEditing = false
}

const performEdit = (draft: BingoItem[], action: BingoFieldEditAction) => {
    const { bingoItem, inputedValue } = action

    const chosenItem = draft.find(item => item.key === bingoItem?.key)

    if (!chosenItem) {
        throw new Error("Item Not Found")
    }

    chosenItem.content = inputedValue || ""
}

const performSwap = (draft: BingoItem[], action: BingoFieldSwapAction) => {
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

const performChangeSize = (_: BingoItem[], action: BingoFieldChangeSizeAction) => {
    return getInitialArray(action.newTotal)
}

const performDrop = (draft: BingoItem[], action: BingoFieldDropAction) => {
    const currentKey = action.bingoItem.key
    const prevKey = action.prevKey

    const prevIndex = draft.findIndex(item => item.key === prevKey)

    const prevItem = draft.find(item => item.key === prevKey)

    if (!prevItem) {
        throw new Error("Item Not Found")
    }

    const prevItemCopy = {...prevItem}

    draft.splice(prevIndex, 1)

    const currentIndex = draft.findIndex(item => item.key === currentKey)

    draft.splice(currentIndex, 0, prevItemCopy);
}