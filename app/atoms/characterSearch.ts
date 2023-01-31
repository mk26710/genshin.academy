import { atom } from "jotai";

export const characterSearchAtom = atom<string>("");
export const charactersFilterFivestarsAtom = atom<boolean>(true);
export const charactersFilterFourstarsAtom = atom<boolean>(true);
