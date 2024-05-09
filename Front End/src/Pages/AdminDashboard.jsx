import logoProject from 'D:/VaxScheduler/VaxScheduler/public/images/beta.png'
import menu from 'D:/VaxScheduler/VaxScheduler/public/images/menu.png'
import profile from 'D:/VaxScheduler/VaxScheduler/public/images/user.png'
import customer from 'D:/VaxScheduler/VaxScheduler/public/images/customer.png'
import centers from 'D:/VaxScheduler/VaxScheduler/public/images/hospital.png'
import vaccines from 'D:/VaxScheduler/VaxScheduler/public/images/medicine.png'
import addItem from 'D:/VaxScheduler/VaxScheduler/public/images/add-item.png'
import { Link, Route,Routes } from 'react-router-dom'
import VaxCenters from '../Admin/Components/VaxCenters'
import Vacines from '../Admin/Components/Vacines'
import AddVacine from '../Admin/Components/AddVacine'
import Registrations from '../Components/Registerations'
import AddVaxCenter from '../Admin/Components/AddVaxCenter'
import UpdateVaxCenter from '../Admin/Components/UpdateVaxCenter'
import UpdateVaccine from '../Admin/Components/UpdateVaccine'
function AdminDashboard(){
    return(
        <>
        <div className='main d-flex'>
        <div className='menu-dashboard'>
            <Link to={"/admin-dashboard/VaxCenters"} className='menu-button link'>
                <img src={centers} alt="" srcset=""className='admindash-header-logo' />
                <p>Vaccination Centers</p>
            </Link>
            <Link to={"/admin-dashboard/Vacines"} className='menu-button link'>
                <img src={vaccines} alt="" srcset="" className='admindash-header-logo'/>
                <p>Vaccines</p>
            </Link>
            {/* <Link className='menu-button link' to={'/admin-dashboard/Registrations'}>
                <img src={customer}  className='admindash-header-logo'/>
                <p>Registrations</p>
            </Link> */}
            <Link className='menu-button link' to={"/admin-dashboard/addVacine"}>
                <img src={addItem}  className='admindash-header-logo'/>
                <p>Add Vacine</p>
            </Link>
            <Link className='menu-button link' to={"/admin-dashboard/addVaxCenter"}>
                <img src={addItem}  className='admindash-header-logo'/>
                <p>Add Vaccination Center</p>
            </Link>
        </div>
        <Routes>
            <Route path='/VaxCenters' element={<VaxCenters/>}/>
            <Route path='/Vacines' element={<Vacines/>}/>
            <Route path='/addVacine' element={<AddVacine/>}/>
            <Route path='/Registrations' element={<Registrations/>}/>
            <Route path='/addVaxCenter' element={<AddVaxCenter/>}/>
            <Route path='/updateVaxCenter/:vaccinationCenterId' element={<UpdateVaxCenter/>}/>
            <Route path='/updateVaccine/:vaccineId' element={<UpdateVaccine/>}/>
        </Routes>
        </div>
        </>
    );
}
export default AdminDashboard;