import s from './FormCreate.module.css'
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import addImage from './img/image-file-add.png'

function FormCreate(props){
    const navigate = useNavigate()
    const [inputs, setInputs] = useState({})
    function handleChangeImg(e){

        const reader = new FileReader()
        reader.onload =()=>{
            const name = e.target.name
            const value = reader.result
            setInputs(values=>({...values, [name]:value}))
            console.log(value)
            console.log(inputs)
        }
        reader.readAsDataURL(e.target.files[0])


    }
    function handleChange(e){
        const name = e.target.name
        const value = e.target.value
        setInputs(values=>({...values, [name]:value}))
    }
    function handleSubmit(e){
        e.preventDefault()
        axios.post("http://api/newCar", inputs).then(function (response) {
                console.log(response.data)
            props.onClose()
            navigate('/cars')
        })
}
    return(

    <div className={s.mainBox}>
        <div className={s.box}>
            <div onClick={props.onClose} className={s.close}>x</div>

            <div className={s.title}>New Post</div>
            <div className="form">
                <form onSubmit={handleSubmit}>
                    <div className={s.legend}>Brand</div>
                    <input className={s.input} required name='brand' onChange={handleChange}/>

                    <div className={s.legend}>Model</div>
                    <input className={s.input} required  name='model' onChange={handleChange}/>

                    <div className={s.legend}>Price</div>
                    <input className={s.input} required name='price' onChange={handleChange}/>

                    <div className={s.legend}>Image</div>

                    <label className={s.customFileUpload}>
                        <input type="file" id='file' accept='image/*'  name='img' onChange={handleChangeImg}/>
                        <img src={addImage}/> Attach
                    </label>

                    <div className={s.btn}>
                        <button>Create</button>
                    </div>
                </form>
            </div>
        </div>
    </div>


    )
}
export default FormCreate