import Button from "./Button"


export default function FormAddFriend ({addFriend}) {
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