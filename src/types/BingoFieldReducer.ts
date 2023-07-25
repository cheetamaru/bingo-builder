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

export type BingoFieldChangeSizeAction = {
    type: "changeSize";
    newTotal: number;
}

export type BingoFieldDropAction = {
    type: "drop";
    bingoItem: BingoItem;
    prevKey: string;
}

export type BingoFieldDragStartAction = {
    type: "dragStart";
    bingoItem: BingoItem;
}

export type BingoFieldMarkAction = {
    type: "mark";
    bingoItem: BingoItem;
}

export type BingoFieldResetMarkingsAction = {
    type: "resetMarkings";
}

export type BingoFieldReducerActions =
    BingoFieldStartEditAction | 
    BingoFieldStopEditAction |
    BingoFieldEditAction |
    BingoFieldSwapAction |
    BingoFieldShuffleAction |
    BingoFieldChangeSizeAction |
    BingoFieldDropAction |
    BingoFieldDragStartAction |
    BingoFieldMarkAction |
    BingoFieldResetMarkingsAction;
