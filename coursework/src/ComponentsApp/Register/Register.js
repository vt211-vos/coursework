import s from './Register.module.css'
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

function Register(props){
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
            if (response.data == null || !response.data) {
                axios.post("http://api/user/save", inputs).then(function (response) {
                    axios.post("http://api/users/searchUser", inputs).then(function (response) {
                        console.log(response.data)
                        props.setUser({
                            check: true,
                            id: response.data.id,
                            name: response.data.name,
                            email: response.data.email,
                            password: response.data.password
                        })
                        navigate("/")
                    })
                })
            } else {
                alert("Такий користувач уже існує")
            }
        })
    }
    return(
        <>
            <div className={s.mainBox}>
                <div className={s.box}>
                    <div className={s.title}>SING-UP</div>
                    <div className="form">
                        <form onSubmit={handleSubmit}>
                            <div className={s.legend}>Name</div>
                            <input className={s.input} required name='name' onChange={handleChange}/>

                            <div className={s.legend}>Mobile</div>
                            <input className={s.input} required type='number' name='mobile' onChange={handleChange}/>

                            <div className={s.legend}>Email</div>
                            <input className={s.input} required type='email' name='email' onChange={handleChange}/>

                            <div className={s.legend}>Password</div>
                            <input className={s.input} required name='password' onChange={handleChange}/>

                            <div className={s.btn}>
                                <button>Sing-up</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}
export default Register