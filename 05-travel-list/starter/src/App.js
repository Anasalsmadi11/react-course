import { useState } from "react";
import Logo  from "./components/Logo";
import Form from "./components/Form";
import PackingList from "./components/PackingList";
import Stats from "./components/Stats";

// let initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
//   { id: 3, description: "Charger", quantity: 1, packed: true },
// ];


export default function App() {
  const [items, setItems] = useState([]);

  const handleAddItem = (item) => {
    setItems((items) => [...items, item]);
  };
  const handleDelete = (id) => {
    setItems((items) => items.filter((item) => item.id !== id));
  };

  /*
  
  look at this function carefully, thats how you modify a key in an object:

  */
  const handleSelect = (id) => {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  };

  return (
    <div>
      <Logo />
      <Form handleAddItem={handleAddItem} />
      <PackingList
        handleSelect={handleSelect}
        handleDelete={handleDelete}
        items={items}
        setItems={setItems}
      />
      <Stats items={items} />
    </div>
  );
}









