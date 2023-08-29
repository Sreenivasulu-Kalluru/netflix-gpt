import MovieCard from './MovieCard';

const MovieList = ({ title, movies }) => {
  // console.log(movies);
  return (
    <div className="px-6 bg-transparent">
      <h1 className="py-4 text-3xl text-white">{title}</h1>
      <div className="flex overflow-x-scroll">
        <div className="flex gap-4">
          {movies?.map((movie) => (
            <MovieCard key={movie.id} posterPath={movie.poster_path} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
