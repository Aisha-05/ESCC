"use client";

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

import { upcomingEvents } from "@/data/upcoming";
import { useCarouselScale } from "@/hooks/useCarouselScale";

import UpcomingCard from "@/components/UpcomingCard";

export default function UpcomingCarousel() {
    const filteredEvents = upcomingEvents.filter((event) => event.show);
    const { api, setApi, scaleValues } = useCarouselScale();

    return (
        <Carousel
            setApi={setApi}
            opts={{
                align: "center",
                loop: true,
            }}
            className="w-full max-w-6xl z-20 md:hidden overflow-visible"
        >
            <CarouselContent className="-ml-4">
                {filteredEvents.map((event, index) => (
                    <CarouselItem
                        key={index}
                        className="pl-4 md:basis-1/2 lg:basis-1/3 overflow-visible"
                    >
                        <div
                            className="p-1 transition-transform duration-300 ease-out overflow-visible"
                            style={{
                                transform: `scale(${scaleValues[index] || 0.75})`,
                            }}
                        >
                            <UpcomingCard
                                show={event.show}
                                open={event.open}
                                image={event.image}
                                title={event.title}
                                date={event.date}
                                description={event.description}
                            />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <button
                onClick={() => api?.scrollPrev()}
                disabled={filteredEvents.length <= 1}
                className={`hidden md:block absolute top-1/2 -translate-y-1/2 left-4 bg-transparent border-none ${
                    filteredEvents.length <= 1
                        ? "opacity-50 cursor-not-allowed"
                        : "click"
                }`}
            >
            </button>
            <button
                onClick={() => api?.scrollNext()}
                disabled={filteredEvents.length <= 1}
                className={`hidden md:block absolute top-1/2 -translate-y-1/2 right-4 bg-transparent border-none ${
                    filteredEvents.length <= 1
                        ? "opacity-50 cursor-not-allowed"
                        : "click"
                }`}
            >
            </button>
        </Carousel>
    );
}
