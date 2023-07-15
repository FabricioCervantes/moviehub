export const GET = async (request, { params }) => {
  try {
    const media = await fetch(
      `https://api.themoviedb.org/3/tv/${params.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    ).then((res) => res.json());

    const credits = await fetch(
      `https://api.themoviedb.org/3/tv/${params.id}/credits?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    ).then((res) => res.json());

    const images = await fetch(
      `https://api.themoviedb.org/3/tv/${params.id}/images?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    ).then((res) => res.json());
    const videos = await fetch(
      `https://api.themoviedb.org/3/tv/${params.id}/videos?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    ).then((res) => res.json());

    //get all seasons info
    const seasonsInfo = await Promise.all(
      media.seasons.map(async (season) => {
        const seasonInfo = await fetch(
          `https://api.themoviedb.org/3/tv/${params.id}/season/${season.season_number}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
        ).then((res) => res.json());
        return seasonInfo;
      })
    );

    media.credits = credits;
    media.images = images;
    media.videos = videos;
    media.seasonsInfo = seasonsInfo;

    return new Response(JSON.stringify(media), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};
