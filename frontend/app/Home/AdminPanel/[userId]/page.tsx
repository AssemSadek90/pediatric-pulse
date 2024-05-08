"use client"
import NavbarLanding from '@/components/navbarLanding';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const adminPanel = () => {
  const router = useRouter();
  const [hasAccess, setHasAccess] = useState(false)
  const handlePageLoad = () => {
    if (localStorage.getItem("role") !== "admin") {
      router.push('/Forbidden')
    }
    else {
      setHasAccess(true)
    }
  }
  const handleToPatient = () => {
    router.push(`/Home/PatientPortal/${localStorage.getItem("userId")}`)
  };
  useEffect(() => {
    handlePageLoad()
  }, [hasAccess]);
  return (
    <>
      {hasAccess ?
        <div className="text-6xl flex justify-center">
          <NavbarLanding />
          <button onClick={() => handleToPatient()}>Go to Patient Portal</button>

        </div> :
        <div className="text-8xl flex justify center">Access Denied</div>}
    </>
  )
}

export default adminPanel