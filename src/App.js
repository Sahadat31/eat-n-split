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

export default function App () {
  const [showAddForm, setShowAddForm] = useState(false)
  const [friends, setFriends] = useState(initialFriends)
  const [selectedFriend, setSelectedFriend] = useState(null)
  // const [showSplitForm, setShowSplitForm] = useState(false)
  const addFriend = (newFriend) => {
    setFriends(friends=>[...friends,newFriend])
    setShowAddForm(false)
  }
  const onSelectedFriend = (friend) => {
    setSelectedFriend(old=> friend===old ? null : friend)
    setShowAddForm(false)
  }
  const updateSplit = (value) => {
    setFriends(friends => friends.map(friend=> friend.id===selectedFriend.id? {...friend, balance: friend.balance+value}: friend))
    setSelectedFriend(null)
  }
  return <div className="app">
    <div className="sidebar">
      <FriendsList friends={friends} onSelectedFriend={onSelectedFriend} selected={selectedFriend}></FriendsList>
      {showAddForm && <FormAddFriend addFriend={addFriend}/>}
      <Button onClick={()=> setShowAddForm(show=> !show)}>{showAddForm ? 'Close' : 'Add Friend'}</Button>
    </div>
    {selectedFriend && <FormSplitBill selectedFriend={selectedFriend} updateSplit={updateSplit}/>}
  </div>
}


function FriendsList ({friends,onSelectedFriend,selected}) {
  return <ul>
    {friends.map(friend=><Friend friends={friend} key={friend.id} onSelectedFriend={onSelectedFriend} selected={selected}></Friend>)}
  </ul>
}

function Friend ({friends,onSelectedFriend,selected}) {
  return <li className={selected===friends? 'selected' : ''}>
    <img src={friends.image} alt={friends.name} />
    <h3>{friends.name}</h3>
    {friends.balance > 0 && <p className="green">{friends.name} owes you ₹{friends.balance}</p>}
    {friends.balance < 0 && <p className="red">You owe {friends.name} ₹{Math.abs(friends.balance)}</p>}
    {friends.balance === 0 && <p>You and {friends.name} are even.</p>}
    <Button onClick={()=>onSelectedFriend(friends)}>{selected===friends? 'Close' : 'Select'}</Button>
  </li>
}

function Button ({children, onClick}) {
  return <button className="button" onClick={onClick}>{children}</button>
}
function FormAddFriend ({addFriend}) {
  const [name,setName] = useState('')
  const [url,setUrl] = useState('https://i.pravatar.cc/48?u=')
  const handleSubmit = (e) => {
    e.preventDefault()
    const id = crypto.randomUUID()
    if (name && url) {
      const newFriend = {name,image: `${url}${id}`,balance: 0, id:id}
      addFriend(newFriend)
      setName('')
      setUrl('https://i.pravatar.cc/48?u=')
    }
  }
  return <form className="form-add-friend" onSubmit={handleSubmit}>
    <label>🫂Friend Name</label>
    <input value={name} type="text" onChange={(e)=> setName(e.target.value)}/>

    <label>🌄Image URL </label>
    <input value={url} type="text" onChange={(e)=> setUrl(e.target.value)}/>

    <Button>Add</Button>
  </form>
}

function FormSplitBill ({selectedFriend,updateSplit}) {
  const [bill, setBill]= useState('')
  const [paidByUser, setPaidByUser] = useState('')
  const [whoIsPaying, setWhoIsPaying] = useState('user')
  const paidByFriend = bill ? bill-paidByUser : ''
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!bill || !paidByUser) return
    // const id = selectedFriend.id
    updateSplit(whoIsPaying === 'user' ? paidByUser : -(paidByFriend))
    setBill('')
    setPaidByUser('')
    setWhoIsPaying('user')
  }
  return <form className="form-split-bill" onSubmit={handleSubmit}>
    <h2>Split your Expense with {selectedFriend.name}</h2>
    <label>💰Bill Value </label>
    <input type="text" value={bill} onChange={(e)=> setBill(Number(e.target.value))}/>
    <label>🤑Your expense </label>
    <input type="text" value={paidByUser} onChange={(e)=> setPaidByUser(Number(e.target.value)>bill? paidByUser: Number(e.target.value))}/>
    <label>🪙{selectedFriend.name}'s expense </label>
    <input type="text" disabled value={paidByFriend}/>

    <label>Who is paying the bill?</label>
    <select value={whoIsPaying} onChange={(e)=> setWhoIsPaying(e.target.value)}>
      <option value='user'>You</option>
      <option value='friend'>{selectedFriend.name}</option>
    </select>
    <Button>Split</Button>
  </form>
}