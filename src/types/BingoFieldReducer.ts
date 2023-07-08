import { BingoItem } from "./BingoItem";

export type BingoFieldStartEditAction = {
    type: "startEdit"
    bingoItem: BingoItem;
}

export type BingoFieldStopEditAction = {
    type: "stopEdit";
    bingoItem: BingoItem;
}

export type BingoFieldEditAction = {
    type: "edit";
    bingoItem: BingoItem;
    inputedValue: string;
}

export type BingoFieldSwapAction = {
    type: "swap";
    bingoItem: BingoItem;
    swapBuffer: BingoItem;
}

export type BingoFieldShuffleAction = {
    type: "shuffle";
}

export type BingoFieldReducerActions =
    BingoFieldStartEditAction | 
    BingoFieldStopEditAction |
    BingoFieldEditAction |
    BingoFieldSwapAction |
    BingoFieldShuffleAction;
