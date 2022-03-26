import { useEffect, useState } from "react";
import NavBar from "./components/header/header.component";

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
      <NavBar/>
    </div>
  )
}

export default App;
