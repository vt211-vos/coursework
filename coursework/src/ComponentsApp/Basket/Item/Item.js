import s from './Item.module.css'
import axios from "axios";
import {useEffect, useState} from "react";
import imgLoading from './img/loading-loader.svg'


function Item(props){
    const [img, setImg] =  useState()
    function Delete(){
        props.setBasket(prev=>prev.filter(item => item.id !== props.id))
        props.setTotalPrice(props.totalProce - props.price * props.count)

    }
    function Add(){
        props.setBasket(props.basket.map((item) => {
            if(props.id === item.id){
                return {...item, count: Number(item.count) + 1}
            }
            else {
                return item
            }
        }))
        localStorage.setItem("Basket",JSON.stringify(props.basket))
        console.log(props.basket)
        console.log("plus")
        props.setTotalPrice(props.totalProce + props.price)
    }
    function Minus(){
        props.setBasket(props.basket.map((item) => {
            if(props.id === item.id){
                if(Number(item.count) > 1) {
                    props.setTotalPrice(props.totalProce - props.price)
                    return {...item, count: Number(item.count) - 1}
                }
                else {
                    return item
                }
            }
            else {
                return item
            }
        }))
        localStorage.setItem("Basket",JSON.stringify(props.basket))
        console.log(props.basket)
        console.log("minus")

    }
    useEffect(()=>{
        getMainImg()
    }, [])
    function getMainImg(){
        console.log(+props.IDCar)
        axios.post('http://api/car/MainImg', props.IDCar).then(function (response){
            setImg(response.data.img)
            console.log(response.data)
        })
    }
    return(

            <div className={s.MainBox}>
                <div className={s.box}>
                    <div className={s.img}></div>
                    {
                        img != null
                            ?
                            <img className={s.mainImg} src={img}/>
                            :
                            <img className={s.loadingImg} src={imgLoading}/>
                    }
                    <div className={s.data}>
                        <div className={s.item}>
                            <div>
                                {props.brand}
                            </div>
                        </div>
                        <div className={s.item}>
                            <div>
                                {props.model}
                            </div>
                        </div>
                        <div className={`${s.item} , ${s.price}`}>
                            ${props.price}
                        </div>
                        <div className={s.item}>
                            <img src={"../icons/transmission.png"} className={s.icon}/>
                            <div>
                                {props.data.transmission}
                            </div>
                        </div>
                        <div className={s.item}>
                            <img src={"../icons/motor.png"} className={s.icon}/>
                            <div>
                                {props.data.motor}
                            </div>
                        </div>
                        <div className={s.item}>
                            <img src={"../icons/color.png"} className={s.icon}/>
                            <div className={`${s.color}`} style={{backgroundColor: props.data.color}}>

                            </div>

                        </div>
                    </div>

                    <div className={s.countBox}>
                            <div className={s.count}>{props.count}</div>
                            <div className={s.btns}>
                                <div onClick={Add} className={s.plus}>+</div>
                                <div onClick={Minus} className={s.minus}>-</div>
                            </div>

                    </div>
                    <div className={s.item}>
                        <div onClick={Delete} className={s.delete}>Delete</div>
                    </div>
                </div>
                </div>


    )
}
export default Item