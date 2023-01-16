import s from './Comparison.module.css'
import {useEffect, useState} from "react";
import axios from "axios";
import item from "../Basket/Item/Item";


function Comparison(props){
    const [cars, setCars] = useState([])
    const [Comparison, setComparison] = useState(JSON.parse(localStorage.getItem('Comparison')))
    // const [colors, setColors] = useState([])
    // const [motor, setMotor] = useState([])
    useEffect(()=>{
        getCars()
    }, [])

    function getCars(){
        console.log(Comparison)
        Comparison.map(item=>{
            const id = item
            let data = {}
            axios.get(`http://api/cars/${id}`).then(function (response){
                data.id = id
                data.brand = response.data.brand
                data.model = response.data.model
                data.price = response.data.price
                axios.post(`http://api/car/Colors`, id).then(function (response){
                    let colors = response.data.map(item=>{
                        return item.HEX
                    })
                    data.colors = colors
                    axios.post(`http://api/car/Motors`, id).then(function (response){
                        let motors = response.data.map(item=>{
                            return {
                                Type: item.TypeMotor,
                                Power: item.Power
                            }
                        })
                        data.motors = motors
                        console.log(response.data)
                        console.log(data)
                        setCars(prev => prev.concat(data))
                    })
                })
            })
         })

    }

    return(
        <div className={s.mainBox}>
            <table>
                <thead>
                <tr>
                    <th>Марка</th>
                    <th>Модель</th>
                    <th>Ціна</th>
                    <th>Мотор</th>
                    <th>Об'єм</th>
                    <th>Колір</th>
                </tr>
                </thead>
                <tbody>
                {
                    cars.map((item, index)=>
                        <tr key={index}>
                            <td>{item.brand}</td>
                            <td>{item.model}</td>
                            <td>{item.price}</td>
                            <td>{item.motors.map((motor, index)=>
                            <div key={index}>
                                {motor.Type}
                            </div>)}</td>
                            <td>{item.motors.map((motor, index)=>
                                <div key={index}>
                                    {motor.Power}
                                </div>)}</td>
                            <td>
                                {item.colors.map((color, index)=>
                                    <div className={s.color} style={{backgroundColor: color}}  key={index}>

                                    </div>)}
                            </td>
                            <td  onClick={()=>{
                                setCars(cars.filter(c=> c.id !== item.id))
                                props.setComparison(Comparison.filter(c=> c !== item.id))
                            }}>Видалити</td>
                        </tr>
                    )
                }

                </tbody>

            </table>
        </div>
    )
}
export default Comparison