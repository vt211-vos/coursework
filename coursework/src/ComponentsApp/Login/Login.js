import s from './Login.module.css'
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import {useForm} from "react-hook-form";


function Login(props){
    const navigate = useNavigate()
    // const [inputs, setInputs] = useState({})

    // function handleChange(e){
    //     const name = e.target.name
    //     const value = e.target.value
    //     setInputs(values=>({...values, [name]:value}))
    // }
    // function handleSubmit(e){
    //     e.preventDefault()
    //     axios.post(`http://api/users/check`, inputs).then(function (response) {
    //         console.log(response.data)
    //         if(response.data.password === inputs.password){
    //             if(response.data.admin === "true") {
    //                 props.setUser({
    //                     check: true,
    //                     id: response.data.id,
    //                     name: response.data.name,
    //                     email: response.data.email,
    //                     password: response.data.password,
    //                     admin: true
    //                 })
    //             }
    //             else {
    //                 props.setUser({
    //                     check: true,
    //                     id: response.data.id,
    //                     name: response.data.name,
    //                     email: response.data.email,
    //                     password: response.data.password,
    //                     admin: false
    //                 })
    //             }
    //             navigate("/")
    //         }
    //         else {
    //             alert("Something wrong")
    //         }
    //     })
    // }
    const onSubmit = data => {
        axios.post(`http://api/users/check`, data).then(function (response) {
                    console.log(response.data)
                    if(response.data.password === data.password){
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
                        props.onClose()
                        navigate("/")
                    }
                    else {
                        alert("Something wrong")
                    }
                })
        console.log(data)
    }
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({
        mode: "onChange"
    })

    return(
        <>
            <div className={s.mainBox}>
                <div className={s.box}>
                    <div onClick={props.onClose} className={s.close}>x</div>
                    <div className={s.title}>LOGIN</div>
                    <div className="form">
                        <form onSubmit={handleSubmit(onSubmit)}>
                                <div className={s.legend}>Email</div>
                                <input className={s.input} name='email'
                                       {...register('email', {
                                           required: "Email is require field!",
                                           pattern: {
                                               value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                               message: "Please enter valid email",
                                           }
                                       })}

                                />
                                {errors?.email && (
                                    <div style={{color: 'red'}}>{errors.email.message}</div>
                                )}
                                <div className={s.legend}>Password</div>
                                <input className={s.input} type='password'  name='password'
                                       {...register('password', {
                                           required: "Password is require field!",
                                       })}

                                />
                                {errors?.password && (
                                    <div style={{color: 'red'}}>{errors.password.message}</div>
                                )}
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