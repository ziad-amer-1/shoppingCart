import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { AppDispatch, RootState } from "../redux/store"
import { BsArrowLeft } from "react-icons/bs"
import { FaTrashAlt } from "react-icons/fa"
import { formatCurrency } from "../utils/formatCurrency"
import {
  clearCart,
  decreaseCartQuantity,
  getTotal,
  increaseCartQuantity,
  removeCart,
} from "../redux/cartSlice"

const Cart: React.FC = () => {
  const dispatch: AppDispatch = useDispatch()

  const cart = useSelector((state: RootState) => state.cart) 
  const { cartItems, cartTotalAmount } = useSelector(
    (state: RootState) => state.cart
  )
  
  useEffect(() => {
    dispatch(getTotal(null))
  }, [cart, dispatch])

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <div className="cart-empty">
          <p>Your Cart is Currently Empty</p>
          <div className="start-shopping">
            <Link to="/shoppingCart">
              <span>
                <BsArrowLeft fontSize={20} />
              </span>
              <span>Start Shopping</span>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="titles">
            <h3 className="product-title">Product</h3>
            <h3 className="price">Price</h3>
            <h3 className="quantity">Quantity</h3>
            <h3 className="total">Total</h3>
          </div>
          <div className="cart-items">
            {cartItems?.map((cartItem) => (
              <div className="cart-item" key={cartItem.id}>
                <div className="cart-product">
                  <img src={cartItem.img} alt={cartItem.name} />
                  <div>
                    <h3>{cartItem.name}</h3>
                    <p>{cartItem.desc}</p>

                    <span
                      onClick={() => dispatch(removeCart({ id: cartItem.id }))}
                    >
                      <FaTrashAlt
                        fontSize={18}
                        style={{
                          marginTop: "0.7rem",
                          cursor: "pointer",
                          color: "gray",
                        }}
                      />
                    </span>
                  </div>
                </div>
                <div className="cart-product-price">
                  {formatCurrency(cartItem.price)}
                </div>
                <div className="cart-product-quantity">
                  <button
                    onClick={() =>
                      cartItem.cartQuantity === 1
                        ? dispatch(removeCart({ id: cartItem.id }))
                        : dispatch(decreaseCartQuantity({ id: cartItem.id }))
                    }
                  >
                    -
                  </button>
                  <div className="count">{cartItem.cartQuantity}</div>
                  <button
                    onClick={() =>
                      dispatch(increaseCartQuantity({ id: cartItem.id }))
                    }
                  >
                    +
                  </button>
                </div>
                <div className="cart-product-total-price">
                  {formatCurrency(cartItem.price * cartItem.cartQuantity)}
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <div
              className="button clear-cart"
              onClick={() => dispatch(clearCart(null))}
            >
              Clear Cart
            </div>
            <div className="cart-checkout">
              <div className="subtotal">
                <span>Subtotal</span>
                <span className="amount">
                  {formatCurrency(cartTotalAmount)}
                </span>
              </div>
              <p>Taxes and Shipping Calculated at Checkout</p>
              <button>Checkout</button>
              <div className="continue-shopping">
                <Link to="/shoppingCart">
                  <span>
                    <BsArrowLeft fontSize={20} />
                  </span>
                  <span>Continue Shopping</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
