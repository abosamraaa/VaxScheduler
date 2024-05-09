import AdminDashboard from './Pages/AdminDashboard'
import './App.css'
import VaxCenters from './Admin/Components/VaxCenters.jsx'
import RegisterCenters from './User/Components/RegisterCenters.jsx';
import UserHome from './User/Pages/UserHome.jsx';
import { Route, Routes } from 'react-router-dom';
import AppointmentRegisteration from './User/Pages/AppointmentRegisteration.jsx';
import Register from './Pages/Register.jsx';
import Header from './Components/Header.jsx';
import Footer from './Components/Footer.jsx';
import Login from './Pages/Login.jsx';
import AdminRoutes from './Guard/AdminRoutes.jsx';
import PatientRoutes from './Guard/PatientRoutes.jsx';
import Vacines from './Admin/Components/Vacines.jsx';
import AddVacine from './Admin/Components/AddVacine.jsx'
import Registrations from './Components/Registerations'
import UnAuthorized from './Pages/UnAuthorized.jsx';
import UpdateVaxCenter from './Admin/Components/UpdateVaxCenter.jsx';
import ReservationStatus from './User/Components/ReservationStatus.jsx';
import AddVaxCenter from './Admin/Components/AddVaxCenter.jsx';
import VaxCenterRoutes from './Guard/VaxCenterRoutes.jsx';
import VaxCenterDashboard from './VaxCenters/Pages/VaxCenterDashboard.jsx';
import Patients from './VaxCenters/Components/Patients.jsx';
import Certificate from './User/Components/Certificate.jsx';
import UploadCertificate from './VaxCenters/Components/UploadCertificate.jsx';
import UpdateVaccine from './Admin/Components/UpdateVaccine.jsx';
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/createNewAccount' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>

        <Route element={<AdminRoutes />}>
          <Route path='/admin-dashboard/*' element={<AdminDashboard />} />
        </Route>
        <Route element={<PatientRoutes />} >
          <Route path='/' element={<UserHome />}></Route>
          <Route path='/registercenters' element={<RegisterCenters />} />
          <Route path='/registervacine/:vaxCenterId' element={<AppointmentRegisteration />} />
          <Route path='/trackreservation' element={<ReservationStatus />} />
          <Route path='/certificate/:reservationId' element={<Certificate />} />
        </Route>
        <Route element={<VaxCenterRoutes />} >
          <Route path='/center-dashboard/*' element={<VaxCenterDashboard />} />
          <Route path='/patients' element={<Patients/>} />
          <Route path='/uploadcertificate/:reservationId' element={<UploadCertificate/>} />
        </Route>
        <Route path="/unauthorized" element={<UnAuthorized />}></Route>
      </Routes>
      <Footer />
    </>
  )
}


export default App;
