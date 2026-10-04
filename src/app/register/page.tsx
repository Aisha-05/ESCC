"use client";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import CarousalNavigation from "@/components/auth/CarousalNavigation";

import BecomeMember from "@/sections/BecomeMember";
import MotivationSection from "@/sections/MotivationSection";
import DepartmentSelection from "@/sections/DepartmentSelection";
import SubmitSection from "@/sections/SubmitSection";
import ThankYou from "@/sections/ThankYou";
import { useRegister } from "@/hooks/useRegister";
import { motion } from "motion/react";

export default function RegisterPage() {
    const {
        isRegistered,
        allowed,
        currPage,
        setCarouselApi,
        mainData,
        setMainData,
        departmentData,
        setDepartmentData,
        motivationData,
        setMotivationData,
        scrollPrev,
        scrollNext,
        scrollTo,
        disablePrev,
        disableNext,
        canSubmit,
        isSubmitting,
        submissionError,
        hasApplied,
        handleSubmit,
    } = useRegister();

    return (
        <motion.main
            layoutRoot
            className="relative bg-primary/10 md:h-screen w-screen h-full md:py-12 center col"
        >
            {isRegistered === null ? null : isRegistered ? (
                <ThankYou />
            ) : (
                <motion.div
                    layout
                    transition={{ duration: 0.1, ease: "easeInOut" }}
                    className={`relative bg-white z-10 md:rounded-xl md:w-max md:h-max h-screen w-screen ${isRegistered ? " center" : ""}`}
                >

                    <motion.div
                        layout
                        transition={{ duration: 0.1, ease: "easeInOut" }}
                        className="z-1 md:p-8 pt-8 rounded-xl center col gap-8 h-screen w-screen md:h-max md:w-auto"
                    >
                        <Carousel
                            className="center max-w-screen md:max-h-160 md:max-w-2xl max-h-screen overflow-y-auto"
                            opts={{ align: "center", loop: false }}
                            setApi={setCarouselApi}
                        >
                            <CarouselContent>
                                {allowed.map((step) => (
                                    <CarouselItem key={step} className="center items-start">
                                        {step === "main" && <BecomeMember setMainData={setMainData} />}
                                        {step === "departments" && (
                                            <DepartmentSelection setDepartmentData={setDepartmentData} />
                                        )}
                                        {step === "motivations" && (
                                            <MotivationSection setMotivationData={setMotivationData} />
                                        )}
                                        {step === "submit" && (
                                            <SubmitSection
                                                mainData={mainData}
                                                departmentData={departmentData}
                                                motivationData={motivationData}
                                                onSubmit={() => {
                                                    void handleSubmit();
                                                }}
                                                canSubmit={canSubmit}
                                                isSubmitting={isSubmitting}
                                                submissionError={submissionError}
                                                hasApplied={hasApplied}
                                            />
                                        )}
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </Carousel>

                        <CarousalNavigation
                            scrollPrev={scrollPrev}
                            scrollNext={scrollNext}
                            scrollTo={scrollTo}
                            current={currPage}
                            count={allowed.length}
                            disablePrev={disablePrev}
                            disableNext={disableNext}
                        />
                    </motion.div>
                </motion.div>
            )}
        </motion.main>
    );
}
