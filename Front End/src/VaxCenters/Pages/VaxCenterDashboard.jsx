import logoProject from 'D:/VaxScheduler/VaxScheduler/public/images/beta.png'
import menu from 'D:/VaxScheduler/VaxScheduler/public/images/menu.png'
import profile from 'D:/VaxScheduler/VaxScheduler/public/images/user.png'
import Patients from 'D:/VaxScheduler/VaxScheduler/public/images/patient.png'
import centers from 'D:/VaxScheduler/VaxScheduler/public/images/hospital.png'
import vaccines from 'D:/VaxScheduler/VaxScheduler/public/images/medicine.png'
import addItem from 'D:/VaxScheduler/VaxScheduler/public/images/add-item.png'
import { Link, Route,Routes } from 'react-router-dom'
function VaxCenterDashboard(){
    return(
        <>
        <div className='main d-flex'>
        <div className='menu-dashboard'>
            <Link to={"/patients"} className='menu-button link'>
                <img src={Patients} alt="" srcset=""className='admindash-header-logo' />
                <p>Patients</p>
            </Link>
            {/* <Link to={"/admin-dashboard/Vacines"} className='menu-button link'>
                <img src={vaccines} alt="" srcset="" className='admindash-header-logo'/>
                <p>Vaccines</p>
            </Link>
            <Link className='menu-button link' to={'/admin-dashboard/Registrations'}>
                <img src={customer}  className='admindash-header-logo'/>
                <p>Registrations</p>
            </Link>
            <Link className='menu-button link' to={"/admin-dashboard/addVacine"}>
                <img src={addItem}  className='admindash-header-logo'/>
                <p>Add Vacine</p>
            </Link>
            <Link className='menu-button link' to={"/admin-dashboard/addVaxCenter"}>
                <img src={addItem}  className='admindash-header-logo'/>
                <p>Add Vaccination Center</p>
            </Link> */}
        </div>
        </div>
        </>
    );
}
export default VaxCenterDashboard;