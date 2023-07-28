import { Schema, model, models } from "mongoose";

const HistorySchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  mediaId: {
    type: String,
    required: [true, "Title is required."],
  },
  timeWatched: {
    type: Date,
    default: Date.now,
  },
  mediaType: {
    type: String,
    required: [true, "Type is required."],
  },
});

const History = models.History || model("History", HistorySchema);

export default History;
