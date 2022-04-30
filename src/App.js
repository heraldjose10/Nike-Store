import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import {
  selectAccessToken,
  selectRefreshToken,
  selectUserName
} from "./redux/user/user.selectors";
import { validateUserToken } from "./redux/user/user.actions";

import Footer from "./components/footer/footer.component";
import NavBar from "./components/header/header.component";
import ProductsGrid from "./components/products-grid/products-grid.component";
import ScrollToTop from "./components/scroll-to-top/scroll-to-top.component";
import Home from "./pages/home/home.component";
import Item from "./pages/item/item.component";
import Shop from "./pages/shop/shop.component";
import Register from "./pages/register/register.component";
import Cart from "./pages/cart/cart.component";

const App = () => {

  const dispatch = useDispatch()

  const accessToken = useSelector(selectAccessToken)
  const refreshToken = useSelector(selectRefreshToken)
  const username = useSelector(selectUserName)

  useEffect(() => {
    dispatch(validateUserToken(
      accessToken,
      refreshToken,
      `/api/users/${username}`
    ))
  })

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
          <Route path='/register' element={<Register />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>
        <Footer />
      </ScrollToTop>
    </div>
  )
}

export default App;
