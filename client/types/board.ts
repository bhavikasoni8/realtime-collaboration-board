// ===== Elements =====

export type NoteElement = {
  id: string;
  type: "note";
  x: number;
  y: number;
  text?: string;
  color?: string;
};

export type BoardElement = NoteElement;

// ===== Operations =====

export type AddOperation = {
  id: string;
  type: "ADD";
  payload: BoardElement;
};

export type MoveOperation = {
  id: string;
  type: "MOVE";
  payload: {
    id: string;
    x: number;
    y: number;
  };
};

export type BoardOperation = AddOperation | MoveOperation;

// ===== Server Events =====

export type BoardSyncPayload = BoardOperation[];
