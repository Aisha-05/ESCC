"use client";

import Image from "next/image";
import { Float } from "@/utils/animate";
import { useState, useEffect } from "react";

export default function AboutUsCards() {
  const [imageSize, setImageSize] = useState({ width: 400, height: 400 });

  useEffect(() => {
    const updateSize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth >= 1024) {
        setImageSize({ width: 400, height: 400 });
      } else if (screenWidth >= 768) {
        setImageSize({ width: 300, height: 300 });
      } else if (screenWidth >= 500) {
        setImageSize({ width: 200, height: 200 });
      } else {
        setImageSize({ width: 150, height: 150 });
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div className="relative mx-auto grid w-full max-w-[28rem] grid-cols-2 items-center gap-4 pt-4 md:block md:h-[28rem] md:max-w-[32rem]">
      <Float delay={0} speed={6} className="relative z-3 md:absolute md:bottom-0 md:left-0">
        <Image src="/image/misc/card1.svg" alt="About Us Image" width={imageSize.width} height={imageSize.height} className="w-full rounded-xl object-contain md:w-auto" />
      </Float>
      <Float delay={1} speed={6} className="relative z-2 md:absolute md:right-0 md:top-0">
        <Image src="/image/misc/card2.svg" alt="About Us Image" width={imageSize.width} height={imageSize.height} className="w-full rounded-xl object-contain md:w-auto" />
      </Float>
      <Float delay={2} speed={6} className="relative z-1 col-span-2 mx-auto w-1/2 md:absolute md:left-0 md:top-16 md:w-auto">
        <Image src="/image/misc/card3.svg" alt="About Us Image" width={imageSize.width} height={imageSize.height} className="w-full rounded-xl object-contain md:w-auto" />
      </Float>
    </div>
  );
}
