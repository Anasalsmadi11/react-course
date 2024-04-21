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
  const numPizzas= pizzas.length // zero is falsy value which means the map wont render at all, but if i put pizzas which is empty array it is a truthy value and this means the map will render and this will slow the app in big projects
  return (
    <main className="menu">
      <h2>Our menu</h2>
          {numPizzas > 0 && <ul className="pizzas"> 
        {pizzaData.map((item)=>{ // react doesnt render a truthy or falsy value
         return <Pizza pizzaObj={item} key={item.name}/>
        })}
        </ul>}

    </main>
  )
}

function Footer(){
  // return React.createElement('footer',null, "we're open")
    const hour= new Date().getHours()
    const openHour= 12
    const closeHour= 22
    const isOpen = openHour >= hour <= closeHour

  return( 
  <footer className="footer">
    {isOpen &&
    <div className="order">

    <p>we're open until {closeHour}:00</p>
    <button className="btn">Order</button>
    </div>}
  </footer >)
}



function Pizza(props){
  return <div className="pizza">
    <div key={props.key}>
    <img src={props.pizzaObj.photoName}/>
    <div>

    <h2>{props.pizzaObj.name}</h2>
    <p>{props.pizzaObj.ingredients}</p>
    <span>{props.pizzaObj.price +3}</span>
    </div>
  </div>
  </div>
}



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
