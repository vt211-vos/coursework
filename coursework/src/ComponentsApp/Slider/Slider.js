import s from './Slider.module.css'
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import {useState} from "react";

const Slider = props => {
    const [x, setX] = useState(0)
    function handleLeftArrow(){
        console.log("l");
        setX(prevState => {

                return Math.min(prevState + 100, 0)

        })
    }
    function handleRightArrow(){
        console.log("r");
        setX(prevState => Math.max(prevState - 100, -(100 * (props.images.length-1))))

    }
    return(
        <div className={s.main_container}>
            <FaChevronLeft className={s.arrow} onClick={handleLeftArrow}/>
            <div className={s.window}>
                <div className={s.all_items_container}
                style={{
                    transform:`translateX(${x}%)`
                }}
                >
                    {/*<img className={s.photo} src={props.images[0].Img}/>*/}
                    {/*<img className={s.photo} src={props.images[1].Img}/>*/}
                    {props.images.map((item, index)=>
                        <img className={s.photo} key={index} src={item.Img}/>
                    )}
                </div>
            </div>
            <FaChevronRight className={s.arrow} onClick={handleRightArrow}/>

        </div>
    )
}
export default Slider