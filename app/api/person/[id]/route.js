export const GET = async (request, { params }) => {
  try {
    const person = await fetch(
      `https://api.themoviedb.org/3/person/${params.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    ).then((res) => res.json());

    const images = await fetch(
      `https://api.themoviedb.org/3/person/${params.id}/images?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    ).then((res) => res.json());

    const movies = await fetch(
      `https://api.themoviedb.org/3/person/${params.id}/movie_credits?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    ).then((res) => res.json());

    movies.cast.sort((a, b) => b.popularity - a.popularity);

    person.images = images;
    person.movies = movies;

    return new Response(JSON.stringify(person), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};
