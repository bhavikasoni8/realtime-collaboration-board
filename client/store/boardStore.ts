import { create } from "zustand";

export type BoardElement = {
  id: string;
  type: "note" | "task" | "shape";
  x: number;
  y: number;
  text?: string;
};

export type Operation = {
  id: string;
  type: "ADD" | "MOVE" | "DELETE";
  payload: any;
};

type BoardState = {
  elements: BoardElement[];
  history: Operation[];
  future: Operation[];

  applyOp: (op: Operation) => void;
  undo: () => void;
  redo: () => void;
  syncFromServer: (ops: Operation[]) => void;
};

export const useBoardStore = create<BoardState>((set, get) => ({
  elements: [],
  history: [],
  future: [],

  syncFromServer: (ops) => {
    let elements: BoardElement[] = [];
    ops.forEach((op) => {
      if (op.type === "ADD") elements.push(op.payload);
      if (op.type === "MOVE") {
        elements = elements.map((e) =>
          e.id === op.payload.id ? { ...e, ...op.payload } : e
        );
      }
      if (op.type === "DELETE") {
        elements = elements.filter((e) => e.id !== op.payload.id);
      }
    });

    set({ elements, history: ops, future: [] });
  },

  applyOp: (op) => {
    const { elements, history } = get();
    let newEls = [...elements];

    if (op.type === "ADD") newEls.push(op.payload);
    if (op.type === "MOVE") {
      newEls = newEls.map((e) =>
        e.id === op.payload.id ? { ...e, ...op.payload } : e
      );
    }
    if (op.type === "DELETE") {
      newEls = newEls.filter((e) => e.id !== op.payload.id);
    }

    set({ elements: newEls, history: [...history, op], future: [] });
  },

  undo: () => {
    const { history, future } = get();
    if (!history.length) return;

    const newHistory = [...history];
    const last = newHistory.pop()!;
    set({ history: newHistory, future: [last, ...future] });

    get().syncFromServer(newHistory);
  },

  redo: () => {
    const { history, future } = get();
    if (!future.length) return;

    const next = future[0];
    set({
      history: [...history, next],
      future: future.slice(1),
    });

    get().applyOp(next);
  },
}));
