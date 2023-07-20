export const GET = async (request, { params }) => {
  try {
    const search = await fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&query=${params.query}`
    ).then((res) => res.json());

    return new Response(JSON.stringify(search), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};
