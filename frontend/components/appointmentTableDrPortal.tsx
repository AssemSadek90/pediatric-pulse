"use client"
import React, { useState, Fragment, useEffect } from 'react';
import { formatTime, formatTimeNum } from '@/utils/formatFuncs';
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
    parentPhoneNumber: string,
    gender: string,
    parentId: number
};

const DoctorAppointmentTableDrPortal = () => {

    const selectedDrId = Number(localStorage.getItem("userId"));

    const userId = Number(localStorage.getItem("userId"))
    const [appointmentData, setAppointmentData] = useState<any>({})
    
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];
    const hours = Array.from({ length: 9 }, (_, index) => index + 9);
  
    const [appointments, setMyAppointments] = useState([] as Appointment[])
    const [patient, setPatient] = useState<Patient | null>(null);


    const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
};

useEffect(() => {
    fetchMyAppointmentList();
  fetchMyPatient(appointmentData.patientId, appointmentData.parentId);
  }, []);

  async function fetchMyPatient(patientId: number, parentId: number) {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_NAME}/get/patient/${patientId}/${parentId}?token=${localStorage.getItem("accessToken")}`,
        { headers }
    );
    if (!response.ok) {
        console.log("ERRORRR")
    }
    const data = await response.json();
    setPatient(data);
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
    `         {//appointment && appointment.isTaken ? (patient ? `${patient.firstName} ${patient.lastName}, ${patient.age}` : 'Not Available') : 'Available'}
    appointment && appointment.isTaken ? 'Booked' : 'Available'}                </td>
                
                );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DoctorAppointmentTableDrPortal;