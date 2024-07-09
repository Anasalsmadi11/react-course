import { useState } from "react";
import Item from './Item'
export default function PackingList({setItems, handleSelect, handleDelete, items }) {
    const[sortBy, setSortBy]=useState('input')
  
    let sortedItems;
    if(sortBy === "input" ) sortedItems = items
    if(sortBy ==="description") sortedItems = items.slice().sort((a,b)=>a.description.localeCompare(b.description)) //here slice to not mutate the original array(items) cus i need its order for the input ordering
    if(sortBy==="status" ) sortedItems =items.slice().sort((a,b)=> Number(a.packed)- Number(b.packed))
    
    const handleClear=()=>{
      const confirmed= window.confirm('Are you sure you want to delete all items?')
      if(confirmed) setItems([])
    }
    return (
      <div className="list">
        <ul>
          {sortedItems.map((item) => (
            <Item
              handleSelect={handleSelect}
              handleDelete={handleDelete}
              item={item}
              key={item.id}
            />
          ))}
        </ul>
        <div className="actions">
          <select value={sortBy}  onChange={(e)=>setSortBy(e.target.value)}>
            <option value="input">Sort by input order</option>
            <option value="description">Sort by description</option>
            <option value="status">Sort by Status</option>
          </select>
          <button onClick={handleClear}>Clear list</button>
        </div>
      </div>
    );
  }