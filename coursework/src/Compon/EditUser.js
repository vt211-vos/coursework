import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";

function EditUser(){
    const navigate = useNavigate()
    const [inputs, setInputs] = useState({})

    const {id} =useParams()
    useEffect(()=>{
        getUsers();
    },[])
    function getUsers(){
        axios.get(`http://api/user/${id}`).then(function (response){
            console.log(response.data)
            setInputs(response.data)
        })
    }
    function handleChange(e){
        const name = e.target.name
        const value = e.target.value
        setInputs(values=>({...values, [name]:value}))
    }
    function handleSubmit(e){
        e.preventDefault()
        axios.put(`http://api/user/${id}/edit`, inputs).then(function (response){
            console.log((response.data))
            navigate("/")
        })
    }
    return(
        <div>
            <h1>List Users</h1>
            <form onSubmit={handleSubmit}>
                <table>
                    <tbody>
                    <tr>
                        <th>
                            <label>Name:</label>
                        </th>
                        <td>
                            <input defaultValue={inputs.name} type="text" name='name' onChange={handleChange}/>
                        </td>
                    </tr>
                    </tbody>
                    <tbody>
                    <tr>
                        <th>
                            <label>Email:</label>
                        </th>
                        <td>
                            <input defaultValue={inputs.email} type="text" name='email' onChange={handleChange}/>
                        </td>
                    </tr>
                    </tbody>
                    <tbody>
                    <tr>
                        <th>
                            <label>Mobile:</label>
                        </th>
                        <td>
                            <input defaultValue={inputs.mobile} type="text" name='mobile' onChange={handleChange}/>
                        </td>
                    </tr>
                    </tbody>
                    <tbody>
                    <tr>
                        <td>
                            <button>Save</button>
                        </td>
                    </tr>
                    </tbody>
                </table>


            </form>
        </div>
    )
}
export default EditUser