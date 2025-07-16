import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import { fetchTrendingAll } from "../services/tmdb";
import { useMedia } from "../context/MediaContext";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const HeroPosterCarousel = () => {
  const [slides, setSlides] = useState([]);
  const { genres } = useMedia();
  const navigate = useNavigate();
  const sliderRef = useRef(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchTrendingAll();
        const filtered = data
          .filter(
            (item) =>
              item.poster_path &&
              (item.media_type === "movie" || item.media_type === "tv")
          )
          .slice(0, 10);
        setSlides(filtered);
      } catch (err) {
        console.error("Carousel error:", err.message);
      }
    };
    load();
  }, []);

  const settings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3500,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    dotsClass: "slick-dots custom-dots",
    appendDots: (dots) => (
      <div className="mt-16">
        <ul className="flex justify-center gap-2">{dots}</ul>
      </div>
    ),
    customPaging: () => (
      <div className="w-2 h-2 rounded-full bg-gray-500 opacity-50 transition-all duration-300" />
    ),
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1.5 } },
      { breakpoint: 500, settings: { slidesToShow: 1 } },
    ],
  };

  const getGenres = (ids = []) =>
    ids
      .map((id) => genres.find((g) => g.id === id)?.name)
      .filter(Boolean)
      .slice(0, 2);

  return (
    <div className="relative px-6 pt-8 pb-16">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-black mb-6 text-center sm:text-left">
        Top 10 of the Day
      </h2>
      <button
        onClick={() => sliderRef.current?.slickPrev()}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full shadow"
      >
        <FaChevronLeft />
      </button>

      <button
        onClick={() => sliderRef.current?.slickNext()}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full shadow"
      >
        <FaChevronRight />
      </button>

      <Slider ref={sliderRef} {...settings}>
        {slides.map((item, i) => {
          const isTV = item.media_type === "tv" || item.first_air_date;
          const path = isTV ? `/tv/${item.id}` : `/movie/${item.id}`;
          const genreNames = getGenres(item.genre_ids);

          return (
            <div
              key={`${item.media_type}-${item.id}`}
              onClick={() => navigate(path)}
              className="px-3 group cursor-pointer"
            >
              <div className="relative">
                <img
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  alt={item.title || item.name}
                  className="rounded-xl w-full h-[580px] object-cover shadow-lg group-hover:brightness-75 transition duration-300"
                />

                {/* Ribbon */}
                <div className="absolute top-3 left-3 bg-red-600 text-white text-sm px-2 py-0.5 rounded shadow-md font-semibold">
                  #{i + 1}
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4 rounded-xl">
                  <p className="text-white text-base font-semibold line-clamp-2">
                    {item.title || item.name}
                  </p>
                  <p className="text-sm text-gray-300 line-clamp-2 mt-1">
                    {item.overview}
                  </p>
                  <div className="flex gap-2 mt-2 text-xs text-white">
                    {item.vote_average && (
                      <span className="bg-cyan-600 px-2 py-0.5 rounded-full text-[11px]">
                        ⭐ {item.vote_average.toFixed(1)}
                      </span>
                    )}
                    {genreNames.map((g) => (
                      <span
                        key={g}
                        className="bg-gray-700 px-2 py-0.5 rounded-full text-[11px]"
                      >
                        {g}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>

      <style>{`
        .custom-dots li.slick-active div {
          background-color: #f50101;
          opacity: 1;
          transform: scale(1.25);
        }
      `}</style>
    </div>
  );
};

export default HeroPosterCarousel;
