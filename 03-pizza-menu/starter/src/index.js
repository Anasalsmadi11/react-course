import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import './index.css'

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];


const App = () => {
  return <div className="container">
    <Header/>
  <Menu/>
  <Footer/>
  </div> 
};
export default App();

function Header() {
  // const style= {color:"red", fontSize:"48px",textTransform:"uppercase"}
  const style= {}
  return (
    <header className="header footer" >
      <h1 style={style} >We're providing Pizza Co.</h1>
    </header>
  )
}

function Menu() {
  const pizzas= pizzaData
  // const pizzas=[]

  // console.log(Boolean([]))   // truthy value
  // console.log(Boolean(numPizzas))   // falsy value

  const numPizzas= pizzas.length // zero is falsy value which means the map wont render at all, but if i put pizzas which is empty array it is a truthy value and this means the map will render and this will slow the app in big projects
  return (
    <main className="menu">
      <h2>Our menu</h2>

      {/* Conditional redering with && */}

          {/* {numPizzas >0 && <ul className="pizzas"> 
        {pizzas.map((item)=>{ // react doesnt render a truthy or falsy value
         return <Pizza pizzaObj={item} key={item.name}/>
        })}
        </ul>} */}
          
      {/* Conditional redering with ternary if */}
      
          {numPizzas > 0 ? <ul className="pizzas"> 
          <>  {/* i put react fragment because we cant render jsx element if it is more than one */}
          <p> Authintic italian cuisin. 6 creative dishes to choose from. all from our stone oven, all organic, all delecius</p>
        {pizzas.map((item)=>(           // notice here we didnt put {} to the map function instead we put () without return, if you want to put {} you must put return
          <Pizza pizzaObj={item} key={item.name}/>
        ))}
        </>
        </ul>: "we are working on our menu"} 

    </main>
  )
}

function Footer(){
  // return React.createElement('footer',null, "we're open")
    const hour= new Date().getHours()
    const openHour= 12
    const closeHour= 20
    const isOpen = openHour <= hour && hour>= closeHour

    return( 
  <footer className="footer">
    {isOpen ?
      <Order openHour={openHour} closeHour={closeHour}/>:
    <p> we welcome you between {openHour}:00 and {closeHour}:00</p>}
  </footer >)
}

function Order({closeHour}){
  return <div className="order">

  <p>we're open until {closeHour}:00</p>
  <button className="btn">Order</button>
  </div>
}

function Pizza(props){
  const {name, ingredients,photoName, price, soldOut}= props.pizzaObj
  return(
    <li className={`pizza ${soldOut ? "sold-out":""}`}>

   <div className="pizza">
    <div key={props.key}>
    <img src={photoName}/>
    <div>

    <h2>{name}</h2>
    <p>{ingredients}</p>
    <span>{soldOut? "Sold Out": price +3}</span>
    </div>
  </div>
  </div>
    </li>
  )
}



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
