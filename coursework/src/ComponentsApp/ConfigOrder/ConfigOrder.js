import s from './ConfigOrder.module.css'
import {useForm} from "react-hook-form";
import axios from "axios";
import img from "../productPage/someImg.jpg";
import {useEffect, useState} from "react";

const ConfigOrder = props => {
    const {
        register,
        handleSubmit
    } = useForm()
    const onSubmit = data => {
        console.log(data)
        let id = 0
        console.log(props.basket.length)
        if(props.basket.length > 0){
            id = props.basket[props.basket.length-1].id + 1
        }
        props.setBasket(prev => prev.concat({
            id: id,
            count: 1,
            idCar: props.id,
            brand: props.brand,
            model: props.model,
            price: props.price,
            data
        }))
        props.onClose()

    }


    useEffect(()=>{
        getCar();
    },[])
    function getCar(){
        getColors()
        getMotor()
        getImg()
    }
    const [image, setImage] = useState([])
    const [colors, setColors] = useState([])
    const [motor, setMotor] = useState([])
    function getColors(){
        axios.post(`http://api/car/Colors`, props.id).then(function (response){
            setColors(response.data)
        })
    }
    function getMotor(){
        axios.post(`http://api/car/Motors`, props.id).then(function (response){
            setMotor(response.data)

        })
    }

    function getImg(){
        axios.post(`http://api/car/MainImg`, props.id).then(function (response){
            setImage(response.data.img)
        })
    }


    return (
    <div className={`${s.flex} , ${s.mainBox}`}>
        <div className={`${s.flex} , ${s.box}`}>
            <div onClick={props.onClose} className={s.close}>x</div>
            <div className={s.img}>
                <img src={image}/>
                <div className={s.constData}>
                    <div className={s.name}>
                        {props.brand}
                    <br/>
                        {props.model}
                    </div>
                    <div className={s.price}>
                        <img src="../icons/dollar-symbol.png"/>
                        {props.price}
                    </div>
                </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={s.condition}>
                    <div className={s.item}>
                        <div className={s.icon}>
                            <img src={'../icons/motor.png'}/>
                            (1,8l)
                        </div>
                        <div className={`${s.inputs} , ${s.flex}`}>
                            {motor.map((item, index)=>

                                <div key={index}>
                                    <input defaultChecked id = {`${item.TypeMotor}${props.id}`} type='radio' name="motorType" value={`${item.TypeMotor}(${item.Power})`}
                                           {...register('motor')}/>
                                    <label className={s.text} htmlFor={`${item.TypeMotor}${props.id}`}>
                                        <div>{item.TypeMotor}</div>
                                        <div>{item.Power}</div>
                                    </label>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={s.item}>
                        <div className={s.icon}>
                            <img src={'../icons/transmission.png'}/>
                        </div>
                        <div className={`${s.inputs} , ${s.flex}`}>
                                <input defaultChecked id={`automatic${props.id}`} type='radio' value="automatic" name="transmissionType"
                                       {...register('transmission')}/>
                            <label className={s.text} htmlFor={`automatic${props.id}`}>
                                <div>Автомат</div>
                            </label>
                                <input id = {`mechanical${props.id}`} type='radio' value="mechanical" name="transmissionType"
                                       {...register('transmission')}
                            />
                            <label className={s.text} htmlFor={`mechanical${props.id}`}>
                                <div>Механіка</div>
                            </label>
                        </div>
                    </div>
                    <div className={s.item}>
                        <div className={s.icon}>
                            <img src={'../icons/color.png'}/>
                        </div>
                        <div className={`${s.inputs} , ${s.flex}`}>
                            <div className={s.inpColor}>
                            {/*    <input defaultChecked id={`red${props.id}`} value="red" type='radio' name="colorType"*/}
                            {/*           {...register('color')}*/}
                            {/*    />*/}
                            {/*    <label className={s.color} htmlFor={`red${props.id}`}>*/}
                            {/*        <div style={style}></div>*/}
                            {/*    </label>*/}
                            {/*</div>*/}
                            {/*<div className={s.inpColor}>*/}
                            {/*    <input id={`black${props.id}`} value="black" type='radio' name="colorType"*/}
                            {/*           {...register('color')}/>*/}
                            {/*    <label className={s.color} htmlFor={`black${props.id}`}>*/}
                            {/*        <div style={style2}></div>*/}
                            {/*    </label>*/}
                                {colors.map((item, index)=>
                                    // <div className={s.color} style={{backgroundColor: `${item.HEX}`}}></div>
                                    <div key={index} className={s.inpColor}>
                                        <input defaultChecked id={`${item.HEX}${props.id}`} value={item.HEX} type='radio' name="colorType"
                                               {...register('color')}
                                        />
                                        <label className={s.color} style={{backgroundColor: `${item.HEX}`}} htmlFor={`${item.HEX}${props.id}`}>
                                            <div></div>
                                        </label>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={s.boxBuy}>
                    <button className={s.buy}>Add to basket</button>
                </div>
            </form>
        </div>
    </div>)
}

export default ConfigOrder