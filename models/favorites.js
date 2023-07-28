import { Schema, model, models } from "mongoose";

const FavoritesSchema = new Schema({
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

const Favorites = models.Favorites || model("Favorites", FavoritesSchema);

export default Favorites;
