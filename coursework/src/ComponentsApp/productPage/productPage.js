import img from './someImg.jpg'
import s from './productPage.module.css'
import Modal from "../modal/modal";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import Slider from "../Slider/Slider";
import ConfigOrder from "../ConfigOrder/ConfigOrder";


function  ProductPage(props){
    const [modal, setModal] = useState(false)
    const Close = () =>{
        setModal(false)
    }
    const id = useParams().id
    const [inputs, setInputs] = useState({})
    useEffect(()=>{
        getCar();
    },[])
    function getCar(){
        axios.get(`http://api/cars/${id}`).then(function (response){
            setInputs(response.data)
            console.log(response.data)
        })
        getImgs()
        getColors()
        getMotor()
    }
    const [images, setImages] = useState([])
    const [colors, setColors] = useState([])
    const [motor, setMotor] = useState([])

    /////////modal
    const [modalBuy, setModalBuy] = useState(false)
    const CloseModalBuy = () =>{
        setModalBuy(false)
    }

    function getImgs(){
        axios.post(`http://api/cars/AllImgs`, id).then(function (response){
            setImages(response.data)
            console.log(response.data)
        })
    }
    function getColors(){
        axios.post(`http://api/car/Colors`, id).then(function (response){
            setColors(response.data)
            console.log(response.data)
        })
    }
    function getMotor(){
        axios.post(`http://api/car/Motors`, id).then(function (response){
            setMotor(response.data)
            console.log(response.data)

        })
    }
    return(

        <div className={s.container}>
            <Modal IsOpened={modalBuy}><ConfigOrder basket = {props.basket} setBasket={props.setBasket} id = {id} img = {img} price = {inputs.price} brand = {inputs.brand} model={inputs.model}  onClose = {CloseModalBuy}/></Modal>
            <div className={s.mainTitle}>
                <div className={s.name}>
                    {inputs.brand}  {inputs.model}
                </div>
                <div className={s.buy}>
                    {
                        !props?.user?.admin && (
                            <div onClick={()=>setModalBuy(true)}>
                                buy
                            </div>
                        )
                    }

                </div>
            </div>

            <Slider images = {images}>


            </Slider>
            <div className={s.mainData}>
                <div className={`${s.price} , ${s.item}`} style={{alignItems: "center"}}>
                    <img src="../icons/dollar-symbol.png"/>
                    {inputs.price}
                </div>
                <div className={s.motor}>
                    <img src="../icons/motor.png"/>
                    {/*1.5 дизель*/}
                    <div>
                        {motor.map((item, index)=>
                            <div className={s.motor} key={index}>
                                <div>{item.TypeMotor}</div>
                                <div>{item.Power}</div>
                            </div>
                        )}
                    </div>

                </div>
                <div className={s.item}>
                    <img src='../icons/transmission.png'/>
                    автомат
                </div>

                <div className={s.item}>
                    <img src="../icons/color.png"/>
                    {/*<div className={s.colorR}></div>*/}
                    {/*<div className={s.colorG}></div>*/}
                    {/*<div className={s.colorB}></div>*/}
                    {colors.map((item, index)=>
                        <div key={index} className={s.color} style={{backgroundColor: `${item.HEX}`}}></div>
                    )}
                </div>
            </div>
            <div className={s.title}>
                DISCRIPTION
            </div>
            <div className={s.discription}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad culpa cumque dignissimos eaque esse, inventore ipsum iusto nam, nisi quaerat qui quis quod repellendus veritatis vero. Aliquam animi aspernatur, assumenda autem corporis deleniti dolore dolores eaque, facere maiores nulla praesentium quae quaerat quos reiciendis reprehenderit repudiandae vel? Eaque fugit provident veritatis. Ab aliquid amet at consequuntur deleniti, dignissimos distinctio doloribus eos fuga in incidunt ipsa modi nulla praesentium quas quo recusandae veritatis. Ab alias, assumenda atque aut beatae cupiditate doloremque dolores eligendi eos, est, expedita fugiat fugit molestiae omnis optio praesentium quae ratione sapiente soluta voluptatem? Eaque illum libero quibusdam.
            </div>
        </div>
    )
}

export default ProductPage