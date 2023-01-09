import s from './PostForUser.module.css'
import {FaStar} from "react-icons/fa";
import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9"
}
function PostForUser(props){
    const navigate = useNavigate()
    const [currentValue, setCurrentValue] = useState();
    const [hoverValue, setHoverValue] = useState(undefined);
    const stars = Array(5).fill(0)
    const [feedback, setFeedback] = useState(0);

    const [img, setImg] =useState()


    useEffect(getStars, [])
    function getStars(){
        axios.post("http://api/car/rating", props.id).then(function (response) {
            if(Object.keys(response.data).length !== 0){
                setFeedback({
                    responses: response.data.response,
                    stars: Math.round(response.data.avgStar*10)/10
                })

                setCurrentValue(Math.round(response.data.avgStar))

            }
            else {
                setFeedback({
                    responses: 0,
                    stars: 0
                })
                setCurrentValue(0)
            }

        })
        axios.post('http://api/car/img', props.id).then(function (response){
            setImg(response.data.img)
        })
    }
    const handleClick = value => {

        if(props.user.check) {
            const RInfo = {
                id_user: props.user.id,
                id_car: props.id,
                stars: value
            }
            axios.post("http://api/car/userRating", RInfo).then(function (response) {
                if (response.data == null || !response.data) {
                    axios.post("http://api/car/createRating", RInfo).then(function (response) {
                        console.log(response.data)
                        getStars()
                    })
                } else {
                    axios.post("http://api/car/updateRating", RInfo).then(function (response) {
                        getStars()
                    })
                }

            })
        }
        else
            navigate("/login")
    }
    const handleMouseOver = newHoverValue => {
        setHoverValue(newHoverValue)
    };
    const handleMouseLeave = () => {
        setHoverValue(undefined)
    }
    function AddToBasket() {
        let id = 0
        console.log(props.basket.length)
        if(props.basket.length > 0){
            id = props.basket[props.basket.length-1].id + 1
        }
        props.setBasket(prev=>prev.concat({
            brand: props.brand,
            model: props.model,
            price: props.price,
            id: id
        }))
    }
    
    return(
        <div className={s.post}>
            {
                img != null
                    ?
                    <img className={s.iimg} src={img}/>
                    :
                    <div className={s.img}></div>
            }
            <div className={s.item}>{props.brand}</div>
            <div className={s.item}>{props.model}</div>
            <div className={s.item}>{props.price}$</div>
            <div className={s.btns}>
                <button className={s.buy} onClick={AddToBasket}>Buy</button>
            </div>
            <div style={styles.container}>
                <div style={styles.star}>
                    {stars.map((_, index) => {
                        return (
                            <FaStar
                                key={index}
                                onClick={() => handleClick(index + 1)}
                                onMouseOver={() => handleMouseOver(index + 1)}
                                onMouseLeave={handleMouseLeave}
                                color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
                                style={{
                                    cursor: "pointer"
                                }}
                            />
                        )
                    })}
                </div>
                <div className={s.feedback}>
                    <div>Кільсіть відгуків:{feedback.responses}</div>
                    <div>Середня оцнка:{feedback.stars}</div>
                </div>

            </div>
        </div>
    )
}

const styles = {
    container:{
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    }
}
export default PostForUser