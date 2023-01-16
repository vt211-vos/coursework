import s from "./App.module.css"
import Header from "./ComponentsApp/Header/Header";
import Footer from "./ComponentsApp/Footer/Footer";
import {useEffect, useState} from "react";
import Login from "./ComponentsApp/Login/Login";
import {Route, Routes} from "react-router-dom";
import Cars from "./ComponentsApp/Cars/Cars";
import Basket from "./ComponentsApp/Basket/Basket";
import ProductPage from "./ComponentsApp/productPage/productPage";
import Comparison from "./ComponentsApp/Сomparison/Comparison";
import Orders from "./ComponentsApp/Orders/Orders";


function App(props) {
    const User = {
        check: false,
        admin: false
    }
    const [user, setUser] = useState(User)
    const [basket, setBasket] = useState([])
    const [comparison, setComparison] = useState([])

    useEffect(()=>{
        if(localStorage.getItem('UserData')){
            setUser(JSON.parse(localStorage.getItem('UserData')))
        }
        if(localStorage.getItem('Basket')){
            setBasket(JSON.parse(localStorage.getItem('Basket')))
        }
        if(localStorage.getItem('Comparison')){
            setComparison(JSON.parse(localStorage.getItem('Comparison')))
        }
    },[])
    //run every time our pet state changes
    useEffect(()=>{
        localStorage.setItem("UserData",JSON.stringify(user))
    },[user])
    useEffect(()=>{
        localStorage.setItem("Basket",JSON.stringify(basket))
    },[basket])
    useEffect(()=>{
        localStorage.setItem("Comparison",JSON.stringify(comparison))
    },[comparison])
  return (
      <>
          <div className={s.box}>
              <Header user = {user} setUser={setUser}/>
                 <div className={s.content}>
                    <Routes>
                        <Route  path='/' element={<Cars
                            user={user}
                            basket={basket}
                            setBasket={setBasket}
                            setUser={setUser}

                        />}/>
                        <Route  path='/login' element={<Login setUser={setUser}/>}/>
                        {/*<Route  path='/aboutUs' element={<AboutUs/>}/>*/}
                        {/*<Route  path='/register' element={<Register setUser={setUser}/>}/>*/}
                        {/*<Route  path='/cabinet' element={<Cabinet/>}/>*/}
                        {/*<Route  path='/crud' element={<FormCreate/>}/>*/}
                        <Route  path='/cars' element={
                            <Cars
                            setComparison = {setComparison}
                            comparison = {comparison}
                            user={user}
                            basket={basket}
                            setBasket={setBasket}
                            setUser={setUser}
                            />}/>
                        {/*<Route  path='car/:id/edit' element={<FormUpdate/>}/>*/}
                        <Route path='/basket' element={<Basket
                            basket={basket}
                            setBasket={setBasket}
                            user={user}
                            setUser={setUser}
                        />}/>
                        <Route path='/productPage/:id' element={<ProductPage user={user} basket = {basket} setBasket = {setBasket}/>}/>
                        <Route path='/comparison' element={<Comparison setComparison = {setComparison} comparison = {comparison}/>}/>
                        <Route path='/orders' element={<Orders/>}/>
                    </Routes>
                 </div>
              <Footer/>
          </div>

      </>
   )
}



export default App;
