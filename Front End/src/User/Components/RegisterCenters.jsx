import React, { useEffect, useState } from 'react';
import Spinner from '../../Components/Spinner';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'D:/VaxScheduler/VaxScheduler/src/User/Css/registerCenter.css';

function RegisterCenters() {
  const [vaxCenters, setVaxCenters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [current, setCurrent] = useState(1);
  const itemsPerPage = 4;
  const token = sessionStorage.getItem("token");
  const getAllVaxCenters = async()=>{
    try{
        const response = await axios.get('http://localhost:5127/api/VaccinationCenter/getAll',{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        console.log(response.data.$values)
        setVaxCenters(response.data.$values)
        setLoading(false)
    }
    catch(error){
        console.log(error);
    }
}

  useEffect(() => {
    getAllVaxCenters();
  }, []);

  const totalPages = Math.ceil(vaxCenters.length / itemsPerPage);
  const startIndex = (current - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, vaxCenters.length);
  const dataPerPage = vaxCenters.slice(startIndex, endIndex);

  if (loading) {
    return (
      <div className="text-center">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row gap-3 cards-container">
        {dataPerPage.map((vaxCenter) => (
          <div className="card center-card col-12" key={vaxCenter.vaccinationCenterId}>
            <div className="card-body">
              <h5 className="card-title">Center Name: {vaxCenter.name}</h5>
              <p className="card-text">Address: {vaxCenter.address}</p>
              {Array.isArray(vaxCenter.vaccines) &&
                vaxCenter.vaccines.map((vaccine, index) => (
                  <p className="card-text" key={index}>
                    {vaccine}
                  </p>
                ))}
              <Link
                className="btn btn-primary"
                to={`/registervacine/${vaxCenter.vaccinationCenterId}`}
                style={{ background: '#1c2331', border: '#1c2331' }}
              >
                Register Now
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-center mt-4">
        <nav aria-label="Pagination Navigation">
          <ul className="pagination">
            <li className={`page-item ${current === 1 ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => setCurrent(Math.max(1, current - 1))}
              >
                &laquo;
              </button>
            </li>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <li
                key={page}
                className={`page-item ${page === current ? 'active' : ''}`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrent(page)}
                >
                  {page}
                </button>
              </li>
            ))}

            <li className={`page-item ${current === totalPages ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => setCurrent(Math.min(totalPages, current + 1))}
              >
                &raquo;
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default RegisterCenters;



