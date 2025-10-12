import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Mamad",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/93/Mohammad_Reza_Golzar_13960427001216636359829477667254_65485.jpg",
    balance: -7,
  },
  {
    id: 933372,
    name: "AliReza",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/5b/Alireza_Jahanbakhsh_at_Tasnim_News_Agency_02.jpg",
    balance: 20,
  },
  {
    id: 499476, 
    name: "Amir",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Amir_Abedzadeh_in_Iran_national_football_team.jpg",
    balance: 0,
  },
];


function Button({children,onClick}) {
  return <button className="button" onClick={onClick}>{children}</button>
};


export default function App() {
  const [friends,setFriends] = useState(initialFriends);
  const [showAddFriend,setShowAddFriend] = useState(false);
  const [selectedFriend,setSelectedFriend] = useState(null);

  function handleShowAddFriend() {
    setShowAddFriend((show) => !show);
};

  function handleAddFriend (friend) {
    setFriends(friends => [...friends,friend]);
    setShowAddFriend(false);
  };

  function handleSelectedFriend(friend) {
    // setSelectedFriend(friend);
    setSelectedFriend(cur => cur?.id === friend.id ? null : friend);
    setShowAddFriend(false);
  };

  return (
    <div className="app">
      <div className="sidebar">

      <FriendsList friends={friends} onSelection={handleSelectedFriend} selectedFriend={selectedFriend}></FriendsList>

      {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend}></FormAddFriend>}

      <Button onClick={handleShowAddFriend}>{showAddFriend ? 'close' : 'Add new friend'}</Button>

      </div>
      {selectedFriend && <FormSplitBill selectedFriend={selectedFriend}></FormSplitBill>}
    </div>
  );
};


function FriendsList({friends,onSelection,selectedFriend}) {

  return(
    <ul>
      {friends.map(friend=>
      <Friend friend={friend} key={friend.id} onSelection={onSelection} selectedFriend={selectedFriend}></Friend>
      )} 
    </ul>
  );
};

function Friend({friend,onSelection,selectedFriend}) {
  const isSelected = selectedFriend?.id === friend.id ;
  return(
    <li className={isSelected ? 'selected' : ''}>
      <img alt={friend.name} src={friend.image}></img>
      <h3>{friend.name}</h3>
      {friend.balance < 0 && <p className="red">You owe {friend.name} {Math.abs(friend.balance)} T</p>}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}
      {friend.balance > 0 && <p className="green">{friend.name} owes you {Math.abs(friend.balance)} T</p>}
      <Button onClick={()=>onSelection(friend)}>{isSelected ? 'close' : 'select'}</Button>
    </li>
  );
};




function FormAddFriend({onAddFriend}) {
  const[name,setName] = useState("");
  const[image,setImage] = useState("https://i.pinimg.com/474x/07/c4/72/07c4720d19a9e9edad9d0e939eca304a.jpg"); 
  function handleSubmit(e) {
    e.preventDefault();

    if(!name || !image) return ;

    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name,
      image : `${image}?=${id}`,
      balance:0
    };

    onAddFriend(newFriend);

    setName('');
    setImage("https://i.pinimg.com/474x/07/c4/72/07c4720d19a9e9edad9d0e939eca304a.jpg");
  };
  return(
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>✔Friend name</label>
      <input type="text" value={name} onChange={(e)=>setName(e.target.value)}></input>

      <label>🎞Image URL</label>
      <input type="text" value={image} onChange={(e)=>setImage(e.target.value)}></input>
      <Button>Add</Button>
    </form>
  );
};


function FormSplitBill({selectedFriend}) {
  return(
    <form className="form-split-bill">
      <h2>Split a bill with {selectedFriend.name}</h2>

      <label>💵 Bill Value</label>
      <input type="text"></input>

      <label>🔴Your expense</label>
      <input type="text"></input>

      <label>🔴{selectedFriend.name}'s expense</label>
      <input type="text" disabled></input>

      <label>✔Who is payin the bill?</label>
      <select>
        <option value="user">you</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>


      <Button>Split</Button>

    </form>
  );
};