import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import s from './style.module.css'

function CreateUsers(){
    const navigate = useNavigate()
    const [inputs, setInputs] = useState({})


    function handleChange(e){
        const name = e.target.name
        const value = e.target.value
        setInputs(values=>({...values, [name]:value}))
    }
    function handleChangeImg(e){

        const reader = new FileReader()
        reader.onload =()=>{
            const name = e.target.name
            const value = reader.result
            setInputs(values=>({...values, [name]:value}))
        }
        reader.readAsDataURL(e.target.files[0])

    }
    function handleSubmit(e){
        e.preventDefault()
        if(Object.values(inputs).every(x => x != null)) {
            axios.post(`http://api/users/check`, inputs).then(function (response) {
                console.log(response.data)
                if (response.data == null || !response.data) {
                    axios.post("http://api/user/save", inputs).then(function (response) {
                        console.log((response.data))
                        navigate("/")
                    })
                } else {
                    alert("Такий користувач уже існує")
                }
            })
        }
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
                            <input required type="text" name='name' onChange={handleChange}/>
                        </td>
                    </tr>
                    </tbody>
                    <tbody>
                    <tr>
                        <th>
                            <label>Email:</label>
                        </th>
                        <td>
                            <input required type="text" name='email' onChange={handleChange}/>
                        </td>
                    </tr>
                    </tbody>
                    <tbody>
                    <tr>
                        <th>
                            <label>Mobile:</label>
                        </th>
                        <td>
                            <input required type="text" name='mobile' onChange={handleChange}/>
                        </td>
                    </tr>
                    </tbody>
                    <tbody>
                    <tr>
                        <td></td>
                        <td>
                            <input required type="file" name='img' onChange={handleChangeImg}/>
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
export default CreateUsers