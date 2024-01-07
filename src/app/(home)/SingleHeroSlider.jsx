const SingleHeroSlider = ({ items = {} }) => {
  const { id, bg, title } = items;

  const overlayColor = "bg-black"; // Change this to the desired color

  return (
    <div
      className={`hero h-96 min-h-screen relative flex flex-col justify-start`}
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className={`hero-overlay bg-opacity-60 ${overlayColor} absolute inset-0`}></div>
      <div className="hero-content text-center text-neutral-content relative z-10">
        <div className="max-w-md mx-auto mt-10">
          <h1 className="text-3xl lg:text-5xl text-orange-500 font-bold">
            {title}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default SingleHeroSlider;