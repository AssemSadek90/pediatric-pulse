"use client"
import React from 'react'
import { Input} from '../ui/input'
import { Label } from '../ui/label';
import { cn } from '@/utils/cn';
import AutocompleteIntroduction from '../ui/DoctorsDropDown';
import AppointmentDate from '../ui/AppointmentDate';
import DoctorSelector from '../ui/DoctorsDropDown';
import DoctorAppointmentTable from '../appointmentTable'
interface Appointment {
  id: number,
  parentId: number,
  doctorId: number,
  patientId: number,
  appointmentDate: string,
  From: string,
  To: string,
  isTaken: true
};
interface Doctor {
  title: string;
  link: string;
  thumbnail: string;
  numberOfReviews: number;
  avarageRating: number;
  id: number;
};
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
const Appointment = () => {
    const LabelInputContainer = ({
        children,
        className,
      }: {
        children: React.ReactNode;
        className?: string;
      }) => {
        return (
          <div className={cn("flex flex-col col-span-1 space-y-2 w-full", className)}>
            {children}
          </div>
        );
      };
      const [options, setOptions] = React.useState([
        { value: 'chocolate', label: 'Chocolate' },
      ])
    
    const [day, setDay] = React.useState(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'])
    const [month, setMonth] = React.useState(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'])
    const [hour, setHour] = React.useState(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'])
    const [currentPatient, setCurrentPatient] = React.useState({} as Patient | undefined)
const [appointments, setAppointments] = React.useState([] as Appointment[])
const [selectedDr, setSelectedDr] = React.useState({ title: "", link: "", thumbnail: "/default.jpg", numberOfReviews: 0, avarageRating: 0, id: 0, } as Doctor)
React.useEffect(() => {
  setAppointments([
    {
      id: 1,
      parentId: 1,
      doctorId: 1,
      patientId: 1,
      appointmentDate: "2022-01-01",
      From: "10:00",
      To: "10:30",
      isTaken: true
    },
    {
      id: 2,
      parentId: 1,
      doctorId: 1,
      patientId: 1,
      appointmentDate: "2022-01-01",
      From: "10:30",
      To: "11:00",
      isTaken: true
    },
    {
      id: 3,
      parentId: 1,
      doctorId: 1,
      patientId: 1,
      appointmentDate: "2022-01-01",
      From: "11:00",
      To: "11:30",
      isTaken: true
    }
  ])
  setSelectedDr({
    title: "Dr. John Doe",
    link: "https://www.google.com",
    thumbnail: "/default.jpg",
    numberOfReviews: 0,
    avarageRating: 0,
    id: 1
  })
  setCurrentPatient({
    id: 1,
    age: 10,
    firstName: "John",
    lastName: "Doe",
    parentFirstName: "Jane",
    parentLastName: "Doe",
    parentPhoneNumber: "1234567890",
    gender: "male",
    parentId: 1})
}, [setAppointments]);
  return (
    <form className= 'm-5 w-screen rounded-md shadow-lg flex-col   bg-zinc-200' >
        <div className='m-5 text-3xl from-neutral-800 '> Patient  Scheduling </div>
        <div className=' grid gap-10 grid-cols-1 md:grid-cols-3 m-3'>
        
        <LabelInputContainer>
            <Label> Patient First Name </Label>
            <Input id="firstname" name='firstName' required placeholder='First Name' type="text" />
        </LabelInputContainer>
        <LabelInputContainer>
            <Label> Patient Last Name </Label>
            <Input id='lastname' name='lastname' placeholder='Last Name' type='text' />
        </LabelInputContainer>
        <LabelInputContainer>
            <Label> Patient Code</Label>
            <Input id='patientcode' name='patientcode' placeholder='Patient Code' type='number' />
        </LabelInputContainer>
        <LabelInputContainer>
            
            <div><DoctorSelector/></div>

        </LabelInputContainer>
        
        
        </div>
        <div className='mt-5' >
        <LabelInputContainer>
            <Label className='ml-3'> Pick appointment</Label>
            <DoctorAppointmentTable selectedDrId={selectedDr.id} appointments={appointments} currentPatientId={currentPatient?.id} />
        </LabelInputContainer>
        </div>
        <div className='flex justify-end mr-2 mt-10 mb-1'>
          <button
              className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-1/5 text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              type="submit"
            > Submit  </button>
        </div>
    </form>
  )
}

export default Appointment
