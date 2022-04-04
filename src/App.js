import { Route, Routes } from "react-router-dom";

import Footer from "./components/footer/footer.component";
import NavBar from "./components/header/header.component";
import ProductsGrid from "./components/products-grid/products-grid.component";
import ScrollToTop from "./components/scroll-to-top/scroll-to-top.component";
import Home from "./pages/home/home.component";
import Item from "./pages/item/item.component";
import Shop from "./pages/shop/shop.component";

const App = () => {

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <ScrollToTop>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/shop/' element={<Shop />}>
            <Route path='' element={<ProductsGrid />} />
            <Route path='category/:categoryId' element={<ProductsGrid />} />
            <Route path='product/:productId' element={<Item />} />
          </Route>
        </Routes>
        <Footer />
      </ScrollToTop>
    </div>
  )
}

export default App;
