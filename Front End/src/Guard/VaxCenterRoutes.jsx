import { Outlet, Routes ,Route ,Navigate , useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
function VaxCenterRoutes (){
    const token = sessionStorage.getItem("token");
    const navigate =  useNavigate();
    if (!token) {
      navigate("/login");
      return null; 
    }
  
    let decodedToken;
    try {
      decodedToken = jwtDecode(token);
    } catch (e) {
      console.error("Error decoding token:", e);
      navigate("/login");
      return null; // Return a fallback component or redirect
    }
  
    const userRole = decodedToken.role;
    console.log(userRole)
    if(userRole == 2){
      return(
        <Outlet/>
  )
    }else{
      return <Navigate to={"/unauthorized"}/>
    }
}
export default VaxCenterRoutes;