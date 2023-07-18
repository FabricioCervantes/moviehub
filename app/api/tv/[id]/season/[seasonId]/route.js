export const GET = async (request, { params }) => {
  try {
    const media = await fetch(
      `https://api.themoviedb.org/3/tv/${params.id}/season/${params.seasonId}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&credits`
    ).then((res) => res.json());
    const cast = await fetch(
      `https://api.themoviedb.org/3/tv/${params.id}/season/${params.seasonId}/credits?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    ).then((res) => res.json());
    media.cast = cast.cast;

    return new Response(JSON.stringify(media), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};
