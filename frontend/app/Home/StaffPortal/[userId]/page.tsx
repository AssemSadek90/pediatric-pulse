"use client"
import NavbarLanding from '@/components/navbarLanding';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import StaffSideBar from '@/components/staffSideBar';
import Appointment from '@/components/StaffPortalUI/Appointment';
import "@/styles/staff.module.css"
const staffPortal = () => {
  const router = useRouter();
  const [hasAccess, setHasAccess] = useState(true)
  // const handlePageLoad = () => {
  //   if (localStorage.getItem("role") !== "staff") {
  //     router.push('/Forbidden')
  //   }
  //   else {
  //     setHasAccess(true)
  //   }
  // }
  // useEffect(() => {
  //   handlePageLoad()
  // }, [hasAccess]);
  return (
    <>
      {hasAccess ?
        <div className="grad_bg h-full md:h-screen">
          <NavbarLanding />
          <div className='flex grid-cols-5 gap-2 '>
            <StaffSideBar />
            <Appointment />
          </div>

        </div> :
        <div>Access Denied</div>}
    </>
  )
}

export default staffPortal