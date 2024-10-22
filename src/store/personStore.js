import { create } from "zustand";
import axios from "axios";

const usePersonStore = create((set) => ({
  items: [],
  fetchItems: async() => {
    try{
      const response = await axios.get("https://67180fecb910c6a6e02afe14.mockapi.io/users")
      set({items: response.data})
    }catch(error){
      console.log(error)
    }
  },
  addItem: async(data) => {
    try{
      const response = await axios.post("https://67180fecb910c6a6e02afe14.mockapi.io/users", data)
      set((state) => (
        { items: [...state.items, response.data]}
      ))
    }catch(error){
      console.log(error)
    }
  },

  updateItem: async(id, data) => {
    try{
      const response = await axios.put(`https://67180fecb910c6a6e02afe14.mockapi.io/users/${id}`, data)
      set((state) => ({
        items: state.items.map((item) => (item.id === id ? response.data : item)),
      }))
    }catch(error){
      console.log(error)
    }
  },

  deleteItem: async(id) => {
    try{
      await axios.delete(`https://67180fecb910c6a6e02afe14.mockapi.io/users/${id}`)
      set((state) => ({
        items: state.items.filter((item) => item.id !== id)
      }))
    }catch(error){
      console.log(error)
    }
  }
}))

export default usePersonStore