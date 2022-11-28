import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import logo from "./img/logo.png"
import s from './style.module.css'

function ListUser(){
    const [users,  setUsers] = useState([]);

    useEffect(()=>{
        getUsers()
    },[])
    function getUsers(){
        axios.get('http://api/users/').then(function (response){
            console.log(response.data)
            setUsers(response.data)
        })
    }

    return(
        <div>
            <h1>list User</h1>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Img</th>
                        <th>Created</th>
                    </tr>
                </thead>
                <tbody>
                {users.map((user, key)=>
                    <tr key = {key}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.mobile}</td>
                        <td><img className={s.img} src={user.img}/></td>
                        <td><Link to={`user/${user.id}/edit`}>Edit</Link>
                            <button>Delete</button>
                        </td>
                    </tr>

                )}
                </tbody>
            </table>

        </div>
    )
}
export default ListUser