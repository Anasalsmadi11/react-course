import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function Button({ onClick, children }) {
  return (
    <button onClick={onClick} className="button">
      {children}
    </button>
  );
}

export default function App() {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFreind, setSelectedFriend] = useState(null);

  const handleShowAddFriend = () => {
    setShowAddFriend((s) => !s);
  };
  const handleAddFriend = (newFriend) => {
    setFriends((friends) => [...friends, newFriend]);
    setShowAddFriend(false);
  };
  const handleSelectedFriend = (friend) => {
    setSelectedFriend(selectedFreind?.id === friend.id ? null : friend); // ? becuse before i select any friend it will be null and there is no null.id so i put ?
    setShowAddFriend(false);
  };
  const handleSplitBill = (value) => {
  setFriends(friends =>friends.map(friend=>friend.id ===selectedFreind.id ?{...friend,balance:friend.balance +value}:friend))
    setSelectedFriend(null)
};
  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          selectedFreind={selectedFreind}
          handleSelectedFriend={handleSelectedFriend}
          friends={friends}
        />
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}

        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "Close" : "Add friend"}
        </Button>
      </div>
      {selectedFreind && (
        <FormSplitBill
        key={selectedFreind.id}
          onSplitBill={handleSplitBill}
          selectedFreind={selectedFreind}

        />
      )}
    </div>
  );
}

function FriendList({ selectedFreind, friends, handleSelectedFriend }) {
  // const friends = initialFriends;
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          handleSelectedFriend={handleSelectedFriend}
          selectedFreind={selectedFreind}
          friend={friend}
          key={friend.id}
        />
      ))}
    </ul>
  );
}

function Friend({ selectedFreind, handleSelectedFriend, friend }) {
  // const isSelected= selectedFreind? selectedFreind.id === friend.id :null
  const isSelected = selectedFreind?.id === friend.id;
  // console.log(selectedFreind.id)
  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>

      {friend.balance < 0 && (
        <p className="red">
          {" "}
          you owe {friend.name} {Math.abs(friend.balance)}$
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {" "}
          {friend.name} owes you {Math.abs(friend.balance)}$
        </p>
      )}
      {friend.balance === 0 && <p> you and {friend.name} are even</p>}
      <Button onClick={() => handleSelectedFriend(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}

function FormAddFriend({ friends, onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48?");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !image) return;
    const id = crypto.randomUUID();
    const newFriend = { id: id, name, image: `${image}=${id}`, balance: 0 };
    onAddFriend(newFriend);

    setName("");
    setImage("https://i.pravatar.cc/48?");
  }

  return (
    <form onSubmit={handleSubmit} className="form-add-friend">
      <label>Friend name</label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
      />
      <label>Image Url</label>
      <input
        value={image}
        onChange={(e) => setImage(e.target.value)}
        type="text"
        name
      />
      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill({onSplitBill, selectedFreind }) {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const paidByFriend = bill ? bill - paidByUser : "";
  const [whoIsPaying, setWhoIsPaying] = useState("user"); //it is the value of option 1

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!bill || !paidByUser) return;
    onSplitBill(whoIsPaying === "user" ? paidByFriend : -paidByUser);
  };
  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>split with {selectedFreind.name}</h2>
      <label>💰 Bill value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />

      <label>🧕 your expenses</label>
      <input
        type="text"
        value={paidByUser}
        onChange={(e) =>
          setPaidByUser(
            Number(e.target.value) > bill ? paidByUser : Number(e.target.value)
          )
        }
      />

      <label>🙇‍♀️ {selectedFreind.name}'s expenses</label>
      <input type="text" disabled value={paidByFriend} />
      <label>🦢 Who is paying the bill</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{selectedFreind.name}</option>
      </select>

      <Button>Split Bill</Button>
    </form>
  );
}
