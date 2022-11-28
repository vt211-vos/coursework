import s from './Footer.module.css'
import twitter from './img/twitter.svg'
import inst from './img/instagram.svg'
import facebook from './img/facebook.svg'
import youtube from './img/youtube.svg'

function Footer(props){
    return(
        <>
            <div className={s.box}>
                <img className={s.network} src={twitter} alt=""/>
                <img className={s.network} src={inst} alt=""/>
                <img className={s.network} src={facebook} alt=""/>
                <img className={s.network} src={youtube} alt=""/>
                <div className={s.text}>
                    ©2020 Thousand Sunny. All rights reserved
                </div>
            </div>
        </>
    )
}
export default Footer