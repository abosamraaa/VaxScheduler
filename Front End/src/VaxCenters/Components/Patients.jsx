import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";

function Patients() {
  const navigate = useNavigate();
  const [vaxCenters, setVaxCenters] = useState([]);
  const [vaxCenterId, setVaxCenterId] = useState(null);
  const [vaccines, setVaccines] = useState([]);
  const [reservations, setReservations] = useState([]);
  const token = sessionStorage.getItem("token");
  const [certificateStatus,setCertificateStatus] = useState("");
  const [reservationId,setReservationId] = useState("");
  if (!token || typeof token !== "string") {
    console.error("Invalid token");
    navigate("/login");
    return null;
  }

  let decoded;
  try {
    decoded = jwtDecode(token);
  } catch (error) {
    console.error("Error decoding token:", error);
    navigate("/login");
    return null;
  }

  const userId = parseInt(decoded.nameid, 10);

  const getAllVaxCenters = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5127/api/VaccinationCenter/getByOwnerId/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const centers = response.data?.$values || [];
      setVaxCenters(centers);

      if (centers.length > 0) {
        setVaxCenterId(centers[0].vaccinationCenterId); // Set the first center ID
      } else {
        setVaxCenterId(null); // No centers available
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to fetch vaccination centers",
        text: error.response?.data?.message || "An error occurred",
        confirmButtonText: "Okay",
      });
      console.error("Error fetching vaccination centers:", error);
    }
  };

  const getAllVaccines = async () => {
    if (!vaxCenterId) {
      return; // Only fetch vaccines if vaxCenterId is defined
    }

    try {
      const response = await axios.get(
        `http://localhost:5127/api/VaccinationCenter/getByVaccinationCenterId/${vaxCenterId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const vaccineData = response.data?.vaccines?.$values || [];
      setVaccines(vaccineData);

      // Fetch reservations for all vaccines
      const reservationPromises = vaccineData.map((vaccine) =>
        axios.get(
          `http://localhost:5127/api/Reservation/getByVaccineId/${vaccine.vaccineId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
      );

      const reservationResponses = await Promise.all(reservationPromises);
      const allReservations = reservationResponses.flatMap((response) => response.data?.$values || []);
      setReservations(allReservations);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to fetch vaccines or reservations",
        text: error.response?.data?.message || "An error occurred",
        confirmButtonText: "Okay",
      });
      console.error("Error fetching vaccines or reservations:", error);
    }
  };

  useEffect(() => {
    getAllVaxCenters();
    getCertificate(); 
    // Fetch vaccination centers on component mount
  }, []); 

  useEffect(() => {
    if (vaxCenterId) {
      getAllVaccines(); // Fetch vaccines if vaxCenterId is set
    }
  }, [vaxCenterId]); 
  const approvedReservation = async(reservationId)=>{
    try {
        const response = await axios.put(`http://localhost:5127/api/Reservation/update/${reservationId}`,        {
            reservationStatus : 1 ,
            approvedBy : userId
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
          getAllVaccines();
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
console.log(reservations)
const getCertificate = async()=>{
  try{
    const response = await axios.get(`http://localhost:5127/api/Certificate/getAll`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    console.log(response.data)
  }catch(error){
    console.log(error)
  }
}
const declineReservation = async(reservationId)=>{
    try {
        const response = await axios.put(`http://localhost:5127/api/Reservation/update/${reservationId}`,        {
            reservationStatus : -1 ,
            approvedBy : userId
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
          getAllVaccines();
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
  return (
    <>
      <table className="table text-center">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">User Name</th>
            <th scope="col">Vaccine Name</th>
            <th scope="col">Reservation Date</th>
            <th scope="col">Dose Number</th>
            <th scope="col">Reservation Status</th>
            <th scope="col">Certificate Status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reservations.length > 0 ? (
            reservations.map((reservation) => {
              const userName = reservation.userDtos?.$values?.[0]?.userName || "Unknown";
              const vaccineName = vaccines.find((v) => v.vaccineId === reservation.vaccineId)?.vaccineName || "N/A";

              let statusText;
              switch (reservation.reservationStatus) {
                case 0:
                  statusText = "Pending";
                  break;
                case 1:
                  statusText = "Approved";
                  break;
                case -1:
                  statusText = "Declined";
                  break;
                default:
                  statusText = "Unknown";
              }

              return (
                <tr key={reservation.reservationId}>
                  <th scope="row">{reservation.reservationId}</th>
                  <td>{userName}</td>
                  <td>{vaccineName}</td>
                  <td>{reservation.reservationDate}</td>
                  <td>{reservation.doseNumber}</td>
                  <td>{statusText}</td>
                  {reservation.isVaccinated === 1 ?
                  <td>
                    <button onClick={reservation.reservationId}>
                      <Link to={`/uploadcertificate/${reservation.reservationId}`}>Upload certificate</Link></button></td>
: <td>no certificate available</td>}
                  <td>
                    <button
                      className="btn btn-warning"
                      onClick={()=>{approvedReservation(reservation.reservationId)}}
                    >
                        Approve
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={()=>{
                        declineReservation(reservation.reservationId)
                    }}
                    >
                        Decline
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={7}>No reservations found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

export default Patients;
