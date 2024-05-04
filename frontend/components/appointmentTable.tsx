import React from 'react';
interface Doctor {
  title: string;
  link: string;
  thumbnail: string;
  numberOfReviews: number;
  avarageRating: number;
};
const DoctorAppointmentTable = ({ doctorList }: { doctorList: Doctor[] | undefined }) => {
  const appointments = [
    { day: 'Sunday', time: 9, available: true },
    { day: 'Sunday', time: 10, available: true },
    { day: 'Sunday', time: 11, available: true },
    { day: 'Monday', time: 9, available: true },
    { day: 'Monday', time: 10, available: true },
    { day: 'Tuesday', time: 9, available: true },
  ];

  const renderTable = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];
    const hours = Array.from({ length: 9 }, (_, index) => index + 9);

    return (
      <table className='w-full h-full p-2 border border-neutral-200 rounded-t-3xl bg-neutral-50'>
        <thead className='border border-neutral-200 rounded-t-3xl p-2'>
          <tr className='border border-neutral-200 rounded-t-3xl p-2'>
            <th className='border border-neutral-200 rounded-t-3xl p-2'>Time</th>
            {days.map((day) => (
              <th className='border border-neutral-200 rounded-t-3xl p-2' key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody className='border border-neutral-200 p-2 bg-neutral-50'>
          {hours.map((hour) => (
            <tr className='border border-neutral-200 p-2' key={hour}>
              <td className='border border-neutral-200 p-2'>{`${hour}:00`}</td>
              {days.map((day) => {
                const appointment = appointments.find(
                  (appt) => appt.day === day && appt.time === hour
                );
                return (
                  <td
                    key={`${day}-${hour}`}
                    style={{ backgroundColor: appointment && appointment.available ? '#ecfccb' : '#fee2e2' }}
                    className='border border-neutral-200 p-2'
                  >
                    {appointment && appointment.available ? 'Available' : 'Not Available'}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className='w-full h-full p-4'>
      {renderTable()}
    </div>
  );
};

export default DoctorAppointmentTable;
