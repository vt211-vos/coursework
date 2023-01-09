import s from './Item.module.css'

function Item(props){
    function Delete(){
        props.setBasket(prev=>prev.filter(item => item.id !== props.id))
        props.setTotalPrice(props.totalProce - props.price * props.count)

    }
    function Add(){
        props.setBasket(props.basket.map((item) => {
            if(props.id === item.id){
                return {...item, count: Number(item.count) + 1}
            }
            else {
                return item
            }
        }))
        localStorage.setItem("Basket",JSON.stringify(props.basket))
        console.log(props.basket)
        console.log("plus")
        props.setTotalPrice(props.totalProce + props.price)
    }
    function Minus(){
        props.setBasket(props.basket.map((item) => {
            if(props.id === item.id){
                if(Number(item.count) > 1) {
                    props.setTotalPrice(props.totalProce - props.price)
                    return {...item, count: Number(item.count) - 1}
                }
                else {
                    return item
                }
            }
            else {
                return item
            }
        }))
        localStorage.setItem("Basket",JSON.stringify(props.basket))
        console.log(props.basket)
        console.log("minus")

    }
    return(

            <div className={s.box}>
                <div className={s.img}></div>
                <div className={s.item}>{props.brand}</div>
                <div className={s.item}>{props.model}</div>
                <div className={s.item}>${props.price}</div>
                <div className={s.countBox}>
                    <div className={s.count}>{props.count}</div>
                    <div className={s.btns}>
                        <div onClick={Add} className={s.plus}>+</div>
                        <div onClick={Minus} className={s.minus}>-</div>
                    </div>
                </div>
                <div>
                    <button onClick={Delete} className={s.delete}>Delete</button>
                </div>
            </div>

    )
}
export default Item