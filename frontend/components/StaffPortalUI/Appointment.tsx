"use client"
import React from 'react'
import { Input} from '../ui/input'
import { Label } from '../ui/label';
import { cn } from '@/utils/cn';
import AutocompleteIntroduction from '../ui/DoctorsDropDown';
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
  return (
    <div className= 'col-span-3 m-5 w-screen rounded-md shadow-lg flex-col   bg-zinc-300' >
        <div className='m-5 text-3xl from-neutral-800'> Patient  Scheduling </div>
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
            <Label> Patient Code</Label>
            <Input id='patientcode' name='patientcode' placeholder='Patient Code' type='number' />
        </LabelInputContainer>
        </div>
    </div>
  )
}

export default Appointment
