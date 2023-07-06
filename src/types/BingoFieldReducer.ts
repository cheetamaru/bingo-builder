import { BingoItem } from "./BingoItem";

export type BingoFieldReducerActionType = "startEdit" | "stopEdit" | "swap" | "edit" | "shuffle"

export type BingoFieldReducerAction = {
    type: BingoFieldReducerActionType;
    bingoItem?: BingoItem;
    swapBuffer?: BingoItem;
    inputedValue?: string;
}
