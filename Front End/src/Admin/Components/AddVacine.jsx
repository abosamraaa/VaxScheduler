import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; 
import Swal from 'sweetalert2';
import '../Css/AdminPages.css';

function AddVaccine() {
  const navigate = useNavigate();
  const [vaccineName, setVaccineName] = useState('');
  const [description, setDescription] = useState('');
  const [precautions, setPrecautions] = useState('');
  const [gapBetweenDoses, setGapBetweenDoses] = useState('');
  const [selectedCenterId, setSelectedCenterId] = useState('');
  const [vaxCenters, setVaxCenters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const token = sessionStorage.getItem('token');

  useEffect(() => {
    if (!token || typeof token !== 'string') {
      Swal.fire({
        icon: 'error',
        title: 'Invalid session',
        text: 'Please log in again.',
      });
      navigate('/login');
      return;
    }

    try {
      const decoded = jwtDecode(token);
      // Additional token-based checks
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid token',
        text: 'Please log in again.',
      });
      navigate('/login');
      return;
    }

    const getAllVaxCenters = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5127/api/VaccinationCenter/getAll',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setVaxCenters(response.data.$values || []); 
      } catch (error) {
        console.error('Error fetching vaccination centers:', error);
        setVaxCenters([]); 
      } finally {
        setIsLoading(false); // Loading is done
      }
    };

    getAllVaxCenters(); // Fetch vaccination centers when component mounts
  }, [navigate, token]);

  const addVaccine = async () => {
    try {
      const payload = {
        vaccineName,
        description,
        precautions,
        gapBetweenDoses: parseInt(gapBetweenDoses, 10), // Ensure integer value
        vaccinationCenterID: selectedCenterId, // Pass the selected center ID
      };

      await axios.post(
        'http://localhost:5127/api/Vaccine/create',
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Vaccine created successfully',
        showConfirmButton: false,
        timer: 1500,
      });

      setVaccineName('');
      setDescription('');
      setPrecautions('');
      setGapBetweenDoses('');
      setSelectedCenterId('');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred';
      console.error('Error creating vaccine:', errorMessage);

      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Failed to add vaccine',
        text: errorMessage,
        showConfirmButton: true,
      });
    }
  };

  const formSubmit = (e) => {
    e.preventDefault();

    if (!vaccineName || !description || !precautions || !gapBetweenDoses || !selectedCenterId) {
      Swal.fire({
        icon: 'warning',
        title: 'Please fill in all required fields.',
      });
      return;
    }

    addVaccine(); 
  };


  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <div className="container mt-5 mb-5">
      <form onSubmit={formSubmit} className="row g-3 post-form">
        <div className="col-md-12">
          <label htmlFor="vaccineName" className="form-label">Vaccine Name</label>
          <input
            type="text"
            className="form-control"
            id="vaccineName"
            value={vaccineName}
            onChange={(e) => setVaccineName(e.target.value)}
          />
        </div>

        <div className="col-md-12">
          <label htmlFor="description" className="form-label">Description</label>
          <input
            type="text"
            class="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="col-md-12">
          <label htmlFor="precautions" className="form-label">Precautions</label>
          <input
            type="text"
            class="form-control"
            id="precautions"
            value={precautions}
            onChange = {(e) => setPrecautions(e.target.value)}
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="gapBetweenDoses" className="form-label">Gap Between Doses (days)</label>
          <input
            type="number"
            class="form-control"
            id="gapBetweenDoses"
            value={gapBetweenDoses}
            onChange = {(e) => setGapBetweenDoses(e.target.value)}
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="selectedCenterId" className="form-label">Vaccination Center</label>
          <select
            id="selectedCenterId"
            class="form-select"
            value={selectedCenterId}
            onChange = {(e) => setSelectedCenterId(e.target.value)}
          >
            <option value="">Select a center...</option>
            {vaxCenters.map((center) => (
              <option key={center.vaccinationCenterId} value={center.vaccinationCenterId}>
                {center.name}
              </option>
            ))}
          </select>
        </div>

        <div className="d-flex gap-2">
          <button type="submit" class="btn btn-success" style={{background : "#21293a" ,  border : "#21293a"}}>Add Vaccine</button>
          <button type="reset" class="btn btn-danger" onClick={() => navigate(-1)}>Cancel</button>
        </div>
      </form>
    </div>
    </>
  );
}

export default AddVaccine;





