export default function Friend ({friends,onSelectedFriend,selected}) {
    return <li className={selected===friends? 'selected' : ''}>
      <img src={friends.image} alt={friends.name} />
      <h3>{friends.name}</h3>
      {friends.balance > 0 && <p className="green">{friends.name} owes you ₹{friends.balance}</p>}
      {friends.balance < 0 && <p className="red">You owe {friends.name} ₹{Math.abs(friends.balance)}</p>}
      {friends.balance === 0 && <p>You and {friends.name} are even.</p>}
      <Button onClick={()=>onSelectedFriend(friends)}>{selected===friends? 'Close' : 'Select'}</Button>
    </li>
  }