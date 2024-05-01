import { cn } from '@/utils/cn';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import React, { useState } from 'react';
import { CircularProgress } from '@mui/material';

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
}
const BottomGradient = () => {
    return (
        <>
            <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-orange-500 to-transparent" />
            <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-orange-500 to-transparent" />
        </>
    );
};
const LabelInputContainer = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};
const changePatientInfo = () => {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        age: 0,
        gender: "",
        parentId: localStorage.getItem("userId")
    })
    const [currentPatientId, setCurrentPatientId] = useState()
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true)
        const requestOptions = {
            method: "UPDATE",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(formData),
        };
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_NAME}/update/patient/${formData}?token=${localStorage.getItem("accessToken")}`, requestOptions);
            if (response.status === 201 || response.status === 200) {
                setLoading(false)
            }
            else {
                setLoading(false)
            }
        }
        catch (error) {
            console.error('Error Adding Patient:', error)
        }
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    return (
        <div className='max-w-md w-full p-2 mx-auto rounded-none md:rounded-2xl shadow-input bg-white dark:bg-black flex flex-col'>
            <form className="bg-white" onSubmit={handleSubmit}>
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                    <LabelInputContainer>
                        <Label htmlFor="firstname">First name</Label>
                        <Input id="firstname" name='firstName' value={formData.firstName} onChange={handleChange} required placeholder="" type="text" />
                    </LabelInputContainer>
                    <LabelInputContainer>
                        <Label htmlFor="lastname">Last name</Label>
                        <Input id="lastname" name='lastName' value={formData.lastName} onChange={handleChange} required placeholder="" type="text" />
                    </LabelInputContainer>
                </div>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="age">Age</Label>
                    <Input id="age" name='age' value={formData.age} onChange={handleChange} required placeholder="" type="number" />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="gender">Gender</Label>
                    <Input id="gender" name='gender' value={formData.gender} onChange={handleChange} required placeholder="" type="text" />
                </LabelInputContainer>
            </form>
        </div>
    )
}

export default changePatientInfo