import React, { useEffect } from "react"
import "./App.css"
import Cart from "./components/Cart"
import Home from "./components/Home"
import Navbar from "./components/Navbar"
import NotFoundPage from "./components/NotFoundPage"
import { Routes, Route } from "react-router-dom"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "./redux/store"
import { productsFetch } from "./redux/productsSlice"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { getTotal } from "./redux/cartSlice"

const App: React.FC = () => {
  const dispatch: AppDispatch = useDispatch()

  dispatch(getTotal(null))
  useEffect(() => {
    dispatch(productsFetch())
  }, [dispatch])

  return (
    <>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/shoppingCart" element={<Home />} />
        <Route path="/shoppingCart/cart" element={<Cart />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
