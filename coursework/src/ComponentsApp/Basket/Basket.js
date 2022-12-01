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
        <div className={s.mainBox}>
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
                        id={item.id}
                        setBasket={props.setBasket}
                    />
                )}
            </div>
            <div className={props.basket.length > 0 ? s.boxBuy : s.boxEmpty}>
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