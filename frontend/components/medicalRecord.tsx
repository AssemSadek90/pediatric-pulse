"use client";
import Image from "next/image";
import { Tabs } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
interface Patient {
    id: number;
    age: number;
    firstName: string;
    lastName: string;
    parentFirstName: string;
    parentLastName: string;
    parentPhoneNumber: string;
    gender: string;
    parentId: number;
};
interface Record {
    id: number;
    patientId: number;
    notes: string;
    treatment: string;
    createdAt: string;
    healthCondition: string;
    vaccin: string;
    allergies: string;
    pastConditions: string;
    chronicConditions: string;
    surgicalHistory: string;
    medications: string;
    radiologyReport: string;
}
const medicalRecord = ({ currentPatient }: { currentPatient: Patient | undefined }) => {
    function formatStringWithCommas(input: string | undefined): string {
        const parts = input?.split(',');
        const formattedString = parts?.join('\n');
        if (formattedString === undefined) {
            return ""
        }
        return formattedString;
    }
    const [medicalRecord, setMedicalRecord] = useState({} as Record | undefined);
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
    };
    async function fetchMedicalRecord() {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_NAME}/get/medicalRecord/${localStorage.getItem("userId")}/${currentPatient?.id}?token=${localStorage.getItem("accessToken")}`,
            { headers }
        );
        const data = await response.json();
        setMedicalRecord(data[0]);
    }
    useEffect(() => {
        if (currentPatient !== undefined) {
            fetchMedicalRecord();
        }
    }, [currentPatient]);
    const tabs = [
        {
            title: "Treatment",
            value: "Treatment",
            content: (
                <div className="w-full overflow-hidden relative h-5/6 rounded-2xl p-4 text-black bg-neutral-50">
                    <p className="text-xl border-b-2 border-neutral-200">Treatment tab</p>
                    <pre className="pt-4 text-md">{medicalRecord && medicalRecord?.treatment}</pre>
                </div>
            ),
        },
        {
            title: "Vaccines",
            value: "Vaccines",
            content: (
                <div className="w-full overflow-hidden relative h-5/6 rounded-2xl p-4 text-black bg-neutral-50">
                    <p className="text-xl border-b-2 border-neutral-200">Vaccines Tab</p>
                    <pre className="pt-4 text-md">{formatStringWithCommas(medicalRecord?.vaccin)}</pre>
                </div>
            ),
        },
        {
            title: "Medications",
            value: "Medications",
            content: (
                <div className="w-full overflow-hidden relative h-5/6 rounded-2xl p-4 text-black bg-neutral-50">
                    <p className="text-xl border-b-2 border-neutral-200">Medications tab</p>
                    <pre className="pt-4 text-md">{medicalRecord?.medications}</pre>
                </div>
            ),
        },
        {
            title: "Radiology Report",
            value: "Radiology Report",
            content: (
                <div className="w-full overflow-hidden relative h-5/6 rounded-2xl p-4 text-black bg-neutral-50">
                    <p className="text-xl border-b-2 border-neutral-200">Radiology Report tab</p>
                    <pre className="pt-4 text-md">{medicalRecord?.radiologyReport}</pre>
                </div>
            ),
        },
        {
            title: "Allergies",
            value: "Allergies",
            content: (
                <div className="w-full overflow-hidden relative h-5/6 rounded-2xl p-4 text-black bg-neutral-50">
                    <p className="text-xl border-b-2 border-neutral-200">Allergies tab</p>
                    <pre className="pt-4 text-md">{medicalRecord?.allergies}</pre>
                </div>
            ),
        },
        {
            title: "Past Conditions",
            value: "Past Conditions",
            content: (
                <div className="w-full overflow-hidden relative h-5/6 rounded-2xl p-4 text-black bg-neutral-50">
                    <p className="text-xl border-b-2 border-neutral-200">Past Conditions tab</p>
                    <pre className="pt-4 text-md">{medicalRecord?.pastConditions}</pre>
                </div>
            ),
        },
        {
            title: "Surgical History",
            value: "Surgical History",
            content: (
                <div className="w-full overflow-hidden relative h-5/6 rounded-2xl p-4 text-black bg-neutral-50">
                    <p className="text-xl border-b-2 border-neutral-200">Surgical History tab</p>
                    <pre className="pt-4 text-md">{medicalRecord?.surgicalHistory}</pre>
                </div>
            ),
        },

    ];
    return (
        <div className="h-full overflow-clip md:h-[40rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full items-start justify-start">
            <Tabs tabs={tabs} />
        </div>
    )
}

export default medicalRecord