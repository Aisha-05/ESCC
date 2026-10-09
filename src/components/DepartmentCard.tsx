"use client";

import Image from "next/image";
import { useState } from "react";
import { ClipboardList, Handshake, Truck, type LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function DepartmentCard({ 
    title, 
    description, 
    image,
    icon,
}: { 
    title?: string, 
    description?: string, 
    image?: string,
    icon?: "handshake" | "planning" | "logistics",
}) {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleClick = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div 
            className={`group relative mx-auto h-[190px] w-full max-w-[285px] min-w-0 rounded-2xl transition-all duration-500 [transform-style:preserve-3d] md:h-[215px] md:max-w-[300px] ${isFlipped ? '[transform:rotateY(180deg)]' : ''} hover:scale-[1.02] hover:-translate-y-1`}
        >
            
            {/* Front of the card */}
            <div className="footer-brand-card absolute inset-0 flex h-full w-full flex-col items-center justify-center rounded-2xl p-4 [backface-visibility:hidden]">

                {icon ? (
                    <DepartmentLucideIcon icon={icon} title={title} />
                ) : (
                    <Image
                        src={image || "/images/event1.jpg"}
                        alt={title || "Department Image"}
                        width={100}
                        height={100}
                        className="h-16 w-16 rounded-xl object-contain md:h-20 md:w-20"
                    />
                )}

                <h4 className="mt-4 w-full truncate px-2 text-center text-xl font-bold text-white md:text-2xl">{title}</h4>

                <div className="flex items-center justify-center">
                    <Button variant="card_blue" className="footer-brand-card-button mt-4 flex w-36 justify-between gap-2 font-lexend text-base" onClick={handleClick}>
                        Discover
                        <Image src="/svg/misc/button-arrows-white.svg" alt="" width={16} height={16} />
                    </Button>
                </div>
            </div>

            {/* Back of the card */}
            <div className="footer-brand-card absolute inset-0 flex h-full w-full flex-col items-center justify-center rounded-2xl p-5 text-white shadow-2xl shadow-blue-500/50 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                <div className="flex items-start gap-2 mb-4">
                    <p className="line-clamp-4 min-h-[5.5rem] max-w-[18rem] px-2 text-center text-sm italic leading-[1.35rem] md:min-h-[5.75rem] md:text-base">
                        {description || "No description available."}
                    </p>
                </div>
                <div className="flex items-center justify-center">
                    <Button variant="card_blue" className="footer-brand-card-button mt-4 flex w-36 justify-between gap-2 font-lexend text-base" onClick={handleClick}>
                        Go Back
                        <Image src="/svg/misc/button-arrows-white.svg" alt="" width={16} height={16} />
                    </Button>
                </div>
            </div>
        </div>
    );
};

function DepartmentLucideIcon({
    icon,
    title,
}: {
    icon: "handshake" | "planning" | "logistics";
    title?: string;
}) {
    const icons: Record<typeof icon, LucideIcon> = {
        handshake: Handshake,
        planning: ClipboardList,
        logistics: Truck,
    };
    const Icon = icons[icon];
    const gradientId = `department-gradient-${title?.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

    return (
        <Icon
            aria-label={title || "Department icon"}
            role="img"
            size={92}
            stroke={`url(#${gradientId})`}
            strokeWidth={1.5}
            className="h-16 w-16 md:h-20 md:w-20"
        >
            <defs>
                <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00C9FF" />
                    <stop offset="100%" stopColor="#92FE9D" />
                </linearGradient>
            </defs>
        </Icon>
    );
}