import s from './Login.module.css'
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";


function Login(props){
    const navigate = useNavigate()
    const [inputs, setInputs] = useState({})

    function handleChange(e){
        const name = e.target.name
        const value = e.target.value
        setInputs(values=>({...values, [name]:value}))
    }
    function handleSubmit(e){
        e.preventDefault()
        axios.post(`http://api/users/check`, inputs).then(function (response) {
            console.log(response.data)
            if(response.data.password === inputs.password){
                if(response.data.admin === "true") {
                    props.setUser({
                        check: true,
                        id: response.data.id,
                        name: response.data.name,
                        email: response.data.email,
                        password: response.data.password,
                        admin: true
                    })
                }
                else {
                    props.setUser({
                        check: true,
                        id: response.data.id,
                        name: response.data.name,
                        email: response.data.email,
                        password: response.data.password,
                        admin: false
                    })
                }
                navigate("/")
            }
            else {
                alert("Something wrong")
            }
        })
    }
    return(
        <>
            <div className={s.mainBox}>
                <div className={s.box}>
                    <div className={s.title}>LOGIN</div>
                    <div className="form">
                        <form onSubmit={handleSubmit}>
                                <div className={s.legend}>Email</div>
                                <input className={s.input} onChange={handleChange} required name='email'/>

                                <div className={s.legend}>Password</div>
                                <input className={s.input} onChange={handleChange} required name='password'/>

                            <div className={s.btn}>
                                <button>Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}
export default Login