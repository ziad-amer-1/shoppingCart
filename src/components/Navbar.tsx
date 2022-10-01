import React from "react"
import { AiOutlineShoppingCart } from "react-icons/ai"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { RootState } from "../redux/store"

const Navbar: React.FC = () => {
  const { cartTotalQuantity } = useSelector((state: RootState) => state.cart)

  return (
    <nav className="navbar">
      <Link to="/shoppingCart">
        <h2 className="logo">Shopping Cart</h2>
      </Link>
      <Link to="/shoppingCart/cart">
        <div className="nav-bag">
          <div className="shopping-cart-icon">
            <AiOutlineShoppingCart fontSize={25} />
          </div>
          <div className="bag-quantity">
            <span>{cartTotalQuantity}</span>
          </div>
        </div>
      </Link>
    </nav>
  )
}

export default Navbar
