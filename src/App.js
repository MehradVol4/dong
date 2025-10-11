const initialFriends = [
  {
    id: 118836,
    name: "Mamad",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "AliReza",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Amir",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  return (
    <div className="app">
      <div className="sidebar">
      <FriendsList></FriendsList>
      <FormAddFriend></FormAddFriend>
      <Button>Add new Friend</Button>
      </div>
      <FormSplitBill></FormSplitBill>
    </div>
  );
};


function FriendsList() {
  const friends = initialFriends;

  return(
    <ul>
      {friends.map(friend=>
      <Friend friend={friend} key={friend.id}></Friend>
      )} 
    </ul>
  );
};

function Friend({friend}) {
  return(
    <li>
      <img alt={friend.name} src={friend.image}></img>
      <h3>{friend.name}</h3>
      {friend.balance < 0 && <p className="red">You owe {friend.name} {Math.abs(friend.balance)} T</p>}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}
      {friend.balance > 0 && <p className="green">{friend.name} owes you {Math.abs(friend.balance)} T</p>}
      <Button>Select</Button>
    </li>
  );
};


function Button({children}) {
  return <button className="button">{children}</button>
};

function FormAddFriend() {
  return(
    <form className="form-add-friend">
      <label>✔Friend name</label>
      <input type="text"></input>

      <label>🎞Image URL</label>
      <input type="text"></input>
      <Button>Add</Button>
    </form>
  );
};


function FormSplitBill({friend}) {
  return(
    <form className="form-split-bill">
      <h2>Split a bill with asghar</h2>
    </form>
  );
};