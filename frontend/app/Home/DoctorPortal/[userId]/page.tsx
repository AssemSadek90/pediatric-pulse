"use client"
import MedicalRecord from '@/components/medicalRecord';
import NavbarLanding from '@/components/navbarLanding';
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
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
const doctorPortal = () => {
  const router = useRouter();
  const [hasAccess, setHasAccess] = useState(false)
  const handlePageLoad = () => {
    if (localStorage.getItem("role") !== "doctor") {
      router.push('/Forbidden')
    }
    else {
      setHasAccess(true)
    }
  }
  const Skeleton1 = () => (
    <>
      <div className='flex items-start font-bold border border-transparent'>
        Patient Medical Record
      </div>
      <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-dot-black/[0.2] font-bold border border-transparent ">
        <MedicalRecord currentPatient={{} as Patient} />
      </div>
    </>
  );
  const Skeleton2 = () => (
    <>
      <div className='flex items-start font-bold border border-transparent'>
        Reviews
      </div>
      <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-dot-black/[0.2] font-bold border border-transparent ">

      </div>
    </>
  );
  const Skeleton3 = () => (
    <>
      <div className="flex flex-1 w-full h-fit rounded-xl font-bold ">Your Appointments</div>
      <div className='w-full h-full flex flex-col overflow-y-scroll'>
        {/* Add the appointments here, take inspiration from "SideAppointments.tsx" Component */}
      </div>
    </>
  );
  const Skeleton4 = () => (
    <>
      <div className='flex items-start font-bold border border-transparent'>
        Your Appointment Table
      </div>
      <div className="flex w-full h-full min-h-[6rem] rounded-xl bg-dot-black/[0.2] font-bold border border-transparent ">
        {/* Add the table here without the interactivity, take inspiration from "appointmentTable.tsx" Component */}
      </div>
    </>
  );
  const items = [
    {
      description: 'You can edit the patients medical record.',
      header: <Skeleton1 />,
      className: "md:col-span-2 border border-neutral-200 h-full",
    },
    {
      description: 'These are the reviews given to you by your patients',
      header: <Skeleton2 />,
      className: "md:col-span-1 border border-neutral-200 h-full",
    },
    {
      description: "These are your appointments, please try to be at the clinic beforehand",
      header: <Skeleton3 />,
      className: "md:col-span-1 border border-neutral-200 h-full",
    },
    {
      description:
        "Red slots are appointments already booked while green are available slots",
      header: <Skeleton4 />,
      className: "md:col-span-2 border border-neutral-200 h-full",
    },
  ];
  useEffect(() => {
    handlePageLoad()
  }, [hasAccess]);
  return (
    <>
      {hasAccess ?
        <div>
          <NavbarLanding />
          <section>
            <BentoGrid className="w-[95%] mx-auto h-lvh md:auto-rows-[20rem]">
              {items.map((item, i) => (
                <BentoGridItem
                  key={i}
                  description={item.description}
                  header={item.header}
                  className={item.className}
                />
              ))}
            </BentoGrid>
          </section>
        </div> :
        <div>Access Denied</div>}
    </>
  )
}

export default doctorPortal