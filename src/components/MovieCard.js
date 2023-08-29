import { IMG_CDN_URL } from '../utils/constants';

const MovieCard = ({ posterPath }) => {
  return (
    <div className="w-48 hover:scale-125 transition-all duration-[.2s]">
      <img
        className="rounded-md"
        src={IMG_CDN_URL + posterPath}
        alt="Movie Card"
      />
    </div>
  );
};

export default MovieCard;
