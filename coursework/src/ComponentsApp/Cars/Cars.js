import Post from "./Post/Post";
import s from './Cars.module.css'
import {useEffect, useState} from "react";
import axios from "axios";
import PostForUser from "./PostForUser/PostForUser";
import Select from "react-select";

const options = [
    {
        value: "BMW",
        label: "BMW"
    },
    {
        value: "Mercedes",
        label: "Mercedes"
    },
    {
        value: "AUDI",
        label: "AUDI"
    },
    {
        value: "Chevrolet",
        label: "Chevrolet"
    },
]


function Cars(props){
    const [brand,setBrand] = useState(options[0].value)
    const [cars,  setCars] = useState([]);
    const [copyCars, setCopyCars] = useState([])
    useEffect(()=>{
        getCars()
    },[])

    function getCars(){
        axios.get('http://api/cars').then(function (response){
            setCars(response.data)
            setCopyCars(response.data)
        })
    }
    function getValue(){
        return brand ? options.find(c=>c.value===brand) : ""
    }
    function onChange(newValue){
        setBrand(newValue)
    }
    function Search(){
        setCopyCars(cars)
        typeof brand === "object"
        ?
        setCopyCars(prev=> prev.filter(car=> car.brand === brand.value))
        :
        setCopyCars(prev=> prev.filter(car=> car.brand === brand))
    }
    return(
        <>
            <div className={s.filter}>
                Filter
                <br/>
                <div className={s.boxSel}>
                    <Select className={s.sel} options={options} onChange={onChange} value={getValue()}/>
                </div>
                <button className={s.search} onClick={Search}>Search</button>
            </div>
            <div className={s.box}>
                {/*{*/}
                {/*    props.user.admin*/}
                {/*        ?*/}
                {/*        copyCars.map((car, key) =>*/}
                {/*            <Post*/}
                {/*            key={key}*/}
                {/*            id={car.id}*/}
                {/*            brand={car.brand}*/}
                {/*            modal={car.modal}*/}
                {/*            setBasket={props.setBasket}*/}
                {/*            price={car.price}*/}
                {/*            user={props.user}*/}
                {/*            img={car.img}*/}
                {/*            basket={props.basket}*/}
                {/*        />)*/}
                {/*        :*/}
                {/*        copyCars.map((car, key) =>*/}
                {/*            <PostForUser*/}
                {/*            key={key}*/}
                {/*            id={car.id}*/}
                {/*            setBasket={props.setBasket}*/}
                {/*            brand={car.brand}*/}
                {/*            modal={car.modal}*/}
                {/*            price={car.price}*/}
                {/*            user={props.user}*/}
                {/*            basket={props.basket}*/}
                {/*        />)*/}

                {/*}*/}
                {
                    copyCars.map((car, key) =>
                        <Post
                            setUser = {props.setUser}
                            key={key}
                            id={car.id}
                            brand={car.brand}
                            model={car.model}
                            setBasket={props.setBasket}
                            price={car.price}
                            user={props.user}
                            img={car.img}
                            basket={props.basket}
                            getCars={getCars}
                        />)
                }

            </div>
        </>

    )
}
export default Cars