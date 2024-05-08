import React, { useEffect, useState } from 'react'
import { formatName, formatTime } from '@/utils/formatFuncs'
interface Appointment {
    id: number,
    parentId: number,
    doctorId: number,
    appointmentDate: string,
    From: string,
    To: string,
    isTaken: true
};
interface DoctorObj {
    doctorId: number,
    firstName: string,
    lastName: string,
    email: string,
    userName: string,
    createdAt: string,
    profilePicture: string,
    role: string,
    rating: number,
    numberOfRating: number,
    price: number
};
const SideAppointments = () => {
    const [myAppointments, setMyAppointments] = useState([] as Appointment[])
    const [doctors, setDoctors] = useState({} as Record<number, DoctorObj>);
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
    };
    async function fetchMyAppointmentList() {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_NAME}/get/appointment/${localStorage.getItem("userId")}?token=${localStorage.getItem("accessToken")}`,
            { headers }
        );
        if (!response.ok) {
            console.log("ERRORRR")
        }
        const data = await response.json();
        setMyAppointments(data);
    };
    async function fetchDoctor(doctorId: number) {
        if (!doctors[doctorId]) {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_NAME}/get/doctor/${doctorId}/${localStorage.getItem("userId")}?token=${localStorage.getItem("accessToken")}`,
                { headers }
            );
            const data = await response.json();
            setDoctors((prevDoctors) => ({
                ...prevDoctors,
                [doctorId]: data.doctor,
            }));
        }
    }
    useEffect(() => {
        fetchMyAppointmentList();
    }, []);

    let myAppointmentList = myAppointments.length === 0 ? (
        <div>No appointments yet</div>
    ) : (
        myAppointments.map((appointment) => {
            if (appointment.doctorId !== null) {
                fetchDoctor(appointment.doctorId);
            }
            const doctor = doctors[appointment.doctorId];
            return (
                <div className='w-[95%] h-20 text-black bg-neutral-50 border rounded-xl p-4 flex justify-between items-center'>
                    <div className='flex flex-row space-x-4 items-center'>
                        <span>
                            <img className='h-12 w-12 rounded-full' src={doctor?.profilePicture} alt='DocPic' />
                        </span>
                        <span className='text-neutral-700 font-semibold hover:text-black'>{formatName(doctor?.firstName)} {formatName(doctor?.lastName)}
                        </span>
                    </div>
                    <div className='text-sm space-x-2 font-light'>
                        <span>
                            {formatTime(appointment.From)}-{formatTime(appointment.To)}
                        </span>
                        <span className='ml-2'>
                            {appointment.appointmentDate}
                        </span>
                    </div>
                </div>
            );
        })
    );
    return (
        <div className='space-y-2'>{myAppointmentList}</div>
    )
}

export default SideAppointments