import Button from "./Button"


export default function FormSplitBill ({selectedFriend,updateSplit}) {
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