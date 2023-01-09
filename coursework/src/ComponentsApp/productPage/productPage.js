import img from './someImg.jpg'
import s from './productPage.module.css'
import Modal from "../modal/modal";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";


function  ProductPage(){
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
    }
    return(
        <div className={s.container}>
            <div className={s.mainTitle}>
                <div className={s.name}>
                    {inputs.brand}  {inputs.model}
                </div>
                <div className={s.buy}>
                    <div>
                        buy
                    </div>
                </div>
            </div>
            <div>
                <img className={s.mainImg} src={inputs.img}/>
            </div>

            <div className={s.mainData}>
                <div className={s.price}>
                    <img src="../icons/dollar-symbol.png"/>
                    {inputs.price}
                </div>
                <div>
                    <img src="../icons/motor.png"/>
                    1.5 дизель
                </div>
                <div>
                    <img src='../icons/transmission.png'/>
                    автомат
                </div>
                <div>
                    <img src="../icons/speed.png"/>
                    7c
                </div>
                <div className={s.colors}>
                    <img src="../icons/speed.png"/>
                    <div className={s.colorR}></div>
                    <div className={s.colorG}></div>
                    <div className={s.colorB}></div>
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