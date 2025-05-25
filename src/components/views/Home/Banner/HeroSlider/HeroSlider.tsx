import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Anime } from "@/types/Anime";
import { Button } from "@heroui/react";
import { cn } from "@/utils/cn";
import useRenderStars from "../../useRenderingStarts";
import Link from "next/link";



interface HeroSliderProps {
  dataBanner: Anime[];
  renderStars?: number;
}

const HeroSlider = ({ dataBanner }: HeroSliderProps) => {
  const [active, setActive] = useState(0);
  const thumbRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [showTrailer, setShowTrailer] = useState(false);
  const {renderStars} = useRenderStars()

  useEffect(() => {
    if (dataBanner.length > 0) setActive(0);
  }, [dataBanner]);

  // Scroll ke thumbnail aktif setiap active berubah
  useEffect(() => {
    if (itemRefs.current[active] && thumbRef.current) {
      const container = thumbRef.current;
      const item = itemRefs.current[active];

      const containerRect = container.getBoundingClientRect();
      const itemRect = item.getBoundingClientRect();

      const scrollLeft =
        container.scrollLeft + (itemRect.left - containerRect.left);

      container.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  }, [active]);

  const prev = () => {
    setActive((prev) => (prev === 0 ? dataBanner.length - 1 : prev - 1));
  };

  const next = () => {
    setActive((prev) => (prev + 1) % dataBanner.length);
  };

  if (dataBanner.length === 0) {
    return (
      <section className="relative w-full h-[70vh] flex items-center justify-center">
        <p className="text-white text-lg">Memuat banner...</p>
      </section>
    );
  }

  const activeAnime = dataBanner[active];
  const backgroundImage = activeAnime?.images?.jpg?.large_image_url;

  return (
    <>
      <section className="relative w-full h-[100vh] overflow-hidden -mt-[6.5rem]">
        {/* Background */}
        <AnimatePresence mode="wait">
          {backgroundImage && (
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 z-0"
            >
              <Image
                src={backgroundImage}
                alt={activeAnime?.title || "Image"}
                fill
                className="object-cover"
                priority
                quality={100}
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Card Content */}
        <div className="absolute bottom-24 left-8 right-8 z-10 max-w-xl text-white">
          <motion.h2
            key={activeAnime?.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-5xl font-bold"
          >
            {activeAnime?.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-5 text-sm md:text-base text-white/80 line-clamp-5"
          >
            {activeAnime?.synopsis || "Deskripsi tidak tersedia."}
          </motion.p>
          <div className="flex gap-4 mt-2 items-center">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-sm md:text-base flex items-center gap-1 text-white/80 border-r border-gray-200 pr-4"
            >
              {renderStars(activeAnime?.score) || "score tidak tersedia."}
              <span className="font-semibold">
                {activeAnime?.score || "score tidak tersedia."}
              </span>
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className={cn("text-sm text-white/80 p-2 rounded-md ", {
                "bg-green-600": activeAnime?.status === "Currently Airing",
                "bg-red-500": activeAnime?.status === "Finished Airing",
                "bg-yellow-600": activeAnime?.status === "Not yet aired",
              })}
            >
              {activeAnime?.status || "status tidak tersedia."}
            </motion.p>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-sm mt-2 md:text-base flex items-center gap-1 text-white/80"
          >
            {activeAnime?.genres.map((genre) => (
              <span
                key={genre.mal_id}
                className="px-2 py-1 bg-slate-700 text-white rounded text-xs"
              >
                {genre.name}
              </span>
            )) || "Genre tidak tersedia."}
          </motion.p>

          <div className="flex gap-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-4"
            >
              <Button as={Link} href={`list-anime/anime/${activeAnime.mal_id}`} color="primary" radius="sm">
                Lihat Detail
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-4"
            >
              <Button
                onPress={() => setShowTrailer(true)}
                className="bg-red-600 font-semibold text-white"
                radius="sm"
              >
                Trailer
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Card-style Thumbnails Carousel */}
        <div className="absolute bottom-16 w-[50%] right-0 px-6 z-10">
          <div className="relative">
            <div
              ref={thumbRef}
              className="hidden md:flex overflow-x-scroll scroll-smooth snap-x snap-mandatory scrollbar-hide gap-4 py-3 px-1"
              style={{ scrollSnapType: "x mandatory" }}
            >
              {dataBanner.map((anime, i) => {
                const image = anime.images?.webp?.large_image_url;
                const title = anime.title;
                const location = anime.source || "Unknown";

                return (
                  <div
                    key={i}
                    ref={(el) => {
                      itemRefs.current[i] = el;
                    }}
                    onClick={() => setActive(i)}
                    className={`snap-start flex-shrink-0 basis-[25%] max-w-[25%] bg-white/10 p-2 rounded-xl overflow-hidden shadow-md cursor-pointer border transition ${
                      i === active
                        ? "border-white"
                        : "border-transparent opacity-70"
                    }`}
                  >
                    <div className="relative h-[200px] w-full">
                      {image && (
                        <Image
                          src={image}
                          alt={title}
                          fill
                          className="object-cover rounded-xl"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                    <div className="p-2 text-white text-sm">
                      <p className="text-xs opacity-60 line-clamp-1">
                        {location}
                      </p>
                      <p className="font-semibold line-clamp-2">{title}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Arrow Controls */}
            <div className="flex absolute -bottom-10 right-4 gap-2">
              <Button isIconOnly size="sm" variant="light" onPress={prev}>
                <ChevronLeft className="text-white w-5 h-5" />
              </Button>
              <Button isIconOnly size="sm" variant="light" onPress={next}>
                <ChevronRight className="text-white w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>
      {showTrailer && (
        <div className="fixed inset-0 z-[999] bg-black bg-opacity-70 flex items-center justify-center  backdrop-blur-sm">
          <div className="bg-transparent p-4 rounded-lg shadow-lg w-full max-w-2xl relative">
            {/* Tombol Close */}
            <button
              className="absolute w-6 h-6 text-[20px] font-bold -top-5 flex items-center justify-center rounded-full bg-white right-0 text-red-500 hover:text-red-500 leading-none"
              onClick={() => setShowTrailer(false)}
            >
              <span className="-mt-[1px]">&times;</span>
            </button>

            {/* Embed Video */}
            <div className="aspect-video">
              <iframe
                className="w-full h-full rounded-md"
                src={activeAnime?.trailer?.embed_url}
                title="Trailer"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HeroSlider;
