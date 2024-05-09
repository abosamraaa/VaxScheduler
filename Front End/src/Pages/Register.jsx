import { useState } from 'react'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [userName, setUserName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [userTypeId, setUserTypeId] = useState(3);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:5127/api/Auth/register', {
        email: email,
        password: password,
        phone: phone,
        age: age,
        userTypeId: userTypeId,
        userName:userName
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Login successful:', response.data);
      toast.success("Registered Successfully✅", {
        position: "top-center"
      });
      navigate("/login");
      // put your link here to navigate to your dashboard

    } catch (error) {
      toast.error(error, {
        position: "top-center"
      });
    }
  };



  return (
    <>
      <form onSubmit={handleSubmit} className='my-5 container form-box'>
        <div className='login-head'>
          <h2 className='fw-bold login-header text-center'>Sign Up</h2>
          <h3 className='login-continue'>Please Sign Up To Continue</h3>
          <h5 className='login-text'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since.</h5>
        </div>
        <div className='d-flex gap-4 mt-5'>
        </div>
        <div className='d-flex gap-4 mt-3'>
          <div className="mb-3 w-50">
            <input
              type="email"
              className="form-control form-input d-block mr-5"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3 w-50">
            <input
              type="text"
              className="form-control form-input"
              placeholder="Mobile Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>
        <div className='d-flex gap-4 mt-3'>
          <div className="mb-3 w-50">
            <input
              type="text"
              className="form-control form-input d-block mr-5"
              placeholder="User Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="mb-3 w-50">
            <input
              type="text"
              className="form-control form-input"
              placeholder="Date Of Birth"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
        </div>
        <div className='d-flex gap-4 mt-3'>
          <div className="mb-3 w-50">
            <input
              type="password"
              className="form-control form-input d-block mr-5"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className='text-center mt-4'>
          <button type="submit" className="form-btn btn-submit">Sign Up</button>
          <ToastContainer />
        </div>
      </form>
    </>
  )
}

export default Register;