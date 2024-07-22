import { useState } from "react";
import FriendsList from "./components/FriendsList";
import FormAddFriend from "./components/FormAddFriend";
import FormSplitBill from "./components/FormSplitBill";
import Button from "./components/Button";


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









