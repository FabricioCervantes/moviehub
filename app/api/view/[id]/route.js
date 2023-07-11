export const GET = async (request, { params }) => {
  try {
    const media = await fetch(
      `https://api.themoviedb.org/3/movie/${params.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    ).then((res) => res.json());

    const credits = await fetch(
      `https://api.themoviedb.org/3/movie/${params.id}/credits?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    ).then((res) => res.json());

    const images = await fetch(
      `https://api.themoviedb.org/3/movie/${params.id}/images?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    ).then((res) => res.json());
    const videos = await fetch(
      `https://api.themoviedb.org/3/movie/${params.id}/videos?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    ).then((res) => res.json());

    media.credits = credits;
    media.images = images;
    media.videos = videos;

    return new Response(JSON.stringify(media), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
  //   return fetch(
  //     `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
  //   )
};
