import s from "./Orders.module.css"
import imgLoading from "../Basket/Item/img/loading-loader.svg";
import {useEffect, useState} from "react";
import axios from "axios";

function Orders(){
    const [orders, serOrders] = useState([])
    useEffect(()=>{
        getOrder()
    },[])
    function getOrder(){
        serOrders([])
        axios.post(`http://api/allOrders`).then(function (response){
            console.log(response.data)

            response.data.map(item=>{
                console.log(item)
                let data = {}
                data.user = item
                axios.post(`http://api/CarForOrder`, response.data[0].IDOrder).then(function (response){
                    data.cars = response.data
                    serOrders(prevState => prevState.concat(data))
                    console.log(data)
                })
            })

        })
    }
    return(
        <>
            {
                orders.map((item,index)=>
                <div key={index}>
                    <div>id замовлення:{item.user.IDOrder}</div>
                    <div>Номер замовника:{item.user.Phone}</div>
                    <table>
                        <thead>
                        <tr>
                            <th>Марка</th>
                            <th>Модель</th>
                            <th>Ціна</th>
                            <th>Двигун</th>
                            <th>Коробка передач</th>
                            <th>Колір</th>
                            <th>Кількість</th>
                        </tr>
                        </thead>
                        <tbody>
                        {item.cars.map((item, index)=>
                        <tr key={index}>
                            <td>{item.brand}</td>
                            <td>{item.model}</td>
                            <td>{item.price}</td>
                            <td>{item.TypeMotor}</td>
                            <td>{item.Transmission}</td>
                            <td>{item.Color}</td>
                            <td>{item.Count}</td>
                        </tr>
                        )}
                        </tbody>
                    </table>
                    <div className={s.boxBtn}>
                        <div className={s.finish} onClick={()=>{
                            axios.post(`http://api/DeleteOrder`, item.user.IDOrder).then(function (response){
                                console.log(response.data)
                                getOrder()
                            })
                        }}>Завершити</div>
                    </div>

                </div>
                )
            }

        </>

    )
}
export default Orders