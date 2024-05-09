import React, { useEffect, useState } from "react";
import axios from 'axios';
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

function VaxCenters() {
  const token = sessionStorage.getItem('token');
  const [vaxCenters, setVaxCenters] = useState([]);

  const getAllVaxCenters = async () => {
    try {
      const response = await axios.get('http://localhost:5127/api/VaccinationCenter/getAll', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVaxCenters(response.data.$values || []);
      console.log(response.data.$values)
       // Fallback to empty array
    } catch (error) {
      console.error('Error fetching vaccination centers:', error);
      setVaxCenters([]); // Fallback in case of error
    }
  };

  useEffect(() => {
    getAllVaxCenters(); // Fetch data when component mounts
  }, []);

  const deleteVaxCenter = async (vaxCenterId) => {
    try {
      const response = await axios.delete(`http://localhost:5127/api/VaccinationCenter/delete/${vaxCenterId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Vaccination center deleted successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      getAllVaxCenters(); 
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Error deleting vaccination center",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <>
      <table className="table text-center">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Center Name</th>
            <th scope="col">Address</th>
            <th scope="col">Contact Number</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          {vaxCenters.length > 0 ? (
            vaxCenters.map((vaxCenter) => (
              <tr key={vaxCenter.vaccinationCenterId}>
                <th scope="row">{vaxCenter.vaccinationCenterId}</th>
                <td>{vaxCenter.name}</td>
                <td>{vaxCenter.address}</td>
                <td>{vaxCenter.contactNumber}</td>
                <td>
                  <Link to={`/admin-dashboard/updateVaxCenter/${vaxCenter.vaccinationCenterId}`} className="btn btn-warning">Update</Link>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => deleteVaxCenter(vaxCenter.vaccinationCenterId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>No vaccination centers found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

export default VaxCenters;


