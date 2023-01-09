import s from './modal.module.css'

const Modal = props => {
    return(
        <div className={`${s.modal} ${props.IsOpened ? s.open : s.close}`} style={{...props.style}}>
            <div className={s.model_body}>
                {props.children}
            </div>
        </div>
    )
}

export  default Modal