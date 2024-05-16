"use client"
import React, { useState, Fragment, useEffect } from 'react';
import { formatName, formatTime, formatTimeNum } from '@/utils/formatFuncs';
import { Transition } from '@headlessui/react';

interface Appointment {
  id: number,
  parentId: number,
  doctorId: number,
  patientId: number,
  appointmentDate: string,
  From: string,
  To: string,
  isTaken: true
}

interface Patient {
  id: number,
  age: number,
  firstName: string,
  lastName: string,
  parentFirstName: string,
  parentLastName: string,
  parentPic: string,
  
};

const DoctorAppointmentTableDrPortal = () => {

    const selectedDrId = Number(localStorage.getItem("userId"));

    const userId = Number(localStorage.getItem("userId"))
    const [appointmentData, setAppointmentData] = useState<any>({})
    
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];
    const hours = Array.from({ length: 9 }, (_, index) => index + 9);
  
    const [appointments, setMyAppointments] = useState([] as Appointment[])
    const [patients, setPatients] = useState({} as Record<number, Patient>);


    const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
};

useEffect(() => {
    fetchMyAppointmentList();
 
  }, []);

  async function fetchMyPatient(patientId: number) {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_NAME}/patient/${patientId}/${localStorage.getItem("userId")}/?token=${localStorage.getItem("accessToken")}`,
        { headers }
    );
    if (!response.ok) {
        console.log("ERRORRR")
    }
    const data = await response.json();
            setPatients((prevPatients) => ({
                ...prevPatients,
                [patientId]: data.patient,
            }));
};
async function fetchMyAppointmentList() {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_NAME}/get/doctor/appointments/table/${localStorage.getItem("userId")}/${localStorage.getItem("userId")}?token=${localStorage.getItem("accessToken")}`,
        { headers }
    );
    if (!response.ok) {
        console.log("ERRORRR")
    }
    const data = await response.json();
    setMyAppointments(data);
};
const handleBookAppointment = (parentId: number, doctorId: number, patientId: number | undefined, appointmentDate: string, From: number | undefined, To: number | undefined, isTaken: true) => {
    // add confirmation of booking
    setAppointmentData({ parentId: parentId, doctorId: doctorId, patientId: patientId, appointmentDate: appointmentDate, From: String(From), To: String(To), isTaken: isTaken })
  }

  let myAppointmentList = appointments.length === 0 ? (
    <div>No appointments yet</div>
) : (
    appointments.map((appointment) => {
        if (appointment.patientId !== null) {
            console.log(appointment.patientId);
            console.log(localStorage.getItem("userId"));
fetchMyPatient(appointment.patientId);
        }
        const patient = patients[appointment.patientId];

        

  return (
    <>
      
      
      <div className='w-full h-full p-4'>
        <table className='w-full rounded-t-3xl rounded-t-3xl h-full p-2 bg-neutral-100'>
          <thead className='p-2'>
            <tr className='p-2'>
              <th className='p-2'>Time</th>
              {days.map((day) => (
                <th className='p-2' key={day}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody className='p-2'>
            {hours.map((hour) => (
              <tr className='p-2' key={hour}>
                <td className='p-2 text-center'>{`${formatTimeNum(hour)}:00`}</td>
                {days.map((day) => {
                  const appointment = appointments.find(
                    (appt) => appt.appointmentDate === day && Number(appt.From) === hour
                  );
                  return (
                    <td
                      key={`${day}-${hour}`}
                      style={
                        {
                          backgroundColor: appointment && appointment.isTaken ? '#fee2e2' : '#ecfccb',
                          cursor: appointment && appointment.isTaken ? 'not-allowed' : 'pointer',
                        }
                      }
                      className='border border-neutral-300 p-2 text-center text-md font-light hover:contrast-50 cursor-pointer'
                      onClick={appointment?.isTaken ? () => {} : () => handleBookAppointment(userId, selectedDrId, appointment?.patientId, day, hour, hour + 1, true)}
                    >
    `        {appointment && appointment.isTaken ? (
  <div className='w-[95%] h-20 text-black bg-neutral-50 border rounded-xl p-4 flex justify-between items-center'>
    <div className='flex max-w-[13rem] flex-row space-x-4 items-center'>
      <span>
        <img className='h-12 w-12 rounded-full min-w-12' src={patient?.parentPic} alt='PatPic' />
      </span>
      <span className='text-neutral-700 font-semibold hover:text-black'>Dr.{formatName(patient?.firstName ?? 'N/A')} {formatName(patient?.lastName ?? 'N/A')}
      </span>    </div>
    <div className='text-sm space-x-2 font-light'>
      <span>
      {`${patient?.age ?? 'N/A'} years old`}
      </span>
      
    </div>
  </div>
) : 'Available'}  
                  </td>
                
                );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
    )
);
return (
  <div className='space-y-2'>{myAppointmentList}</div>
)
}

export default DoctorAppointmentTableDrPortal