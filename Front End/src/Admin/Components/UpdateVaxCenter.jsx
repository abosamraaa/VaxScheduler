import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';
import axios from 'axios';
import '../Css/AdminPages.css'
function UpdateVaxCenter() {
  const { vaccinationCenterId } = useParams();
  const [vaccinationCenterName, setVaccinationCenterName] = useState('');
  const [address, setAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('');
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

  const vCenterOwnerId = decoded.nameid;

  useEffect(() => {
    fetch(`http://localhost:5127/api/VaccinationCenter/getByVaccinationCenterId/${vaccinationCenterId}`, {
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
        setVaccinationCenterName(json.name);
        setAddress(json.address);
        setContactNumber(json.contactNumber);
      })
      .catch((error) => {
        console.error('Error fetching vaccination center:', error);
        
      });
  }, [vaccinationCenterId, token]);

  const updateVaxCenter = async () => {
    try {
      await axios.put(
        `http://localhost:5127/api/VaccinationCenter/update/${vaccinationCenterId}`,
        {
          VaccinationCenterName: vaccinationCenterName,
          Address: address,
          ContactNumber: contactNumber,
          VCenterOwnerId: vCenterOwnerId,
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
    updateVaxCenter();
  };

  return (
    <div className="p-3 container mt-5 mb-5" >
      <form onSubmit={handleFormSubmit} className='post-form'>
        <div className="container row g-3">
          <div className="col-md-12">
            <label htmlFor="vaccinationCenterName" className="form-label">Vaccination Center Name</label>
            <input
              type="text"
              className="form-control"
              id="vaccinationCenterName"
              value={vaccinationCenterName}
              onChange={(e) => setVaccinationCenterName(e.target.value)}
            />
          </div>
          <div className="col-md-12">
            <label htmlFor="address" className="form-label">Address</label>
            <input
              type="text"
              className="form-control"
              id="address"
              value={address}
              onChange = {(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="contactNumber" className="form-label">Contact Number</label>
            <input
              type="text"
              className="form-control"
              id="contactNumber"
              value={contactNumber}
              onChange = {(e) => setContactNumber(e.target.value)}
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

export default UpdateVaxCenter;
