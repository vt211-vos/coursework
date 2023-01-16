import s from './FormUpdate.module.css'
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import addImage from "../FormCreate/img/image-file-add.png";


function FormUpdate(props){
    const navigate = useNavigate()
    const [images, setImages] = useState([])
    const [colors, setColors] = useState([])
    const [motor, setMotor] = useState([])
    const [inputs, setInputs] = useState({})
    const {id} =useParams()

    useEffect(()=>{
        getCar();
    },[])
    function getCar(){
        axios.get(`http://api/cars/${props.id}`).then(function (response){
            setInputs(response.data)
        })
        getImgs()
        getColors()
        getMotor()
    }
    function getImgs(){
        axios.post(`http://api/cars/AllImgs`, props.id).then(function (response){
            setImages(response.data)
        })
    }
    function getColors(){
        axios.post(`http://api/car/Colors`, props.id).then(function (response){
            setColors(response.data)
        })
    }
    function getMotor(){
        axios.post(`http://api/car/Motors`, props.id).then(function (response){
            setMotor(response.data)
        })
    }


    function handleChange(e){
        const name = e.target.name
        const value = e.target.value
        setInputs(values=>({...values, [name]:value}))
    }
    function handleChangeImg(e){
        console.log("jhkl")
        const reader = new FileReader()
        reader.onload =()=>{
            const name = e.target.name
            const value = reader.result
            // setInputs(values=>({...values, [name]:value}))
            // console.log(value)
            // console.log(inputs)
            // axios.post(`http://api/cars/addImg`, props.id).then(function (response){
            //     setImages(response.data)
            // })
            const sentData ={
                Img: value,
                IDCar: props.id
            }
            console.log(sentData)
            axios.post(`http://api/car/addImg`, sentData).then(function (response){
                console.log(response.data)
                getImgs()
            })
        }
        reader.readAsDataURL(e.target.files[0])


    }
    function addColor(){
        const sentData ={
            HEX: inputs.color,
            IDCar: props.id
        }
        axios.post(`http://api/car/addColor`, sentData).then(function (response){
            console.log(response.data)
            getColors()
        })
    }
    function handleSubmit(e){
        e.preventDefault()
        axios.put(`http://api/car/${id}/edit`, inputs).then(function (response){
            console.log((response.data))
            props.onClose()
            navigate("/cars")
        })
    }
    function addMotor(){
        const sentData ={
            TypeMotor: inputs.TypeMotor,
            Power: inputs.Power,
            IDCar: props.id
        }
        axios.post(`http://api/car/addMotor`, sentData).then(function (response){
            console.log(response.data)
            getMotor()
        })
    }


    return(

        <div className={s.mainBox}>
            <div className={s.box}>
                <div onClick={props.onClose} className={s.close}>x</div>
                <div className={s.title}>Update Post</div>
                <div className="form">
                    <form onSubmit={handleSubmit}>
                        <div className={s.legend}>Brand</div>
                        <input className={s.input} defaultValue={inputs.brand} required name='brand' onChange={handleChange}/>

                        <div className={s.legend}>Model</div>
                        <input className={s.input} defaultValue={inputs.model} required  name='model' onChange={handleChange}/>

                        <div className={s.legend}>Price</div>
                        <input className={s.input} defaultValue={inputs.price} required name='price' onChange={handleChange}/>

                        <div className={s.legend}>Image</div>
                        <label className={s.customFileUpload}>
                            <input type="file"  accept='image/*'  name='img' onChange={handleChangeImg}/>
                            <img src={addImage}/> Attach
                        </label>
                        <div className={s.imgs}>
                            {
                                images.map((item, index) =>
                                    <div key = {index}>
                                        <img src={item.Img}/>
                                        {item.Main === 'true' && (<div>Main</div>)}
                                        <div onClick={()=>{
                                            console.log("i work!")
                                            const SendData = {
                                                IDCar: item.IDCar,
                                                IDImg: item.IDImg
                                            }
                                            axios.post(`http://api/car/updateMainImg`,SendData).then(function (response){
                                                setImages(response.data)
                                                // getCar()
                                                props.getMainImg()
                                                console.log(response.data)
                                            })
                                        }}>Make main</div>
                                        <div onClick={()=>{
                                            axios.post(`http://api/car/deleteImg`, item.IDImg).then(function (response){
                                                console.log(response.data)
                                                props.getMainImg()
                                                getImgs()
                                            })
                                        }}>Delete</div>
                                    </div>
                                )
                            }

                        </div>

                        <div className={s.legend}>Add Color</div>
                        <input className={s.input} name="color" onChange={handleChange} placeholder="#"/>
                        <div onClick={addColor}>Add</div>

                        <div className={s.colors}>
                            {colors.map((item, index)=>{
                                const style = {
                                    width: "50px",
                                    height: "50px",
                                    backgroundColor: item.HEX
                                }
                                return(<div key={index} >
                                    <div style={style}></div>
                                    <div onClick={()=>{
                                        axios.post(`http://api/car/deleteColor`, item.IDColor).then(function (response){
                                            console.log(response.data)
                                            getColors()
                                        })
                                    }}>x</div>
                                </div>)
                            })}
                        </div>

                        <div className={s.legend}>Add Motor</div>
                        <input className={s.input} name="TypeMotor" onChange={handleChange} placeholder="Type motor"/>
                        <input className={s.input} name="Power" onChange={handleChange} placeholder="л/кв"/>
                        <div onClick={addMotor}>Add</div>
                        <div className={s.colors}>
                            {motor.map((item, index)=>{
                                // const style = {
                                //     width: "50px",
                                //     height: "50px",
                                //     backgroundColor: item.HEX
                                // }
                                return(<div key={index} >
                                    <div>{item.TypeMotor}</div>
                                    <div>{item.Power}</div>
                                    <div onClick={()=>{
                                        axios.post(`http://api/car/deleteMotor`, item.IDMotor).then(function (response){
                                            console.log(response.data)
                                            getColors()
                                        })
                                    }}>x</div>
                                </div>)
                            })}
                        </div>

                            <div onClick={()=>console.log(motor)}>Show</div>


                        <div className={s.btn}>
                            <button>Create</button>

                        </div>
                    </form>
                </div>
            </div>
        </div>



    )
}
export default FormUpdate