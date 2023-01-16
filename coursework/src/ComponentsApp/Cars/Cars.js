import Post from "./Post/Post";
import s from './Cars.module.css'
import {useEffect, useState} from "react";
import axios from "axios";
import PostForUser from "./PostForUser/PostForUser";
import Select from "react-select";
import item from "../Basket/Item/Item";

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
    const [brands,setBrands] = useState([])
    const [brand,setBrand] = useState()
    const [model,setModel] = useState()
    const [CopyCars,  setCopyCars] = useState([]);
    const [models,setModels] = useState([])
    const [cars,  setCars] = useState([]);
    useEffect(()=>{
        getCars()
    },[])

    function getCars(){
        axios.get('http://api/cars').then(function (response){
            setCars(response.data)
            setCopyCars(response.data)
            response.data.map(item => {
                setBrands(prevState => prevState.concat(item.brand))
            })
            setBrands( prev =>
                [...new Set(prev)].map(item=>{
                    return{
                        value: item,
                        label: item
                    }
                })
            )

        })
        axios.get('http://api/testBD').then(response=>{
            console.log(response.data)
        })
    }
    function getValueBrand(){
        return brand ? brands.find(c=>c.value===brand) : ""
    }
    function onChangeBrand(newValue){
        setModel({})
        setBrand(newValue)
        console.log(newValue)
        getModels(newValue.value)
    }
    function getValueModel(){
        return model ? models.find(c=>c.value===brand) : ""
    }
    function onChangeModel(newValue){
        setModel(newValue)
        console.log(newValue)

    }
    function Search(){
        console.log(brand)
        if(Object.keys(brand).length > 0)
            setCopyCars(cars.filter(car=> car.brand === brand.value))
            if(Object.keys(model).length > 0)
                setCopyCars(cars.filter(car=> car.model === model.value))
                // console.log(CopyCars)
    }
    function getBrands(){
        cars.map(item => {
            setBrands(prevState => prevState.concat(item.brand))
        })
        setBrands( prev =>
            [...new Set(prev)].map(item=>{
                return{
                    value: item,
                    label: item
                }
            })
        )

        // doArr()
        // console.log(brands)
    }
    function getModels(brand){
        setModels([])
        cars.map(item => {
            if (item.brand === brand)
                setModels(prevState => prevState.concat(item.model))
        })

        setModels( prev =>
            [...new Set(prev)].map(item=>{
                return{
                    value: item,
                    label: item
                }
            })
        )

        // doArr()
        // console.log(brands)
    }
    function Growth(){


        setCopyCars(prev => [...prev].sort((a, b) => (a.price > b.price) ? 1 : -1))
    }
    function Decline(){
        setCopyCars(prev => [...prev].sort((a, b) => (a.price < b.price) ? 1 : -1))
    }

    return(
        <>
            <div className={s.filter}>
                Filter
                <br/>
                <div className={s.boxSel}>
                    <div>
                        <Select className={s.sel} options={brands} onChange={onChangeBrand}/>
                    </div>
                    <br/>
                    <div>
                        {models.length > 0&&(<Select className={s.sel} options={models} onChange={onChangeModel} value={model}/>)}
                    </div>
                </div>
                <button className={s.search} onClick={Growth}>За зростанням</button>
                <button className={s.search} onClick={Search}>Пошук</button>
                <button className={s.search} onClick={Decline}>За спаданням</button>

            </div>
            <div className={s.box}>

                {
                    CopyCars.map((car, key) =>
                        <Post
                            setUser = {props.setUser}
                            key={key}
                            id={car.id}
                            brand={car.brand}
                            model={car.model}
                            setBasket={props.setBasket}
                            price={car.price}
                            user={props.user}
                            setComparison = {props.setComparison}
                            comparison = {props.comparison}
                            basket={props.basket}
                            getCars={getCars}
                        />)
                }

            </div>
        </>

    )
}
export default Cars