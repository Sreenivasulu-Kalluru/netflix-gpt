const VideoTitle = ({ title, overview }) => {
  return (
    <div className="absolute w-screen px-12 text-white aspect-video bg-gradient-to-r from-black pt-[15%] ">
      <h1 className="text-6xl font-bold">{title}</h1>
      <p className="w-1/4 py-6 text-lg">{overview}</p>
      <div className="flex flex-wrap gap-2">
        <button className="px-12 py-4 text-xl font-medium text-black bg-white rounded-md hover:bg-opacity-80 transition-all duration-[.2s]">
          ▶️ Play
        </button>
        <button className="px-12 py-4 text-xl font-medium text-white bg-gray-500 rounded-md hover:bg-opacity-80 transition-all duration-[.2s]">
          ℹ️ More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
