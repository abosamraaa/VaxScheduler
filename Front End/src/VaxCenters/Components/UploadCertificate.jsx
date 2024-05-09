import axios from "axios";
import { useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode"; 

function UploadCertificate(){
    const [issuedDate,setIssuedDate] = useState(new Date().toISOString().slice(0, 10));
    const [content,setContent] = useState("");
    const { reservationId } = useParams();
    const token = sessionStorage.getItem("token");
    const navigate = useNavigate();
    if (!token || typeof token !== "string") {
      console.error("Invalid token");
      navigate("/login");
      return null; // Exit early if there's no valid token
    }
  
    let decoded;
    try {
      decoded = jwtDecode(token);
    } catch (error) {
      console.error("Error decoding token:", error);
      navigate("/login");
      return null; // Exit early if decoding fails
    }
    const createCertificate = async()=>{
        try{
            const response = await axios.post("http://localhost:5127/api/Certificate/create",{
                issuedDate:issuedDate,
                content:content,
                reservationId : reservationId
            },
            {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`,
                },
              }
        )
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Certificate Uploaded successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/patients")
        }catch(error){
            console.log(error)
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Failed to upload Certificate",
                showConfirmButton: false,
                timer: 1500,
              });
        }
    }
    const handleFormSubmit = ((e)=>{
        e.preventDefault();
        createCertificate();
    })
    return (
        <div className="p-3 container ">
          <form onSubmit={handleFormSubmit} className='post-form'>
            <div className="container row g-3">
              <div className="col-md-12">
                <label htmlFor="vaccinationCenterName" className="form-label">Certificate Content</label>
                <input
                  type="text"
                  className="form-control"
                  id="vaccinationCenterName"
                  onChange={(e) => setContent(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-12">
                <label htmlFor="address" className="form-label">Issued Date</label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  value={issuedDate}
                  disabled
                />
              </div>
              <div className="col-md-12">
                <label htmlFor="contactNumber" className="form-label">Reservation Id</label>
                <input
                  type="text"
                  className="form-control"
                  id="contactNumber"
                  value={reservationId}
                  disabled
                />
              </div>
              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-success">Create</button>
                <button type="reset" className="btn btn-danger">Reset</button>
              </div>
            </div>
          </form>
        </div>
      );
}
export default UploadCertificate;