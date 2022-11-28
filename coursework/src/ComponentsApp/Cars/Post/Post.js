import s from './Post.module.css'
import axios from "axios";
import {Link} from "react-router-dom";
function Post(props){
    function Delete(){
        axios.delete(  `http://api/cars/${props.id}/datele`).then(function (response){
            props.getCars()
        })
    }
    return(
        <div className={s.post}>
            <div className={s.img}>
            </div>
            <div className={s.item}>#{props.id}</div>
            <div className={s.item}>{props.brand}</div>
            <div className={s.item}>{props.model}</div>
            <div className={s.item}>{props.price}$</div>
            <div className={s.btns}>
                <Link to={`/car/${props.id}/edit`} className={s.update}>Update</Link>
                <button className={s.delete} onClick={Delete}>Delete</button>
            </div>
        </div>
    )
}
export default Post