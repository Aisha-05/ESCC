import Image from "next/image";

type RecentEventProps = {
    image: string;
    title: string;
    date: string;
};

export default function RecentEvent({ image, title, date }: RecentEventProps) {
    return (
        <div className="home-recent-card relative rounded-xl overflow-hidden md:aspect-video aspect-[4/3] lg:w-[50vw] w-[90vw]">
            <Image
                src={image}
                alt=""
                fill
                className="rounded-xl object-cover"
            />
            <div className="bg-gradient-to-b from-transparent via-transparent/60 md:via-transparent/40 to-[#00C9FF] absolute inset-0"></div>

            <div className="absolute bottom-0 center col w-full pb-2 md:py-4 font-lexend md:gap-4">
                <h3 className="font-bold text-3xl lg:text-6xl text-center" style={{ textShadow: '2px 2px 8px rgba(0, 0, 0, 0.2)' }}>{title}</h3>
                <p className="font-bold text-xs text-tertiary-light lg:text-2xl text-center" style={{ textShadow: '2px 2px 8px rgba(0, 0, 0, 0.2)' }}>{date}</p>
            </div>

        </div>
    );
};
