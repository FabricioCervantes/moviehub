import Favorites from "@models/favorites";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const favorites = await Favorites.find({ userId: params.id });

    return new Response(JSON.stringify(favorites), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
