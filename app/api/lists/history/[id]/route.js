import History from "@models/history";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const history = await History.find({ userId: params.id });

    return new Response(JSON.stringify(history), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    await History.deleteOne({ mediaId: params.id });
    return new Response("history item deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete history item", { status: 500 });
  }
};
