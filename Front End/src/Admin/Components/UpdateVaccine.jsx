import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';
import axios from 'axios';
import '../Css/AdminPages.css'
function UpdateVaccine() {
  const { vaccineId } = useParams();
  const [vaccineName, setVaccineName] = useState('');
  const [description, setDescription] = useState('');
  const [precautions, setPrecautions] = useState('');
  const [gapBetweenDoses, setGapBetweenDoses] = useState('');
  const [vaxCenterId,setVaxCenterId] = useState("");
  const navigate = useNavigate();

  const token = sessionStorage.getItem('token');

  // Check if token is valid
  if (!token || typeof token !== 'string') {
    console.error('Invalid token');
    navigate('/login');
    return null;
  }

  let decoded;
  try {
    decoded = jwtDecode(token); // Attempt to decode the token
  } catch (error) {
    console.error('Error decoding token:', error);
    navigate('/login'); // Redirect to login if decoding fails
    return null; // Return nothing since there's no valid token
  }


  useEffect(() => {
    fetch(`http://localhost:5127/api/Vaccine/getById/${vaccineId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch vaccination center');
        }
        return res.json();
      })
      .then((json) => {
        setVaccineName(json.vaccine.name);
        setDescription(json.vaccine.description);
        setPrecautions(json.vaccine.precautions);
        setGapBetweenDoses(json.vaccine.gapBetweenDoses);
        setVaxCenterId(json.vaccine.vaccinationCenterID)
        console.log(json)
      })
      .catch((error) => {
        console.error('Error fetching vaccination center:', error);
      });
  }, [vaccineId, token]);

  const updateVaccine = async () => {
    try {
      await axios.put(
        `http://localhost:5127/api/Vaccine/update/${vaccineId}`,
        {
            vaccineName: vaccineName,
            description : description,
            precautions : precautions,
            gapBetweenDoses: parseInt(gapBetweenDoses, 10),
            vaccinationCenterID: vaxCenterId
        },
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
        title: 'Vaccination Center updated successfully',
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error)
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Failed to update Vaccination Center',
        text: error.response?.data?.message || 'An error occurred',
        showConfirmButton: true,
      });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log()
    updateVaccine();
  };

  return (
    <div className="p-3 container" >
      <form onSubmit={handleFormSubmit} className='post-form'>
        <div className="container row g-3">
          <div className="col-md-12">
            <label htmlFor="vaccinationCenterName" className="form-label">Vaccine Name</label>
            <input
              type="text"
              className="form-control"
              id="vaccinationCenterName"
              value={vaccineName}
              onChange={(e) => setVaccineName(e.target.value)}
            />
          </div>
          <div className="col-md-12">
            <label htmlFor="vaccinationCenterName" className="form-label">Description</label>
            <input
              type="text"
              className="form-control"
              id="vaccinationCenterName"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="col-md-12">
            <label htmlFor="address" className="form-label">Precautions</label>
            <input
              type="text"
              className="form-control"
              id="address"
              value={precautions}
              onChange = {(e) => setPrecautions(e.target.value)}
            />
          </div>
          <div className="col-md-12">
            <label htmlFor="contactNumber" className="form-label">Gap between Doses</label>
            <input
              type="text"
              className="form-control"
              id="contactNumber"
              value={gapBetweenDoses}
              onChange = {(e) => setGapBetweenDoses(e.target.value)}
            />
          </div>
          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-success" style={{background : "#21293a" ,  border : "#21293a"}}>Update</button>
            <button type="reset" className="btn btn-danger">Reset</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UpdateVaccine;






