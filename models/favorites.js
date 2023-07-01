import { Schema, model, models } from "mongoose";

const FavoritesSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  movieId: {
    type: String,
    required: [true, "Title is required."],
  },
});

const Favorites = models.Favorites || model("Favorites", FavoritesSchema);

export default Favorites;
