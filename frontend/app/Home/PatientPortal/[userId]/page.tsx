"use client"
import AddPatient from '@/components/addPatient';
import ChangePatientInfo from '@/components/changePatientInfo';
import Navbar from '@/components/navbar';
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
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

const patientPortal = () => {
  const router = useRouter();
  const [patients, setPatients] = useState([] as Patient[]);
  const [hasAccess, setHasAccess] = useState(false)
  const [idShown, setIdShown] = useState<number | undefined>()
  const [openModal, setOpenModal] = useState(false)
  const [loading, setLoading] = useState(false)

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
  };
  async function fetchPatientList() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_NAME}/get/patients/${localStorage.getItem("userId")}?token=${localStorage.getItem("accessToken")}`,
      { headers }
    );
    if (!response.ok) {
      console.log("ERRORRR")
    }
    const data = await response.json();
    setPatients(data);
  }
  const handlePageLoad = () => {
    if (localStorage.getItem("role") !== "customer") {
      router.push('/Forbidden')
    }
    else {
      setHasAccess(true)
    }
  }
  useEffect(() => {
    handlePageLoad()
    fetchPatientList();
  }, []);
  const Skeleton1 = () => (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-dot-black/[0.2] font-bold border border-transparent">Patient Medical History</div>
  );
  const Skeleton2 = () => (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-dot-black/[0.2] font-bold border border-transparent "><ChangePatientInfo /></div>
  );
  const Skeleton3 = () => (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-dot-black/[0.2] font-bold border border-transparent">Patient Medical History</div>
  )
    ; const Skeleton4 = () => (
      <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-dot-black/[0.2] font-bold border border-transparent">Book an Appointment</div>
    );
  const items = [
    {
      description: 'Hi',
      header: <Skeleton1 />,
      className: "md:col-span-2 border border-neutral-200 h-full",
    },
    {
      description: <div className='flex justify-center'>
        <button
          className="bg-gradient-to-br relative group/btn from-black to-neutral-600 block w-[50%] text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset]"
          type="submit"
          disabled={loading ? true : false}
        >
          {loading ? <CircularProgress color="warning" size={"1.3rem"} /> : <p>Update Patient Data</p>}
        </button>
      </div>,
      header: <Skeleton2 />,
      className: "md:col-span-1 border border-neutral-200 h-full",
    },
    {
      description: "Discover the beauty of thoughtful and functional design.",
      header: <Skeleton3 />,
      className: "md:col-span-1 border border-neutral-200 h-full",
    },
    {
      description:
        "Understand the impact of effective communication in our lives.",
      header: <Skeleton4 />,
      className: "md:col-span-2 border border-neutral-200 h-full",
    },
  ];
  return (
    <>
      {hasAccess ?
        <div className="">
          <Navbar patients={patients} setIdShown={setIdShown} setOpenModal={setOpenModal} idShown={idShown} />
          {openModal && <AddPatient openModal={openModal} setOpenModal={setOpenModal} />}
          <div className="h-lvh">
            <BentoGrid className="w-screen mx-auto h-lvh md:auto-rows-[20rem]">
              {items.map((item, i) => (
                <BentoGridItem
                  key={i}
                  description={item.description}
                  header={item.header}
                  className={item.className}
                />
              ))}
            </BentoGrid>
          </div>
        </div> :
        <div>Access Denied</div>}
    </>
  )
}

export default patientPortal