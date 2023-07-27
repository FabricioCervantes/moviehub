import { Schema, model, models } from "mongoose";

const WatchlistSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  mediaId: {
    type: String,
    required: [true, "Title is required."],
  },
  mediaType: {
    type: String,
    required: [true, "Type is required."],
  },
});

const Watchlist = models.Watchlist || model("Watchlist", WatchlistSchema);

export default Watchlist;
