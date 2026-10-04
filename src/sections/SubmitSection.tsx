import React, { useMemo, useState } from 'react';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { Button } from '@/components/ui/button';
import { motion } from "motion/react";
import type {
    DepartmentPreferences,
    MainFormData,
    MotivationFormData,
} from "@/types/registration";
import {
    verifyDepartment,
    verifyEmail,
    verifyExpectations,
    verifyExperience,
    verifyFirstName,
    verifyLastName,
    verifyPhone,
    verifySchool,
    verifyWork,
    verifyYear,
} from "@/utils/verify";

interface SubmitSectionProps {
    mainData: MainFormData;
    departmentData: DepartmentPreferences;
    motivationData: MotivationFormData;
    onSubmit: () => void;
    canSubmit: boolean;
    isSubmitting: boolean;
    submissionError: string | null;
    hasApplied: boolean;
}

const SubmitSection: React.FC<SubmitSectionProps> = ({
    mainData,
    departmentData,
    motivationData,
    onSubmit,
    canSubmit,
    isSubmitting,
    submissionError,
    hasApplied,
}) => {
    const [mainOpen, setMainOpen] = useState(false);
    const [deptOpen, setDeptOpen] = useState(false);
    const [motivOpen, setMotivOpen] = useState(false);
    const mainValidity = useMemo(
        () => ({
            firstName: verifyFirstName(mainData.firstName),
            lastName: verifyLastName(mainData.lastName),
            email: verifyEmail(mainData.email),
            phone: verifyPhone(mainData.phone),
            school: verifySchool(mainData.school),
            year: verifyYear(mainData.year),
        }),
        [mainData]
    );

    const departmentsValidity = useMemo(() => {
        const selections = [
            departmentData.department1,
            departmentData.department2,
            departmentData.department3,
        ];
        const allValid = selections.every((dept) => verifyDepartment(dept));
        const unique = new Set(selections).size === selections.length;
        return {
            allValid: allValid && unique,
            unique,
        };
    }, [departmentData]);

    const motivationsValidity = useMemo(
        () => ({
            choice1: {
                work: motivationData.choice1.work ? verifyWork(motivationData.choice1.work) : true,
                experience: motivationData.choice1.experience
                    ? verifyExperience(motivationData.choice1.experience)
                    : true,
                expectations: verifyExpectations(motivationData.choice1.expectations),
            },
            choice2: {
                work: motivationData.choice2.work ? verifyWork(motivationData.choice2.work) : true,
                experience: motivationData.choice2.experience
                    ? verifyExperience(motivationData.choice2.experience)
                    : true,
                expectations: motivationData.choice2.expectations
                    ? verifyExpectations(motivationData.choice2.expectations)
                    : true,
            },
            choice3: {
                work: motivationData.choice3.work ? verifyWork(motivationData.choice3.work) : true,
                experience: motivationData.choice3.experience
                    ? verifyExperience(motivationData.choice3.experience)
                    : true,
                expectations: motivationData.choice3.expectations
                    ? verifyExpectations(motivationData.choice3.expectations)
                    : true,
            },
        }),
        [motivationData]
    );

    const isMainComplete = useMemo(
        () => Object.values(mainValidity).every(Boolean),
        [mainValidity]
    );

    const isDepartmentsComplete = departmentsValidity.allValid;

    const isMotivationsComplete = motivationsValidity.choice1.expectations;

    const allComplete = useMemo(
        () => isMainComplete && isDepartmentsComplete && isMotivationsComplete,
        [isMainComplete, isDepartmentsComplete, isMotivationsComplete]
    );

    const renderFieldStatus = (label: string, isValid: boolean) => (
        <li className={isValid ? "text-tertiary-dark" : "text-red-600"}>
            {label}: {isValid ? "Valid" : "Invalid"}
        </li>
    );

    const motivationKeys = ["choice1", "choice2", "choice3"] as const;

    return (
        <motion.section
            layout
            transition={{ duration: 0.1, ease: "easeInOut" }}
            className="bg-white h-max z-10 flex flex-col items-center p-6 overflow-y-auto"
        >

            <h3 className="text-xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-green-400 text-center mb-8">
                Submit Your Application
            </h3>

            <div className="mb-6 w-full max-w-md overflow-y-auto">

                <div className="space-y-4 overflow-y-auto max-h-70">

                    <div className={isMainComplete ? "text-tertiary-dark" : "text-red-600"}>
                        <Collapsible open={mainOpen} onOpenChange={setMainOpen}>
                            <CollapsibleTrigger className="flex items-center cursor-pointer gap-2 w-full text-left text-sm md:text-lg hover:bg-gray-100 p-2 rounded font-semibold">
                                <ChevronDown className={`w-4 h-4 transition-transform ${mainOpen ? 'rotate-180' : ''}`} />
                                Main Information: {isMainComplete ? "Complete" : "Incomplete"}
                            </CollapsibleTrigger>
                            <CollapsibleContent className="mt-2 pl-6">
                                <ul className="list-disc list-inside space-y-1">
                                    {renderFieldStatus("First Name", mainValidity.firstName)}
                                    {renderFieldStatus("Last Name", mainValidity.lastName)}
                                    {renderFieldStatus("Email", mainValidity.email)}
                                    {renderFieldStatus("Phone", mainValidity.phone)}
                                    {renderFieldStatus("School", mainValidity.school)}
                                    {renderFieldStatus("Year", mainValidity.year)}
                                </ul>
                            </CollapsibleContent>
                        </Collapsible>
                    </div>

                    <div className={isDepartmentsComplete ? "text-tertiary-dark" : "text-red-600"}>
                        <Collapsible open={deptOpen} onOpenChange={setDeptOpen}>
                            <CollapsibleTrigger className="flex items-center cursor-pointer gap-2 w-full text-left text-sm md:text-lg hover:bg-gray-100 p-2 rounded font-semibold">
                                <ChevronDown className={`w-4 h-4 transition-transform ${deptOpen ? 'rotate-180' : ''}`} />
                                Department Selection: {isDepartmentsComplete ? "Complete" : "Incomplete"}
                            </CollapsibleTrigger>
                            <CollapsibleContent className="mt-2 pl-6">
                                <ul className="list-disc list-inside space-y-1">
                                    {renderFieldStatus("Department 1", verifyDepartment(departmentData.department1))}
                                    {renderFieldStatus("Department 2", verifyDepartment(departmentData.department2))}
                                    {renderFieldStatus("Department 3", verifyDepartment(departmentData.department3))}
                                    {renderFieldStatus("Unique Choices", departmentsValidity.unique)}
                                </ul>
                            </CollapsibleContent>
                        </Collapsible>
                    </div>

                    <div className={isMotivationsComplete ? "text-tertiary-dark" : "text-red-600"}>
                        <Collapsible open={motivOpen} onOpenChange={setMotivOpen}>
                            <CollapsibleTrigger className="flex items-center cursor-pointer gap-2 w-full text-left text-sm md:text-lg hover:bg-gray-100 p-2 rounded font-semibold">
                                <ChevronDown className={`w-4 h-4 transition-transform ${motivOpen ? 'rotate-180' : ''}`} />
                                Motivations: {isMotivationsComplete ? "Complete" : "Incomplete"}
                            </CollapsibleTrigger>
                            <CollapsibleContent className="mt-2 pl-6">
                                {motivationKeys.map((choiceKey, index) => {
                                    const choice = motivationData[choiceKey];
                                    return (
                                        <div key={choiceKey} className="mb-2">
                                            <h6 className="font-medium">Choice {index + 1}:</h6>
                                            <ul className="list-disc list-inside ml-4 space-y-1">
                                                {renderFieldStatus("Work", motivationsValidity[choiceKey].work)}
                                                {renderFieldStatus("Experience", motivationsValidity[choiceKey].experience)}
                                                {renderFieldStatus("Expectations", motivationsValidity[choiceKey].expectations)}
                                            </ul>
                                        </div>
                                    );
                                })}
                            </CollapsibleContent>
                        </Collapsible>
                    </div>
                </div>
            </div>
            {hasApplied && (
                <p className="text-gray-400 font-semibold mb-4">You already applied!</p>
            )}
            {submissionError && (
                <p
                    className="mb-4 text-center font-semibold text-red-600"
                    role="alert"
                >
                    {submissionError}
                </p>
            )}
            <Button
                variant="primary"
                className={`mt-4 ${(!allComplete || !canSubmit) ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={onSubmit}
                disabled={!allComplete || !canSubmit}
            >
                {isSubmitting ? "Submitting..." : hasApplied ? "Submitted" : "Submit"}
            </Button>
        </motion.section>
    );
};

export default SubmitSection;
