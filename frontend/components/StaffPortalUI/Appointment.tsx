"use client"
import React from 'react'
import { Input} from '../ui/input'
import { Label } from '../ui/label';
import { cn } from '@/utils/cn';
import AutocompleteIntroduction from '../ui/DoctorsDropDown';
import AppointmentDate from '../ui/AppointmentDate';
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
            
            <div><AutocompleteIntroduction/></div>

        </LabelInputContainer>
        <LabelInputContainer>
            <Label> Date</Label>
            <div className='flex justify-between'>
                <AppointmentDate buttonText='Day' list={day}/>
                <AppointmentDate buttonText='Month' list={month}/>
                <AppointmentDate buttonText='Hour' list={hour}/>
            </div>
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
