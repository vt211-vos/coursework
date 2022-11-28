import Item from "./Item/Item";
import s from "./Basket.module.css"
import {useNavigate} from "react-router-dom";

function Basket(props){
    const navigate = useNavigate()
    function Buy(){
        if(props.user.check)
            props.setBasket([])
        else
            navigate("/login")
    }
    return(
        <div>
            <div className={s.title}>
                Basket
            </div>
            <div className={s.box}>
                {props.basket.map((item, i)=>
                    <Item
                        key={i}
                        brand={item.brand}
                        model={item.model}
                        price={item.price}
                    />
                )}
            </div>
            <div className={s.boxBuy}>
                <div>
                    {
                        props.basket.length > 0
                        ?
                        <div onClick={Buy} className={s.buy}>Buy</div>
                        :
                        <div className={s.empty}>
                            Empty
                        </div>
                    }
                </div>

            </div>

        </div>
    )
}
export default Basket