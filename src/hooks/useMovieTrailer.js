import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTrailerVideo } from '../utils/moviesSlice';
import { API_OPTIONS } from '../utils/constants';

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();

  const trailerVideo = useSelector((store) => store.movies.trailerVideo);

  // * fetch trailer video && updating the store with trailer video data
  const getMovieVideos = async () => {
    const data = await fetch(
      'https://api.themoviedb.org/3/movie/' +
        movieId +
        '/videos?language=en-US',
      API_OPTIONS
    );
    const json = await data.json();
    // console.log(json);

    const filteredVideos = json.results.filter(
      (video) => video.type === 'Trailer'
    );
    const trailer = filteredVideos.length ? filteredVideos[0] : json.results[0];
    // console.log(trailer);
    dispatch(addTrailerVideo(trailer));
  };

  useEffect(() => {
    !trailerVideo && getMovieVideos();
  }, []);
};

export default useMovieTrailer;
