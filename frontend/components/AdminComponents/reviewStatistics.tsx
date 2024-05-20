import React, { useEffect, useState } from 'react'

const reviewStatistics = () => {
    const [countUsers, setCountUsers] = useState<any>()
    const [countDoctors, setCountDoctors] = useState<any>()
    const [countPatients, setCountPatients] = useState<any>()
    const [totalPrice, setTotalPrice] = useState<any>()

    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
    };
    async function fetchNumUsers() {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_NAME}/get/Number/of/users/${localStorage.getItem("userId")}?token=${localStorage.getItem("accessToken")}`,
            { headers }
        );
        if (!response.ok) {
            console.log("Error: Request sent no data")
        }
        const data = await response.json();
        setCountUsers(data);

    };
    async function fetchTotalPrice() {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_NAME}/get/doctors/total/price/${localStorage.getItem("userId")}?token=${localStorage.getItem("accessToken")}`,
            { headers }
        );
        if (!response.ok) {
            console.log("Error: Request sent no data")
        }
        const data = await response.json();
        setTotalPrice(data);
    };

    async function fetchNumDoctors() {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_NAME}/get/Number/of/doctors/${localStorage.getItem("userId")}?token=${localStorage.getItem("accessToken")}`,
            { headers }
        );
        if (!response.ok) {
            console.log("Error: Request sent no data")
        }
        const data = await response.json();
        setCountDoctors(data);

    };
    async function fetchNumPatients() {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_NAME}/get/Number/of/patients/${localStorage.getItem("userId")}?token=${localStorage.getItem("accessToken")}`,
            { headers }
        );
        if (!response.ok) {
            console.log("Error: Request sent no data")
        }
        const data = await response.json();
        setCountPatients(data);

    };

    useEffect(() => {
        fetchNumUsers()
        fetchTotalPrice()
        fetchNumDoctors()
        fetchNumPatients()
    }, []);
    return (
        <div className='flex flex-col space-y-4'>
            <div>
                <div>total number of Users: {countUsers?.totalNumberOfCustomers + countUsers?.totalNumberOfAdmins + countUsers?.totalNumberOfStaff}</div>
                <div>total number of Customers: {countUsers?.totalNumberOfCustomers}</div>
                <div>total number of Admins: {countUsers?.totalNumberOfAdmins}</div>
                <div>total number of Staff: {countUsers?.totalNumberOfStaff}</div>
            </div>

            <div>total number of Doctors: {countDoctors?.totalNumberOfDoctors}</div>

            <div>total number of Patients: {countPatients?.totalNumberOfPatients}</div>
            <div>
                <div>total revenue generated: {totalPrice?.totalPrice}</div>
                <div>total profit generated: {totalPrice?.totalPrice * 0.6}</div>
            </div>

        </div>
    )
}

export default reviewStatistics