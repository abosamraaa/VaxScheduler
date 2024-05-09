import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
function Vacines() {
    const [vacines, setVacines] = useState([]);
    const token = sessionStorage.getItem('token')
    const getAllVaccines = async()=>{
        try{
            const response = await axios.get('http://localhost:5127/api/Vaccine/getAll',{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(response.data)
            console.log(response.data)
            setVacines(response.data.vaccines.$values)

        }
        catch(error){
            console.log(error);
            console.log(response.data)
        }
    }
    const deleteVaccine = async (vaccineId) => {
        try{
            const response = await axios.delete(`http://localhost:5127/api/Vaccine/delete/${vaccineId}`,{
                headers:{
                    Authorization : `Bearer ${token}`
                }
            })
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "You deleted Successfully",
                showConfirmButton: false,
                timer: 1500
              });
              getAllVaccines();
        }catch(error){
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "There is an error when you delete",
                showConfirmButton: false,
                timer: 1500
              });
        }
    }

    useEffect(() => {
        getAllVaccines();
    }, []);

    return (
        <>
            <table className="table text-center table-box">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Precautions</th>
                        <th scope="col">Gap Between Doses</th>
                        <th scope="col">Handle</th>
                    </tr>
                </thead>
                <tbody>
                    {vacines.map((vacine) => (
                        <tr key={vacine.vaccineId}>
                            <th scope="row">{vacine.vaccineId}</th>
                            <td>{vacine.vaccineName}</td>
                            <td>{vacine.description}</td>
                            <td>{vacine.precautions}</td>
                            <td>{vacine.gapBetweenDoses} day</td>
                            <td>
                                <Link  className="btn btn-warning" to={`/admin-dashboard/updateVaccine/${vacine.vaccineId}`}>Update</Link>
                                <button type="button" className="btn btn-danger" onClick={() => {
                                    deleteVaccine(vacine.vaccineId)
                                }}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default Vacines;


