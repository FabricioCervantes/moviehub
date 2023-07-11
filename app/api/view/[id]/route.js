export const GET = async (request, { params }) => {
  try {
    const media = await fetch(
      `https://api.themoviedb.org/3/movie/${params.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    ).then((res) => res.json());

    return new Response(JSON.stringify(media), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
  //   return fetch(
  //     `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
  //   )
};
