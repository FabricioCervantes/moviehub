import { Schema, model, models } from "mongoose";

const HistorySchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  movieId: {
    type: String,
    required: [true, "Title is required."],
  },
  timeWatched: {
    type: Date,
    default: Date.now,
  },
});

const History = models.History || model("History", HistorySchema);

export default History;
