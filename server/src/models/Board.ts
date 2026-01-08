import mongoose, { Schema, Document } from "mongoose";

export interface IOperation {
  id: string;
  type: "ADD" | "MOVE" | "DELETE" | "UPDATE";
  payload: any;
  userId: string;
  timestamp: number;
}

export interface IBoard extends Document {
  roomId: mongoose.Types.ObjectId;
  operations: IOperation[];
}

const OperationSchema = new Schema<IOperation>(
  {
    id: { type: String, required: true },
    type: {
      type: String,
      enum: ["ADD", "MOVE", "DELETE", "UPDATE"],
      required: true,
    },
    payload: { type: Schema.Types.Mixed, required: true },
    userId: { type: String, required: true },
    timestamp: { type: Number, required: true },
  },
  { _id: false }
);

const BoardSchema = new Schema<IBoard>(
  {
    roomId: { type: Schema.Types.ObjectId, ref: "Room", required: true },
    operations: { type: [OperationSchema], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model<IBoard>("Board", BoardSchema);
