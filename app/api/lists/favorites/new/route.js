import Favorites from "@models/favorites";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
  const { userId, mediaId, mediaType } = await request.json();

  try {
    await connectToDB();
    const newItem = new Favorites({ userId, mediaId, mediaType });

    await newItem.save();
    return new Response(JSON.stringify(newItem), { status: 201 });
  } catch (error) {
    return new Response("Failed to add a new element to favorites", {
      status: 500,
    });
  }
};
