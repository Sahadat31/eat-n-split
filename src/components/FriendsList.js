import Friend from "./Friend"


export default function FriendsList ({friends,onSelectedFriend,selected}) {
    return <ul>
      {friends.map(friend=><Friend friends={friend} key={friend.id} onSelectedFriend={onSelectedFriend} selected={selected}></Friend>)}
    </ul>
  }