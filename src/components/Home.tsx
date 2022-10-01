import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { addToCart } from "../redux/cartSlice"
import type { Product } from "../redux/productsSlice"
import type { AppDispatch, RootState } from "../redux/store"
import { formatCurrency } from "../utils/formatCurrency"
import Loading from "./Loading"

const Home: React.FC = () => {
  const { products, status } = useSelector((state: RootState) => state.products)

  const dispatch: AppDispatch = useDispatch()

  function handleAddToCart(product: Product) {
    dispatch(addToCart(product))
  }

  return (
    <div className="home-container">
      {status === "pending" ? (
        <Loading />
      ) : (
        <>
          <h2>New Arrival</h2>
          <div className="products-container">
            {products?.map((product: Product) => (
              <div className="product" key={product.id}>
                <h3>{product.name}</h3>
                <img src={product.img} alt={product.name} />
                <div className="details">
                  <span className="desc">{product.desc}</span>
                  <span className="price">{formatCurrency(product.price)}</span>
                </div>
                <Link to="/shoppingCart/cart">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="add-to-cart"
                  >
                    Add To Cart
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Home
