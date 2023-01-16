import Item from "./Item/Item";
import s from "./Basket.module.css"
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import Login from "../Login/Login";
import Modal from "../modal/modal";
import axios from "axios";

function Basket(props){
    const [order, setOrder] = useState()

    useEffect(()=>{
        setOrder({
            user: props.user,
            cars: props.basket
        })
    }, [])
    const [modalLogin, setModalLogin] = useState(false)
    const CloseLogin = () =>{
        setModalLogin(false)
    }
    const [totalPrice, setTotalPrice] = useState(CountTotalPrice)
    function Buy(){
        if(props.user.check){
            axios.post('http://api/test', order).then(function (response){
                console.log(response.data)
            })
            props.setBasket([]);
        }
        else
            setModalLogin(true)
    }
    function CountTotalPrice(){
        let TotalPrice = 0
        const basket = JSON.parse(localStorage.getItem('Basket'))
        console.log(basket)
        basket.map(item=>TotalPrice += item.price * item.count)
        return TotalPrice

    }

    return(
        <div className={s.mainBox}>
            <div className={s.title}>
                Basket
            </div>
            <div className={s.box}>
                {props.basket.map((item, i)=>
                    <Item
                        key={i}
                        basket = {props.basket}
                        brand={item.brand}
                        model={item.model}
                        price={item.price}
                        IDCar = {item.idCar}
                        id={item.id}
                        data={item.data}
                        count ={item.count}
                        setBasket={props.setBasket}
                        totalProce = {totalPrice}
                        setTotalPrice = {setTotalPrice}
                    />
                )}
            </div>
            <div>
                {
                    props.basket.length > 0
                    ?
                    <>
                    <div className={s.TotalPrice}>
                        <div>Total price:</div>
                        <div>${totalPrice}</div>
                    </div>
                    <div className={props.basket.length > 0 ? s.boxBuy : s.boxEmpty}>
                        <div onClick={Buy} className={s.buy}>Buy</div>
                        <Modal IsOpened={modalLogin}><Login setUser = {props.setUser} onClose = {CloseLogin}/></Modal>
                    </div>
                    </>
                    :
                    <div className={s.empty}>
                        Empty
                    </div>
                    }
                </div>
                <div onClick={()=>console.log(order)}>show</div>


        </div>
    )
}
export default Basket