import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
function Registrations (){
    const [reservations,setReservations] = useState([]);
    const token = sessionStorage.getItem('token')
    useEffect(()=>{
        getAllRegistrations();
    },[])
    const approvedReservation = async(reservationId)=>{
        try {
            const response = await axios.put(`http://localhost:5127/api/Reservation/update/${reservationId}`,        {
                reservationStatus : 1 
              }, {
              headers: { Authorization: `Bearer ${token}` },
            });
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Vaccination Center updated successfully',
                showConfirmButton: false,
                timer: 1500,
              });
              getAllRegistrations();
          } catch (error) {
            console.error('Error fetching vaccination centers:', error);
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Failed to update Vaccination Center',
                text: error.response?.data?.message || 'An error occurred',
                showConfirmButton: true,
              });
          }
    }
    const declineReservation = async(reservationId)=>{
        try {
            const response = await axios.put(`http://localhost:5127/api/Reservation/update/${reservationId}`,        {
                reservationStatus : -1 
              }, {
              headers: { Authorization: `Bearer ${token}` },
            });
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Vaccination Center updated successfully',
                showConfirmButton: false,
                timer: 1500,
              });
              getAllRegistrations();
          } catch (error) {
            console.error('Error fetching vaccination centers:', error);
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Failed to update Vaccination Center',
                text: error.response?.data?.message || 'An error occurred',
                showConfirmButton: true,
              });
          }
    }
    const getAllRegistrations = async () => {
        try {
          const response = await axios.get('http://localhost:5127/api/Reservation/getAll', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setReservations(response.data.$values || []);
          console.log(response.data.$values)
           // Fallback to empty array
        } catch (error) {
          console.error('Error fetching vaccination centers:', error);
          setReservations([]); // Fallback in case of error
        }
      };
    return(
        <>
        <table className="table text-center">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Dose Number</th>
                        <th scope="col">Resgisteration Status</th>
                        <th scope="col">Resgisteration Date</th>
                        <th scope="col">Handle</th>
                    </tr>
                </thead>
                <tbody>
                    {reservations.map((reservation) => (
                        <tr key={reservation.id}>
                            <th scope="row">{reservation.reservationId}</th>
                            <td>{reservation.doseNumber}</td>
                            <td>    { reservation.reservationStatus === 0
                               ? 'Pending'
                             : reservation.reservationStatus === 1
                         ? 'Approved'
                        : 'Declined'
    }</td>

                            <td>
                                {reservation.reservationDate}
                            </td>
                            <td>
                                <button type="button" className="btn btn-primary" onClick={()=>{approvedReservation(reservation.reservationId)}}>Approve</button>
                                <button type="button" className="btn btn-danger" onClick={()=>{
                                    declineReservation(reservation.reservationId)
                                }}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
export default Registrations;