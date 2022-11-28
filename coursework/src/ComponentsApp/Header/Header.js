import logo from './logo/logo.webp'
import s from './Header.module.css'
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";

function Header(props){
    const navigate = useNavigate()
    function Exit(){
        navigate("/")
        props.setUser({check: false})
    }
    return(
        <>
            <div>
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
                        <Link to='/' className={s.item}>About Us</Link>
                        <Link to={'/cars'} className={s.item}>Cars</Link>
                        {/*<Link to='/cabinet' className={s.item}>Cabinet</Link>*/}
                        {
                            props.user.admin
                                ?
                                <>
                                    <Link to={'/crud'} className={s.item}>CRUD</Link>
                                </>
                                :
                                <>
                                    <Link to={'/basket'} className={s.item}>Basket</Link>
                                </>
                        }
                        {   props.user.check
                            ?
                            <>
                                <div className={s.login} onClick={Exit}>Exit</div>
                            </>
                            :
                            <>
                                <Link to='/login' className={s.login}>Login</Link>
                                <Link to="/register" className={s.register}>Register</Link>
                            </>
                        }
                    </div>
                </div>
            </div>

        </>
    )
}
export default Header