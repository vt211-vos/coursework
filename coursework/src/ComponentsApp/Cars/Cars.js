import Post from "./Post/Post";
import s from './Cars.module.css'
import {useEffect, useState} from "react";
import axios from "axios";
import PostForUser from "./PostForUser/PostForUser";

function Cars(props){
    const [cars,  setCars] = useState([]);
    useEffect(()=>{
        getCars()
    },[])

    function getCars(){
        axios.get('http://api/cars').then(function (response){
            setCars(response.data)
        })
    }

    return(
        <div className={s.box}>
            {
                props.user.admin
                ?
                    cars.map((car, key) => <Post key={key} getCars={getCars} id={car.id} brand={car.brand} model={car.model} price={car.price}/>)
                :
                    cars.map((car, key) => <PostForUser
                        key={key}
                        id={car.id}
                        setBasket={props.setBasket}
                        brand={car.brand}
                        model={car.model}
                        price={car.price}
                        user={props.user}
                    />)

            }

        </div>
    )
}
export default Cars