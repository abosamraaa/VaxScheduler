import landing from 'D:/VaxScheduler/VaxScheduler/public/images/Landing.png'
import vacineImg from 'D:/VaxScheduler/VaxScheduler/public/images/vacine.jpg'
import doctor1 from 'D:/VaxScheduler/VaxScheduler/public/images/doctor1.jpg'
import doctor2 from 'D:/VaxScheduler/VaxScheduler/public/images/doctor2.jpg'
import "../Css/landing.css"
import { Link } from 'react-router-dom';
function Landing() {
  return (
    <>
      <div className='container'>
        <div className="row pb-5 gx-0">
          <div className="col-6 mt-5 landing-info">
            <h3>Beta Center For Vacines</h3>
            <p>We are Since 2023</p>
            <div className='landing-buttons d-flex  gap-3'>
              <Link className='link' to={"/registercenters"}>Apply For Vacince</Link>
              <Link className='link' to={"/trackreservation"}>Track Your Reservation</Link>
            </div>
          </div>
          <div className="col-6 mt-5 caro">
            <div id="carouselExample" class="carousel slide">
              <div className="carousel-inner ">
                <div className="carousel-item active">
                  <img src={vacineImg} className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                  <img src={doctor2} className="d-block w-100" alt="..." />
                </div>
                <div class="carousel-item">
                  <img src={doctor1} className="d-block w-100" alt="..." />
                </div>
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Landing;