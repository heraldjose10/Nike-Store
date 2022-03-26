import { useEffect, useState } from "react";
import Footer from "./components/footer/footer.component";
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
    <div className="min-h-screen flex flex-col justify-between">
      <NavBar />
      <h1 className="grow">Nike Store!!</h1>
      <Footer />
    </div>
  )
}

export default App;
