import { useState, useEffect, useMemo } from "react";

import { motion } from "motion/react";

import InputSelect from "@/components/auth/InputSelect";
import type { DepartmentPreferences } from "@/types/registration";

const departmentsList = [
    "External Relations",
    "Design",
    "Marketing & Content",
    "Multimedia",
    "Production & Video",
    "Planning",
    "Logistics",
    "HR",
    "Technical Development",
    "Sports",
    "Culture",
];

export default function DepartmentSelection({
    setDepartmentData,
}: {
    setDepartmentData?: (data: DepartmentPreferences) => void;
}) {
    const [department1, setDepartment1] = useState("");
    const [department2, setDepartment2] = useState("");
    const [department3, setDepartment3] = useState("");

    // InputSelect expects options in the shape { title: string; value: string }
    const departmentOptions = useMemo(
        () => departmentsList.map((d) => ({ title: d, value: d })),
        []
    );

    const department1Options = useMemo(
        () =>
            departmentOptions.filter(
                (option) =>
                    option.value === department1 ||
                    (option.value !== department2 && option.value !== department3)
            ),
        [department1, department2, department3, departmentOptions]
    );

    const department2Options = useMemo(
        () =>
            departmentOptions.filter(
                (option) =>
                    option.value === department2 ||
                    (option.value !== department1 && option.value !== department3)
            ),
        [departmentOptions, department1, department2, department3]
    );

    const department3Options = useMemo(
        () =>
            departmentOptions.filter(
                (option) =>
                    option.value === department3 ||
                    (option.value !== department1 && option.value !== department2)
            ),
        [departmentOptions, department1, department2, department3]
    );

    useEffect(() => {
        if (department1 && department1 === department2) {
            setDepartment2("");
        }

        if (department1 && department1 === department3) {
            setDepartment3("");
        }

        if (department2 && department2 === department3) {
            setDepartment3("");
        }
    }, [department1, department2, department3]);

    useEffect(() => {
        setDepartmentData?.({ department1, department2, department3 });
    }, [department1, department2, department3, setDepartmentData]);


    return (
        <motion.section
            layout
            transition={{ duration: 0.1, ease: "easeInOut" }}
            className="bg-white h-max z-10 flex flex-col items-center w-[70vw] "
        >

            <h3 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-green-400 text-center mb-8">
                Department Selection
            </h3>

            <div className="flex flex-col gap-4 w-full max-w-md">

                <InputSelect
                    value={department1}
                    onChange={(e) => setDepartment1(e.target.value)}
                    options={department1Options}
                    placeholder="Select your first choice"
                />
                <InputSelect
                    value={department2}
                    onChange={(e) => setDepartment2(e.target.value)}
                    options={department2Options}
                    placeholder="Select your second choice"
                />
                <InputSelect
                    value={department3}
                    onChange={(e) => setDepartment3(e.target.value)}
                    options={department3Options}
                    placeholder="Select your third choice"
                />

            </div>


        </motion.section>
    );
}
