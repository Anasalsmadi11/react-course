import { useState } from "react";

export default function Form({ handleAddItem }) {
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState(1);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (!description) return;
      const newItem = { id: Date.now(), description, quantity, packed: false };
      handleAddItem(newItem);
      setDescription("");
      setQuantity(1);
    };
  
    return (
      <form className="add-form" onSubmit={handleSubmit}>
        {" "}
        {/*in the handleSubmit attribute any button inside the form trigger this attribute */}
        <h3>what do you need for your 😍 trip</h3>
        <select
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        >
          {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
            <option value={num} key={num}>
              {num}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="items..."
          name="anas"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button>Add</button>
      </form>
    );
  }