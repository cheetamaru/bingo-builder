import { BingoFieldReducerAction, BingoItem } from "@/types"
import { shuffleArray } from "@/utils"

export const bingoFieldReducer = (draft: BingoItem[], action: BingoFieldReducerAction) => {
    const { bingoItem, swapBuffer, inputedValue } = action

    switch(action.type) {
        case "startEdit": {
            const chosenItem = draft.find(item => item.index === bingoItem?.index)

            if (!chosenItem) {
                throw new Error("Item Not Found")
            }

            chosenItem.isEditing = true
            break;
        }
        case "swap": {
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
            break;
        }
        case "stopEdit": {
            const chosenItem = draft.find(item => item.key === bingoItem?.key)
    
            if (!chosenItem) {
                throw new Error("Item Not Found")
            }

            chosenItem.isEditing = false
            break;
        }
        case "edit": {
            const chosenItem = draft.find(item => item.key === bingoItem?.key)

            if (!chosenItem) {
                throw new Error("Item Not Found")
            }

            chosenItem.content = inputedValue || ""
            break;
        }
        case "shuffle": {
            shuffleArray(draft)
            break;
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}