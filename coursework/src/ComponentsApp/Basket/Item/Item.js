import s from './Item.module.css'
function Item(props){
    return(
        <div>
            <div className={s.box}>
                <div className={s.img}></div>
                <div className={s.item}>{props.brand}</div>
                <div className={s.item}>{props.model}</div>
                <div className={s.item}>{props.price}$</div>
            </div>
        </div>

    )
}
export default Item