import Watchlist from "@models/watchlist";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const watchlist = await Watchlist.find({ userId: params.id });

    return new Response(JSON.stringify(watchlist), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    await Watchlist.deleteOne({ mediaId: params.id });
    return new Response("Watchlist item deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete watchlist item", { status: 500 });
  }
};
