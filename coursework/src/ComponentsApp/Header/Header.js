import logo from './logo/logo.webp'
import s from './Header.module.css'
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import Modal from "../modal/modal";
import Register from "../Register/Register";
import Login from "../Login/Login";
import FormCreate from "../CRUD/FormCreate/FormCreate";

function Header(props){
    const navigate = useNavigate()
    function Exit(){
        navigate("/")
        props.setUser({check: false})
    }

    ////////////Modals//////////
    const [modalSing_up, setModalSing_up] = useState(false)
    const CloseSing_up = () =>{
        setModalSing_up(false)
    }
    const [modalLogin, setModalLogin] = useState(false)
    const CloseLogin = () =>{
        setModalLogin(false)
    }



    return(

        <div className={s.box}>
            <div className={s.logo}>
                <img src={logo}  alt="#"/>
                <div>
                    {
                        props.user.admin
                            ?
                            <>
                                <div className={s.admin}>Admin</div>
                            </>
                            :
                            <>
                            </>
                    }
                </div>
            </div>

            <div className={s.units}>
                <div className={s.item}>
                    <Link to='/aboutUs' >About Us</Link>
                </div>
                <div className={s.item}>
                    <Link to={'/cars'} >Cars</Link>
                </div>
                {
                    props.user.admin
                        ?
                        <div className={s.item}>
                            <div onClick={()=>setModalLogin(true)}>+Add car</div>
                            <Modal IsOpened={modalLogin}><FormCreate onClose = {CloseLogin}/></Modal>

                        </div>
                        :
                        <div className={s.item}>
                            <Link to={'/basket'} >Basket</Link>
                        </div>
                }
                {   props.user.check
                    ?
                    <>
                        <div className={s.login} onClick={Exit}>Exit</div>
                    </>
                    :
                    <div className={s.authorization}>
                        <div className={s.login}>
                            <div onClick={()=>setModalLogin(true)}>Login</div>
                            <Modal IsOpened={modalLogin}><Login setUser = {props.setUser} onClose = {CloseLogin}/></Modal>                        </div>
                        <div className={s.register}>
                            <div onClick={()=>setModalSing_up(true)}>Sing-up</div>
                            <Modal IsOpened={modalSing_up}><Register setUser = {props.setUser} onClose = {CloseSing_up}/></Modal>
                        </div>
                    </div>
                }
            </div>

        </div>

    )
}
export default Header