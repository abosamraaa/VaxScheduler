import { useParams, useNavigate } from "react-router-dom";
import "../Css/appointmentRegister.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"; // Fix the import
import Swal from "sweetalert2";

function AppointmentRegisteration() {
  const { vaxCenterId } = useParams();
  const navigate = useNavigate();

  const [doseNumber, setDoseNumber] = useState("");
  const [reservationDate, setReservationDate] = useState(new Date().toISOString().slice(0, 10));
  const [vaccines, setVaccines] = useState([]);
  const [selectedVaccine, setSelectedVaccine] = useState("");
  const [reservation,setReservation] = useState("")
  const convertSelectedVaccine = parseInt(selectedVaccine);
  // Check and decode the token
  const token = sessionStorage.getItem("token");
  if (!token || typeof token !== "string") {
    console.error("Invalid token");
    navigate("/login");
    return null; // Exit early if there's no valid token
  }

  let decoded;
  try {
    decoded = jwtDecode(token);
  } catch (error) {
    console.error("Error decoding token:", error);
    navigate("/login");
    return null; // Exit early if decoding fails
  }

  const userId = parseInt(decoded.nameid, 10); // Ensure proper type conversion
  const convertDoseNumber = parseInt(doseNumber);
  const reserveVaccine = async () => {
    console.log(reservation.reservationStatus);
    if (!reservation && convertDoseNumber === 2) {
      Swal.fire({
        icon: "error",
        title: "You can't reserve the second dose before reserve the first dose",
        confirmButtonText: "Okay",
      });
      return; // Stop the reservation attempt
    }else if (reservation && reservation.reservationStatus !== 1 ){
      Swal.fire({
        icon: "error",
        title: "You can't reserve the second dose before accepting the first dose",
        confirmButtonText: "Okay",
      });
      return;
    }
    try {
      const response = await axios.post(
        `http://localhost:5127/api/Reservation/createOrUpdate/${userId}`,
        {
          userId: userId,
          vaccineId: convertSelectedVaccine,
          doseNumber: convertDoseNumber,
          reservationDate: reservationDate,
          reservationStatus: 0,
          approvedBy: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Vaccine reservation created successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/"); // Redirect to home or dashboard upon success
    } catch (error) {
      if(error.response?.status === 400) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Cannot reserve the second dose before reserve the first dose",
          text: error.response?.data?.message || "An error occurred",
          showConfirmButton: true,
        });
      } else if (error.response?.status === 404) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Cannot reserve The Vaccine Again",
          text: error.response?.data?.message || "An error occurred",
          showConfirmButton: true,
        });
      }
      console.error("Error reserving vaccine:", error);
    }
  };

  const getAllVaccines = async () => {
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
      console.log(response.data?.vaccines?.$values)
       // Safely access the array of vaccines
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Failed to fetch vaccine data",
        text: error.response?.data?.message || "An error occurred",
        showConfirmButton: true,
      });
      console.error("Error fetching vaccine data:", error);
    }
  };
  const getReservation = async()=>{
    try{
        const response = await axios.get(`http://localhost:5127/api/Reservation/getByUserId/${userId}`,
        {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        setReservation(response.data.$values[0]);
        console.log(response.data.$values)
    }catch (error) {
      if (error.response?.status === 404) {
        Swal.fire({
          icon: "info",
          title: "No reservations found",
          text: "You don't have any existing reservations",
          confirmButtonText: "Okay",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error fetching reservation",
          text: error.response?.data?.message || "An error occurred",
          confirmButtonText: "Okay",
        });
        console.error("Error fetching reservation:", error);
      }
    }
}
  useEffect(() => {
    getAllVaccines();
    getReservation();
  }, []); // Only run once on component mount

  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    reserveVaccine(); // Call the function to create the reservation
  };

  return (
    <form className="register-form mt-5 mb-5" onSubmit={handleFormSubmit}>
      <div className="mb-3">
        <label htmlFor="doseNumber" className="form-label">
          Dose Number
        </label>
        <input
          type="text"
          className="form-control"
          id="doseNumber"
          placeholder="Dose Number"
          value={doseNumber}
          onChange={(e) => setDoseNumber(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="selectedVaccine" className="form-label">
          Select Vaccine
        </label>
        <select
          id="selectedVaccine"
          className="form-select"
          value={selectedVaccine}
          onChange={(e) => setSelectedVaccine(e.target.value)}
        >
          <option value="">Select a vaccine...</option>
          {vaccines.map((vaccine) => (
            <option key={vaccine.vaccineId} value={vaccine.vaccineId}>
              {vaccine.vaccineName}
            </option>
          ))}
        </select>
      </div>

      <div className="d-flex gap-2 justify-content-center">
        <button type="submit" className="btn btn-success">
          Register
        </button>
        <button
          type="button" // Change to "button" to avoid accidental form submission on cancel
          className="btn btn-danger"
          onClick={() => navigate(-1)}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
export default AppointmentRegisteration;