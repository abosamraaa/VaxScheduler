import { useEffect, useState, useRef } from "react";
import "../Css/certificate.css";
import { jwtDecode } from "jwt-decode"; // Import correctly
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Missing import for navigation

function Certificate() {
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate(); // To navigate if needed
  const [vaccine, setVaccine] = useState(null);
  const [vaccineId, setVaccineId] = useState(null);
  const [reservations, setReservations] = useState([]);
  
  if (!token) {
    navigate("/login"); // Redirect if token is missing
    return null;
  }

  let decoded;
  try {
    decoded = jwtDecode(token);
  } catch (error) {
    console.error("Error decoding token:", error);
    navigate("/login"); // Redirect if there's a decoding issue
    return null;
  }

  const userId = decoded.nameid;

  const getReservations = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5127/api/Reservation/getByUserId/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const reservationsData = response.data.$values;
      console.log("Fetched Reservations:", reservationsData);

      setReservations(reservationsData); // Set the reservations state

      if (reservationsData.length > 0) {
        setVaccineId(reservationsData[0].vaccineId); // Set vaccineId
      }
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };

  const getVaccine = async () => {
    if (vaccineId === null) {
      return; // If vaccineId is null, skip fetching
    }

    try {
      const response = await axios.get(
        `http://localhost:5127/api/Vaccine/getById/${vaccineId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setVaccine(response.data.vaccine); // Set the vaccine state
      console.log("Fetched Vaccine:", response.data.vaccine);
    } catch (error) {
      console.error("Error fetching vaccine:", error);
    }
  };

  useEffect(() => {
    getReservations(); // Fetch reservations on component mount
  }, []); // No dependency to run once on mount

  useEffect(() => {
    getVaccine(); // Fetch vaccine when vaccineId changes
  }, [vaccineId]); // Dependency on vaccineId

  return (
    <div className="cards-containerr pt-5">
      <div className="certificate">
        <div className="border-pattern">
          <div className="content">
            <div className="inner-content">
              <h1>COVID-19 Vaccination Certificate</h1>
              <h2>This Is To Certify That</h2>
              {reservations.length > 0 ? (
                <>
                  <h3>
                    {reservations[0]?.userDtos?.$values[0]?.userName}
                  </h3>
                  <p>Has Received {vaccine?.name} Vaccine</p>
                  <h3>At</h3>
                  <p>
                    {vaccine?.vaccinationCenter?.name} Vaccination Center
                  </p>
                  <h3>On</h3>
                  <p>March 15, 2021</p>
                </>
              ) : (
                <p>No reservation data</p>
              )}
              <div className="badge"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Certificate;
