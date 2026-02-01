import { create } from "zustand";
import { BoardElement, BoardOperation } from "@/types/board";
import { PresenceMap } from "@/types/presence";

type BoardState = {
  elements: BoardElement[];
  history: BoardOperation[];
  redoStack: BoardOperation[];
  applyOp: (op: BoardOperation) => void;
  undo: () => void;
  redo: () => void;
  syncFromServer: (ops: BoardOperation[]) => void;
  presence: PresenceMap;
  setPresence: (presence: PresenceMap) => void;
};

export const useBoardStore = create<BoardState>((set, get) => ({
  elements: [],
  history: [],
  redoStack: [],
  presence: {},
  setPresence: (presence) => set({ presence }),
  applyOp: (op) => {
    const { elements, history } = get();
    let newElements = [...elements];

    if (op.type === "ADD") {
      newElements.push(op.payload);
    }

    if (op.type === "MOVE") {
      newElements = newElements.map((el) =>
        el.id === op.payload.id
          ? { ...el, x: op.payload.x, y: op.payload.y }
          : el
      );
    }

    set({
      elements: newElements,
      history: [...history, op],
      redoStack: [],
    });
  },

  undo: () => {
    const { history } = get();
    if (!history.length) return;

    const newHistory = [...history];
    newHistory.pop();

    const rebuilt: BoardElement[] = [];

    newHistory.forEach((op) => {
      if (op.type === "ADD") {
        rebuilt.push(op.payload);
      }

      if (op.type === "MOVE") {
        const index = rebuilt.findIndex((e) => e.id === op.payload.id);

        if (index !== -1) {
          rebuilt[index] = {
            ...rebuilt[index],
            x: op.payload.x,
            y: op.payload.y,
          };
        }
      }
    });

    set({
      elements: rebuilt,
      history: newHistory,
    });
  },

  redo: () => {},

  syncFromServer: (ops) => {
    set({ elements: [], history: [] });

    ops.forEach((op) => {
      get().applyOp(op);
    });
  },
}));
