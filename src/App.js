import { useEffect, useState } from "react";

const App = () => {

  const [store, setStore] = useState([])

  useEffect(() => {
    const callAPI = async () => {
      const res = await fetch('/shop')
      const data = await res.json()
      setStore([...data.products])
    }
    callAPI()
  }, [])

  return (
    <div>
      <h1 className="text-xl">Nike Store</h1>
      {
        store.map(product => (
          <div key={product.id}>
            <h3>{product.name}</h3>
            <p>{product.price}</p>
          </div>
        ))
      }
    </div>
  )
}

export default App;
