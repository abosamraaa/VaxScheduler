import AdminDashboard from './Pages/AdminDashboard.jsx'
import VaxCenters from './Admin/Components/VaxCenters.jsx'
import RegisterCenters from './User/Components/RegisterCenters.jsx';
import UserHome from './User/Pages/UserHome.jsx';
import { Route, Routes } from 'react-router-dom';
import AppointmentRegisteration from './User/Pages/AppointmentRegisteration.jsx';
import Register from './Pages/Register.jsx';
import Vacines from './Admin/Components/Vacines.jsx';
import AddVacine from './Admin/Components/AddVacine.jsx'
import Registrations from './Components/Registerations'
import Login from './Pages/Login.jsx';
import AdminRoutes from './Guard/AdminRoutes.jsx';
import PatientRoutes from './Guard/PatientRoutes.jsx';
import VaxCenterRoutes from './Guard/VaxCenterRoutes.jsx';

function RoutesCustom(){
    <Routes>
        <Route path='/' element={<UserHome/>}></Route>
        <Route path='/createNewAccount' element={<Register/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route element={<PatientRoutes/>}>
        <Route path='/registervacine/:vaxcenterId' element={<AppointmentRegisteration/>}></Route>
        <Route path='/vaxcenters' element={<RegisterCenters/>}></Route>
        </Route>
        <Route element={<AdminRoutes/>}>
        <Route path='/admin-dashboard/*' element={<AdminDashboard/>}></Route>
        <Route path='/VaxCenters' element={<VaxCenters/>}/>
            <Route path='/Vacines' element={<Vacines/>}/>
            <Route path='/addVacine' element={<AddVacine/>}/>
            <Route path='/Registrations' element={<Registrations/>}/>
        </Route>
        <Route element={<VaxCenterRoutes/>}></Route>
    </Routes>
}
export default RoutesCustom;