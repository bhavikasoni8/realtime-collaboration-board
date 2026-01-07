import mongoose, { Schema, Document } from "mongoose";

export interface IRoom extends Document {
  name: string;
  members: mongoose.Types.ObjectId[];
  board: mongoose.Types.ObjectId;
}

const RoomSchema = new Schema<IRoom>(
  {
    name: { type: String, required: true },
    members: [{ type: Schema.Types.ObjectId, ref: "User" }],
    board: { type: Schema.Types.ObjectId, ref: "Board" },
  },
  { timestamps: true }
);

export default mongoose.model<IRoom>("Room", RoomSchema);
