import s from './Register.module.css'
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";

function Register(props){
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({
        mode: "onChange"
    })


    const onSubmit = data => {
        console.log(data)
        axios.post(`http://api/users/check`, data).then(function (response) {
            console.log(response.data)
            if (response.data == null || !response.data) {
                axios.post("http://api/user/save", data).then(function (response) {
                    axios.post("http://api/users/searchUser", data).then(function (response) {
                        console.log(response.data)
                        props.setUser({
                            check: true,
                            id: response.data.id,
                            name: response.data.name,
                            email: response.data.email,
                            password: response.data.password
                        })
                        props.onClose()
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
                    <div onClick={props.onClose} className={s.close}>x</div>
                    <div className={s.title}>SING-UP</div>
                    <div className="form">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className={s.legend}>Name</div>
                            <input className={s.input}  name='name'
                                {...register('name', {
                                    required: "Name is require field!",
                                    minLength: {
                                        value: 2,
                                        message: "Too short"
                                    },
                                    maxLength: {
                                        value: 20,
                                        message: "Too long"
                                    }
                                })}

                            />
                            {errors?.name && (
                                <div style={{color: 'red'}}>{errors.name.message}</div>
                            )}


                            <div className={s.legend}>Mobile</div>
                            <input className={s.input} name='mobile' type="number"
                                   {...register('mobile', {
                                       required: "Mobile is require field!",
                                       minLength: {
                                           value: 10,
                                           message: "Too short"
                                       },
                                       maxLength: {
                                           value: 12,
                                           message: "Too long"
                                       }
                            })}

                            />
                            {errors?.mobile && (
                                <div style={{color: 'red'}}>{errors.mobile.message}</div>
                            )}

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
                                       minLength: {
                                           value: 5,
                                           message: "Too short"
                                       },
                                       maxLength: {
                                           value: 20,
                                           message: "Too long"
                                       }
                                   })}

                            />
                            {errors?.password && (
                                <div style={{color: 'red'}}>{errors.password.message}</div>
                            )}
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