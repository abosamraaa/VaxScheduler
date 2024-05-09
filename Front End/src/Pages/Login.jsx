import { React, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5127/api/auth/login', {
        email: email, 
        password: password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Login successful:', response.data);
      console.log(response.data.token);
      const token = response.data.token;
      sessionStorage.setItem("token",token);
      const decode = jwtDecode(token);
      console.log(decode.role)
      console.log(decode.nameId)
      const role = decode.role;
      const isAdmin = role && (role == 1);
      const isVaxCenter = role && (role == 2);
      const isPatient = role && (role == 3);
      console.log(isAdmin)
      console.log(isVaxCenter)
      console.log(isPatient)
      console.log(decode.role)
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "You logined Successfully",
        showConfirmButton: false,
        timer: 1500
      });
      if(isAdmin){
        console.log("sddshgfsdhfh")
        navigate("/admin-dashboard");
      }else if (isVaxCenter){
        navigate("/center-dashboard");
      }else{
        navigate("/");
      }

    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Incorrect Password or Incorrect Email",
        showConfirmButton: false,
        timer: 1500
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className='my-5 container form-box'>
        <div className='login-head'>
          <h2 className='fw-bold login-header'>Sign In</h2>
          <h3 className='login-continue'>Please Login To Continue</h3>
        </div>
        <div className='d-flex align-items-center text-center'>
          <div className='w-50 form-fields'>
            <div className="mb-5">
              <input 
              type="email" 
              className="form-control form-input" 
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-5">
              <input 
              type="password" 
              className="form-control form-input" 
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className='text-center'>
              <button type="submit" className="form-btn btn-submit">Sign In</button>
              <ToastContainer />
            </div>
          </div>
          {/* <div className='w-50 form-img'>
            <img src={formPhoto} alt="FormPhoto" />
          </div> */}
        </div>
      </form>
    </>
  );
};

export default Login; // Export as default
