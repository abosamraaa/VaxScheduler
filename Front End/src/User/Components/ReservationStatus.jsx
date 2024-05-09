import axios from 'axios';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode'; // Fix import
import { Link, useNavigate } from 'react-router-dom';

function ReservationStatus() {
  const token = sessionStorage.getItem('token');
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  const [vaccine, setVaccine] = useState(null);
  const [vaccineId, setVaccineId] = useState(null);
  const [reservationId, setReservationId] = useState(null);
  const [certificate,setCertificate] = useState("");
  // Redirect if token is missing or invalid
  if (!token) {
    navigate('/login');
    return null;
  }

  let decoded;
  try {
    decoded = jwtDecode(token);
  } catch (error) {
    console.error('Error decoding token:', error);
    navigate('/login');
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
      console.log('Fetched Reservations:', reservationsData);

      setReservations(reservationsData);

      if (reservationsData.length > 0) {
        const firstReservation = reservationsData[0];
        setVaccineId(firstReservation.vaccineId);
        setReservationId(firstReservation.reservationId);
      }
    } catch (error) {
      console.error('Error fetching reservations:', error);
    }
  };

  const getVaccine = async () => {
    if (vaccineId === null) {
      return; // If vaccineId is null, do nothing
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
      setVaccine(response.data.vaccine);
      console.log('Fetched Vaccine:', response.data.vaccine);
    } catch (error) {
      console.error('Error fetching vaccine:', error);
    }
  };

  const getCertificate = async () => {
    if (reservationId === null) {
      console.warn('Cannot fetch certificate without a valid reservationId');
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5127/api/Certificate/getById/${reservationId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
        },
      }
      );
      console.log('Fetched Certificate:', response.data);
      setCertificate(response.data.$values[0]);
    } catch (error) {
      console.error('Error fetching certificate:', error);
    }
  };

  // Fetch reservations once on component mount
  useEffect(() => {
    getReservations();
  }, []);

  // Fetch vaccine details when vaccineId changes
  useEffect(() => {
    getVaccine();
  }, [vaccineId]);

  // Fetch certificate when reservationId changes
  useEffect(() => {
    getCertificate();
  }, [reservationId]);

  return (
    <div className="cards-containerr mt-5 mb-5">
      <div className="mb-3 text-center">
        <h1>Your Reservations</h1>
      </div>
      {reservations.length === 0 ? (
        <p>No reservations found.</p>
      ) : (
        reservations.map((res) => (
          <div className="card center-card col-12" key={res.reservationId}>
            <div className="card-body">
              <h5 className="card-title">Dose Number: {res.doseNumber}</h5>
              <p className="card-text">
                Status: {res.reservationStatus === 0 ? 'Pending' : res.reservationStatus === 1 ? 'Approved' : 'Declined'}
              </p>
              <p>Reservation Date: {res.reservationDate}</p>
              <p>Reservation Id: {res.reservationId}</p>
              <p>Vaccine Details: {vaccine ? vaccine.name : 'Fetching...'}</p>
              {res.isVaccinated == 1? <Link to={`/certificate/${res.reservationId}`}>Show Certificate</Link> : <p></p>}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ReservationStatus;
