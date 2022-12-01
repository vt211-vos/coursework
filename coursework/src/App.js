import s from "./App.module.css"
import Header from "./ComponentsApp/Header/Header";
import Footer from "./ComponentsApp/Footer/Footer";
import {useEffect, useState} from "react";
import Login from "./ComponentsApp/Login/Login";
import {Route, Routes} from "react-router-dom";
import AboutUs from "./ComponentsApp/AboutUs/AboutUs";
import Register from "./ComponentsApp/Register/Register";
import Cabinet from "./ComponentsApp/Cabinet/Cabinet";
import FormCreate from "./ComponentsApp/CRUD/FormCreate/FormCreate";
import Cars from "./ComponentsApp/Cars/Cars";
import FormUpdate from "./ComponentsApp/CRUD/FormUpdate/FormUpdate";
import Basket from "./ComponentsApp/Basket/Basket";


function App(props) {
    const User = {
        check: false,
        admin: false
    }
    const [user, setUser] = useState(User)
    const [basket, setBasket] = useState([])
    useEffect(()=>{
        if(localStorage.getItem('UserData')){
            setUser(JSON.parse(localStorage.getItem('UserData')))
        }
        if(localStorage.getItem('Basket')){
            setBasket(JSON.parse(localStorage.getItem('Basket')))
        }
    },[])
    //run every time our pet state changes
    useEffect(()=>{
        localStorage.setItem("UserData",JSON.stringify(user))
    },[user])
    useEffect(()=>{
        localStorage.setItem("Basket",JSON.stringify(basket))
    },[basket])
  return (
      <>
          <div className={s.box}>
              <Header user = {user} setUser={setUser}/>
                 <div className={s.content}>
                    <Routes>
                        <Route  path='/' element={<AboutUs/>}/>
                        <Route  path='/login' element={<Login setUser={setUser}/>}/>
                        <Route  path='/register' element={<Register setUser={setUser}/>}/>
                        <Route  path='/cabinet' element={<Cabinet/>}/>
                        <Route  path='/crud' element={<FormCreate/>}/>
                        <Route  path='/cars' element={
                            <Cars
                            user={user}
                            basket={basket}
                            setBasket={setBasket}
                        />}/>
                        <Route  path='car/:id/edit' element={<FormUpdate/>}/>
                        <Route path='/basket' element={<Basket
                            basket={basket}
                            setBasket={setBasket}
                            user={user}
                        />}/>
                    </Routes>
                 </div>
              <Footer/>
          </div>

      </>
   )
}



export default App;
