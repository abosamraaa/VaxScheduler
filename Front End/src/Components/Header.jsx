import logoProject from 'D:/VaxScheduler/VaxScheduler/public/images/beta.png'
import { Link, useNavigate } from 'react-router-dom';
import Profile from 'D:/Beta-E-commerce/Beta-E-commerce/public/Images/user.png';
import Logout from 'D:/Beta-E-commerce/Beta-E-commerce/public/Images/turn-off.png';
function Header(){
    const token = sessionStorage.getItem('token');
    const navigate  = useNavigate();
    const handleLogout = ()=>{
        sessionStorage.removeItem('token');
        navigate('/login');
    }
    return(
        <div className='main-header d-flex justify-content-between'>
            <div className='d-flex align-items-center'>
                <img src={logoProject}  className='admindash-header-logo'/>
                <h1>BETA VAX</h1>
            </div>
            {token ? (
                <div className='d-flex btns-loggedin align-items-center gap-3'>
                <Link> <img src={Profile}   className=''/></Link>
                <Link onClick={handleLogout}><img src={Logout}   className=''/></Link>
                        </div>
            ) : (
                <div className='d-flex header-btns align-items-center gap-3'>
                <Link to={"/createNewAccount"} className='button-header sign-up'>Sign Up</Link>
                <Link to={"/login"} className='button-header'>Login</Link>
            </div>
            )}

        </div>
    );
}
export default Header;