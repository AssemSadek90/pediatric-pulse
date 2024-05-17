"use client"
import AddUser from '@/components/AdminComponents/AddUser';
import EditUser from '@/components/AdminComponents/EditUser';
import Table from '@/components/Table';
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

const adminPanel = () => {
  const router = useRouter();
  const [hasAccess, setHasAccess] = useState(false)
  const [userList, setUserList] = useState([{ userId: 0, firstName: "", lastName: "", email: "", userName: "", createdAt: "", phone: "", age: 0, profilePicture: "", role: "" }] as User[])
  const [openModalUserAdd, setOpenModalUserAdd] = useState(false)
  const [openModalUserEdit, setOpenModalUserEdit] = useState(false)
  const [userToDelete, setUserToDelete] = useState<any>()

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
  }
  async function handleEditUser(id: number) {
    setOpenModalUserEdit(true)
    fetchUser(id)
  }
  useEffect(() => {
    handlePageLoad()
    fetchUserList()
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
      <Table
        data={userList}
        height={800}
        width={1610}
        rowHeight={60}
        headers={headersUser}
        setAddModal={setOpenModalUserAdd}
        editHandler={handleEditUser}
        deleteHandler={handleDeleteUser}
        tableFor='User'
      />
    </>
  ));
  const SkeletonMedicalRecord = React.memo(() => (
    <>

    </>
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
        <div className="">
          <NavbarLanding />
          <SkeletonUser />
        </div> :
        <div className="text-8xl flex justify-center">Access Denied</div>}
    </>
  )
}

export default adminPanel