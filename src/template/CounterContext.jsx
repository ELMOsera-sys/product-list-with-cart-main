import {useState, useEffect, createContext} from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [data,setData]= useState([]);
    const [confirmation,setConfirmation]= useState(false);


 useEffect(
  ()=>{
    async function fetchData(){
      try{
        const response= await fetch("data.json");
        const data= await response.json();

        const dataWithId=data.map((item,index) => ({ ...item,id: index , count: 0 }));
        setData(dataWithId)
      }
      catch(error){
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  },[]
)


const increment= id=>{
    setData(prevData => prevData.map(item => item.id === id ? { ...item, count: item.count + 1 } : item));
}

const decrement= id=>{
    setData(prevData => prevData.map(item => item.id === id ? { ...item, count: Math.max(0, item.count - 1) } : item));
}

const totalItems = data.reduce((sum, item) => sum + item.count, 0);
const totalPrice = data.reduce((sum, item) => sum + item.price * item.count, 0);

    return (
        <DataContext.Provider value={{ data, increment, decrement, totalItems, totalPrice, setConfirmation, confirmation }}>
            {children}
        </DataContext.Provider>
    )
}
