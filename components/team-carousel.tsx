"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { MemberCard } from "@/components/member-card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Member {
  id: number;
  name: string;
  role: string;
  image: string;
  skills: string[];
}

interface TeamCarouselProps {
  members: Member[];
}

export function TeamCarousel({ members }: TeamCarouselProps) {
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [autoplayActive, setAutoplayActive] = useState(true);
  const autoplayDelay = 6500; // 6.5 segundos

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true, // Habilitar loop para permitir voltar ao início
    skipSnaps: false,
    dragFree: true,
  });

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [slidesInView, setSlidesInView] = useState<number[]>([]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const toggleAutoplay = useCallback(() => {
    setAutoplayActive((prev) => !prev);
  }, []);

  const startAutoplay = useCallback(() => {
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);

    autoplayIntervalRef.current = setInterval(() => {
      if (emblaApi) emblaApi.scrollNext();
    }, autoplayDelay);
  }, [emblaApi, autoplayDelay]);

  const stopAutoplay = useCallback(() => {
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current);
      autoplayIntervalRef.current = null;
    }
  }, []);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
    setActiveIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  const findSlidesInView = useCallback(() => {
    if (!emblaApi) return;
    setSlidesInView(emblaApi.slidesInView(true));
  }, [emblaApi]);

  // Gerenciar autoplay
  useEffect(() => {
    if (autoplayActive) {
      startAutoplay();
    } else {
      stopAutoplay();
    }

    return () => {
      stopAutoplay();
    };
  }, [autoplayActive, startAutoplay, stopAutoplay]);

  // Pausar autoplay durante interação do usuário
  const onPointerDown = useCallback(() => {
    stopAutoplay();
  }, [stopAutoplay]);

  const onPointerUp = useCallback(() => {
    if (autoplayActive) {
      startAutoplay();
    }
  }, [autoplayActive, startAutoplay]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    findSlidesInView();

    emblaApi.on("select", onSelect);
    emblaApi.on("scroll", findSlidesInView);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("reInit", findSlidesInView);

    emblaApi.on("pointerDown", onPointerDown);
    emblaApi.on("pointerUp", onPointerUp);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("scroll", findSlidesInView);
      emblaApi.off("reInit", onSelect);
      emblaApi.off("reInit", findSlidesInView);

      emblaApi.off("pointerDown", onPointerDown);
      emblaApi.off("pointerUp", onPointerUp);
    };
  }, [emblaApi, onSelect, findSlidesInView, onPointerDown, onPointerUp]);

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-lg" ref={emblaRef}>
        <div className="flex">
          {members.map((member, index) => (
            <div
              key={member.id}
              className="flex-[0_0_100%] min-w-0 pl-4 sm:flex-[0_0_50%] md:flex-[0_0_33.33%] lg:flex-[0_0_25%]"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: slidesInView.includes(index) ? 1 : 0.5,
                  y: slidesInView.includes(index) ? 0 : 10,
                  scale: slidesInView.includes(index) ? 1 : 0.95,
                }}
                transition={{ duration: 0.5 }}
                className="h-full"
              >
                <MemberCard member={member} />
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-center gap-4">
        <Button
          onClick={scrollPrev}
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-full transition-transform hover:scale-110"
          aria-label="Anterior"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        <div className="flex items-center gap-2">
          {members.map((_, index) => (
            <motion.button
              key={index}
              className={`h-2 rounded-full transition-all ${
                activeIndex === index
                  ? "bg-blue-500 w-6"
                  : "bg-zinc-300 w-2 dark:bg-zinc-600 hover:bg-zinc-400 dark:hover:bg-zinc-500"
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Ir para slide ${index + 1}`}
              onClick={() => scrollTo(index)}
            />
          ))}
        </div>

        <Button
          onClick={scrollNext}
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-full transition-transform hover:scale-110"
          aria-label="Próximo"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>

        <Button
          onClick={toggleAutoplay}
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-full ml-2 transition-transform hover:scale-110"
          aria-label={
            autoplayActive
              ? "Pausar apresentação automática"
              : "Iniciar apresentação automática"
          }
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={autoplayActive ? "pause" : "play"}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
            >
              {autoplayActive ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </motion.div>
          </AnimatePresence>
        </Button>
      </div>
    </div>
  );
}
