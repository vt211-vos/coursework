import s from './Item.module.css'

function Item(props){
    function Delete(){
        props.setBasket(prev=>prev.filter(item => item.id !== props.id))
    }
    return(
        <div>
            <div className={s.box}>
                <div className={s.img}></div>
                <div className={s.item}>{props.brand}</div>
                <div className={s.item}>{props.model}</div>
                <div className={s.item}>{props.price}$</div>
                <div>
                    <button onClick={Delete} className={s.delete}>Delete</button>
                </div>
            </div>
        </div>

    )
}
export default Item