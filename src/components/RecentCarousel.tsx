"use client";

import React from "react";
import RecentEvent from "@/components/RecentEvent";
import { recentEvents } from "@/data/events";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "@/components/ui/carousel";
import CarousalNavigation from "@/components/auth/CarousalNavigation";

export default function RecentCarousel() {

    const [api, setApi] = React.useState<CarouselApi>();
    const [current, setCurrent] = React.useState(0);
    const [count, setCount] = React.useState(0);

    React.useEffect(() => {
        if (!api) {
            return;
        }

        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap());

        const onSelect = () => {
            setCurrent(api.selectedScrollSnap());
        };

        api.on("select", onSelect);

        return () => {
            api.off("select", onSelect);
        };
    }, [api]);

    const scrollPrev = React.useCallback(() => {
        api?.scrollPrev();
    }, [api]);

    const scrollNext = React.useCallback(() => {
        api?.scrollNext();
    }, [api]);

    const scrollTo = React.useCallback(
        (index: number) => {
            api?.scrollTo(index);
        },
        [api],
    );

    return (
        <div className="relative w-full max-w-9xl mx-auto py-12 z-30">

            <Carousel className="center mb-8 md:mb-4" opts={{ align: "center", loop: true }} setApi={setApi}>
                <CarouselContent>
                    {recentEvents.map((event, index) => (
                        <CarouselItem key={index}>
                            <RecentEvent image={event.image} title={event.title} date={event.date} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>

            {/* Navigation Controls */}
            <CarousalNavigation
                scrollPrev={scrollPrev}
                scrollNext={scrollNext}
                scrollTo={scrollTo}
                current={current}
                count={count}
                hideArrowsOnMobile
            />

        </div>
    );
}