import usePersonStore from "./store/personStore"
import { useEffect, useState } from "react"

function App() {

  const{items, fetchItems, addItem, deleteItem, updateItem} = usePersonStore()
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')

  useEffect(()=>{
    fetchItems()
    console.log(items)
  }, [fetchItems])

  const handleAddItem = () => {
    addItem({name: name, lastname: lastName})
    setName("")
    setLastName("")
  }

  const handleUpdateItem = (id) => {
    const update = prompt("Actualizar nombre")
    if(update){
      updateItem(id, {name: update})
    }
  }

  return (
    <div className="flex">
      <div className="flex flex-col gap-2 px-16 py-12 w-1/3">
       <h2 className="font-medium">Agregar Persona</h2>
          <label>Nombre</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          <label>Apellido</label>
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          <button onClick={handleAddItem} className="text-white bg-blue-600 rounded-md px-4 py-2" >Agregar</button>
       </div>
       <div className="flex flex-wrap gap-2 px-16 py-12 w-full">
        {items.map((item) => (
          <div key={item.id} className="px-6 py-4 border-gray-800 border-[0.5px] rounded-md mb-2">
            <h1 className="font-medium">{item.name} {item.lastname}</h1>
            <p>{item.phone}</p>
            <button className="text-white bg-red-600 rounded-md px-4 py-2 mt-2"
            onClick={() => deleteItem(item.id)}>Eliminar</button>
            <button className="text-white bg-blue-600 rounded-md px-4 py-2 mt-2"
            onClick={() => handleUpdateItem(item.id)}>Actualizar</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
