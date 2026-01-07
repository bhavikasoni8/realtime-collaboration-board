import mongoose, { Schema, Document } from "mongoose";

export interface IBoardElement {
  id: string;
  type: "note" | "task" | "shape";
  x: number;
  y: number;
  text?: string;
  completed?: boolean;
  shapeType?: "rect" | "circle";
}

export interface IBoard extends Document {
  roomId: mongoose.Types.ObjectId;
  elements: IBoardElement[];
}

const BoardElementSchema = new Schema<IBoardElement>(
  {
    id: { type: String, required: true },
    type: { type: String, enum: ["note", "task", "shape"], required: true },
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    text: { type: String },
    completed: { type: Boolean },
    shapeType: { type: String, enum: ["rect", "circle"] },
  },
  { _id: false }
);

const BoardSchema = new Schema<IBoard>(
  {
    roomId: { type: Schema.Types.ObjectId, ref: "Room", required: true },
    elements: { type: [BoardElementSchema], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model<IBoard>("Board", BoardSchema);
