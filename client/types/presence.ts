export type CursorPresence = {
  socketId: string;
  name: string;
  x: number;
  y: number;
  color: string;
};

export type PresenceMap = {
  [socketId: string]: CursorPresence;
};
