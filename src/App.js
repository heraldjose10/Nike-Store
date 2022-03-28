import { useEffect, useState } from "react";

import banners from "./data/banners";

import Banner from "./components/banner/banner.component";
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
      <main className='grow mx-6 my-6'>
        <Banner {...banners['main']} />
        <Banner {...banners['featured']} />
        <Banner {...banners['trending']} />
      </main>
      <Footer />
    </div>
  )
}

export default App;
