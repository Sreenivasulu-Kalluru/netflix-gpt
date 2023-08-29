import { useSelector } from 'react-redux';
import lang from '../utils/languageConstants';

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);

  return (
    <div className="pt-[10%] flex justify-center">
      <form className="grid w-1/2 grid-cols-12 bg-black rounded-md">
        <input
          type="text"
          className="col-span-8 p-4 m-4 rounded-md focus:outline-none border-b-2 transition-all duration-[.2s] border-transparent focus:border-b-2  focus:border-[#e50914]"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button className="py-2 px-4 text-white m-4 rounded-md bg-[#e50914] hover:bg-[#d6180b] transition-all duration-[.2s] col-span-4 font-medium">
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
