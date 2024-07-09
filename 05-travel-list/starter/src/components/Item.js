export default function Item({ handleSelect, handleDelete, item }) {
    return (
      <li>
        <input onClick={() => handleSelect(item.id)} type="checkbox" />
        <span style={item.packed ? { textDecoration: "line-through" } : {}}>
          {item.quantity} {item.description}
        </span>
        <button onClick={() => handleDelete(item.id)}>❌</button>
      </li>
    );
  }