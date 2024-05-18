"use client"
import AddUser from '@/components/AdminComponents/AddUser';
import EditUser from '@/components/AdminComponents/EditUser';
import PatientSelector from '@/components/PatientSelector';
import Table from '@/components/Table';
import MedicalRecordEdit from '@/components/medicalRecordEdit';
import AdminSideBar from "@/components/AdminComponents/AdminSideBar"
import NavbarLanding from '@/components/navbarLanding';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
interface User {
  userId: number,
  firstName: string,
  lastName: string,
  email: string,
  userName: string,
  createdAt: string,
  phone: string,
  age: number,
  profilePicture: string,
  role: string
}
interface PatientObj {
  parentPic: string,
  patientFirstName: string,
  patientLastName: string,
  parentFirstName: string,
  parentLastName: string,
  patientId: number
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
const adminPanel = () => {
  const router = useRouter();
  const [hasAccess, setHasAccess] = useState(false)
  const [disable, setDisable] = useState(false)
  const [section, setSection] = useState(0)
  const sections = ["Users", "Doctors", "Patients", "Medical Records", "Appointments", "Reviews", "Statistics"]

  // User States
  const [userList, setUserList] = useState([{ userId: 0, firstName: "", lastName: "", email: "", userName: "", createdAt: "", phone: "", age: 0, profilePicture: "", role: "" }] as User[])
  const [openModalUserAdd, setOpenModalUserAdd] = useState(false)
  const [openModalUserEdit, setOpenModalUserEdit] = useState(false)
  const [userToDelete, setUserToDelete] = useState<any>()

  //Medical Record States
  const [patientList, setPatientList] = useState([] as PatientObj[])
  const [selectedPat, setSelectedPat] = useState({ parentPic: "/default.jpg", patientFirstName: "", patientLastName: "", parentFirstName: '', parentLastName: '', patientId: 0, } as PatientObj)
  const [currentPatient, setCurrentPatient] = useState({} as Patient | undefined) // medical record


  const handlePageLoad = () => {
    if (localStorage.getItem("role") !== "admin") {
      router.push('/Forbidden')
    }
    else {
      setHasAccess(true)
    }
  }
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
  };
  async function fetchUserList() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_NAME}/get/all/users/${localStorage.getItem("userId")}?token=${localStorage.getItem("accessToken")}`,
      { headers }
    );
    if (!response.ok) {
      console.log("Error: Request sent no data")
    }
    const data: User[] = await response.json();
    const formattedData = data.map(user => ({
      ...user,
      createdAt: user.createdAt.substring(0, 10)
    }));
    setUserList(formattedData);

  };
  async function handleDeleteUser(id: number) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_NAME}/delete/user/${id}/${localStorage.getItem("userId")}?token=${localStorage.getItem("accessToken")}`,
      { method: 'DELETE', headers }
    );
    if (response.ok) {
      location.reload();
    }
  };
  async function fetchUser(id: number) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_NAME}/get/user/${id}/${localStorage.getItem("userId")}?token=${localStorage.getItem("accessToken")}`,
      { headers }
    );
    if (!response.ok) {
      console.log("Error: Request sent no data")
    }
    const data = await response.json();
    setUserToDelete(data);
  };
  async function handleEditUser(id: number) {
    setOpenModalUserEdit(true)
    fetchUser(id)
  };

  //Medical Record Functions
  async function fetchPatientList() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_NAME}/get/all/patients/${localStorage.getItem("userId")}?token=${localStorage.getItem("accessToken")}`,
      { headers }
    );
    if (!response.ok) {
      console.log("Error: Request sent no data")
    }
    const data = await response.json();
    setPatientList(data);
  };
  useEffect(() => {
    handlePageLoad()
    fetchUserList()
    fetchPatientList()
  }, []);

  const headersUser =
    [
      { label: "ID", size: 50 },
      { label: "First Name", size: 120 },
      { label: "Last Name", size: 120 },
      { label: "Email", size: 300 },
      { label: "User Name", size: 180 },
      { label: "Created At", size: 120 },
      { label: "Phone", size: 120 },
      { label: "Age", size: 50 },
      { label: "Picture", size: 270 },
      { label: "Role", size: 90 }
    ];
  // Assem
  const SkeletonUser = React.memo(() => (
    <>
      {openModalUserAdd && <AddUser openModal={openModalUserAdd} setOpenModal={setOpenModalUserAdd} />}
      {openModalUserEdit && <EditUser openModal={openModalUserEdit} setOpenModal={setOpenModalUserEdit} user={userToDelete} setUser={setUserToDelete} />}
      <div className='mx-auto my-auto'>
        <Table
          data={userList}
          height={500}
          width={1610}
          rowHeight={60}
          headers={headersUser}
          setAddModal={setOpenModalUserAdd}
          editHandler={handleEditUser}
          deleteHandler={handleDeleteUser}
          tableFor='User'
        />
      </div>
    </>
  ));
  const SkeletonMedicalRecord = React.memo(() => (
    <div className='mx-auto my-auto'>
      <div className='flex items-center justify-between font-bold border border-transparent'>
        <span>Patient Medical Record</span>
        <span><PatientSelector className='' message='Please select a Patient' selected={selectedPat} setSelected={setSelectedPat} setCurrentPatient={setCurrentPatient} patientList={patientList} /></span>
      </div>
      <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-dot-black/[0.2] font-bold border border-transparent ">
        <MedicalRecordEdit currentPatient={currentPatient} />
      </div>
    </div>
  ));

  // Mostafa
  const SkeletonReviews = React.memo(() => (
    <>

    </>
  ));
  const SkeletonPatient = React.memo(() => (
    <>

    </>
  ));

  // Yara
  const SkeletonDoctor = React.memo(() => (
    <>

    </>
  ));
  const SkeletonAppointment = React.memo(() => (
    <>

    </>
  ));


  return (
    <>
      {hasAccess ?
        <div>
          <NavbarLanding />
          <div className='flex h-[800px]'>
            <AdminSideBar section={section} setSection={setSection} tabs={sections} />
            {section === 0 && <SkeletonUser />}
            {section === 3 && <SkeletonMedicalRecord />}
          </div>

        </div> :
        <div className="text-8xl flex justify-center">Access Denied</div>}
    </>
  )
}

export default adminPanel