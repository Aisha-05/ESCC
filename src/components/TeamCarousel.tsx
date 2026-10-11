"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { managers } from "@/data/managers";
import { useCarouselScale } from "@/hooks/useCarouselScale";
import TeamCard from "@/components/TeamCard";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function TeamCarousel() {
  const { api, setApi, scaleValues } = useCarouselScale();

  return (
    <Carousel
      setApi={setApi}
      opts={{
        align: "center",
        loop: true,
      }}
      className="w-full max-w-6xl"
    >
      <CarouselContent className="-ml-4">
        {managers.map((manager, index) => (
          <CarouselItem
            key={index}
            className="pl-4 md:basis-1/2 lg:basis-1/3"
          >
            <div
              className="p-1 transition-transform duration-300 ease-out"
              style={{
                transform: `scale(${scaleValues[index] || 0.75})`,
              }}
            >
              <TeamCard
                name={manager.name}
                title={manager.title}
                image={manager.image}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="home-team-controls mt-6 hidden justify-center gap-4 lg:flex">
        <button type="button" aria-label="Previous team member" onClick={() => api?.scrollPrev()} className="flex size-[44px] items-center justify-center rounded-full border border-cyan-500 text-primary">
          <ArrowLeft size={20} />
        </button>
        <button type="button" aria-label="Next team member" onClick={() => api?.scrollNext()} className="flex size-[44px] items-center justify-center rounded-full border border-cyan-500 text-primary">
          <ArrowRight size={20} />
        </button>
      </div>
    </Carousel>
  );
}
