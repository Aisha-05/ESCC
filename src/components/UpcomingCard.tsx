import Image from "next/image";

import { Button } from "@/components/ui/button";

export default function UpcomingCard({ image, title, date, description, show, open }: { image?: string, title?: string, date?: string, description?: string, show?: boolean, open?: boolean }) {
    return (
        <div className="home-upcoming-card snap-center shrink-0 relative aspect-[3/4] rounded-xl shadow-lg w-100 md:w-80 z-30 overflow-hidden flex flex-col bg-white/10 md:hover:scale-102 hover:shadow-lg transition-all md:hover:-translate-y-1">

            {
                show && (
                    <div className="bg-white full relative">
                        <Image src={image || "/images/event1.jpg"} alt={title || "Event Image"} width={400} height={300} className="object-cover w-full h-48" />

                        <div className="flex-grow p-4 flex flex-col justify-between md:gap-2 gap-4">

                            <h3 className="md:text-2xl text-3xl font-bold">{title || "Event Title"}</h3>

                            <p className="text-gray-800 text-xl md:text-md font-medium px-1 p-4 md:p-0 md:line-clamp-2 min-h-[3rem]">{description || "This is a brief description of the upcoming event. It provides an overview of what to expect."}</p>

                            <p className="text-gray-600 mb-4 text-sm flex items-center">
                                <Image src="/svg/misc/calendar.svg" alt="Calendar Icon" width={16} height={16} className="inline mr-2" />
                                {date || "Event Date"}</p>


                            <Button
                                variant="card_white"
                                className="absolute bottom-4 left-4 flex !h-7 !min-h-0 !w-fit !min-w-0 justify-center gap-1 !rounded-md !px-2 !py-0 font-lexend text-[11px] leading-none"
                                disabled={!open}
                            >
                                {open ? "Register!" : "Soon.."}
                                {open && (
                                    <Image src="/svg/misc/button-arrows.svg" alt="" width={16} height={16} />
                                )}
                            </Button>

                        </div>
                    </div>
                )}

        </div>
    );
};
