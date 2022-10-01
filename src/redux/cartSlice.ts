import { createSlice } from "@reduxjs/toolkit"
import type { Product } from "./productsSlice"
import { toast } from "react-toastify"

interface cartItem extends Product {
  cartQuantity: number
}

export interface ProductsType {
  cartItems: cartItem[]
  cartTotalAmount: number
  cartTotalQuantity: number
}

const initialState: ProductsType = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems") ?? "")
    : [],
  cartTotalAmount: 0,
  cartTotalQuantity: 0,
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      // we check if we already have the item we wanna add

      const itemIndex = state.cartItems.findIndex(
        (cartItem) => cartItem.id === payload.id
      )

      /**
       * If the item exists we just increase the quantity by => 1
       * If the item does not exist we just add it
       */

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1
        toast.info(
          "Increasing " + state.cartItems[itemIndex].name + " Product Quantity",
          {
            position: "bottom-left",
          }
        )
      } else {
        const productTemplate = {
          ...payload,
          cartQuantity: 1,
        }
        state.cartItems.push(productTemplate)
        toast.success(
          "Adding a new Product " + productTemplate.name + " to Cart",
          {
            position: "bottom-left",
          }
        )
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
    },
    removeCart: (state, { payload }) => {
      const newCartItems = state.cartItems.filter(
        (item) => item.id !== payload.id
      )
      state.cartItems = newCartItems
      localStorage.setItem("cartItems", JSON.stringify(newCartItems))
    },
    clearCart: (state, { payload }) => {
      state.cartItems = []
      localStorage.clear()
    },
    increaseCartQuantity: (state, { payload }) => {
      const currentCartIndex = state.cartItems.findIndex(
        (cart) => cart.id === payload.id
      )
      const newCartItems = state.cartItems.map((item) => {
        if (item === state.cartItems[currentCartIndex]) {
          return {
            ...state.cartItems[currentCartIndex],
            cartQuantity: state.cartItems[currentCartIndex].cartQuantity + 1,
          }
        }
        return item
      })
      state.cartItems = newCartItems
      localStorage.setItem("cartItems", JSON.stringify(newCartItems))
    },
    decreaseCartQuantity: (state, { payload }) => {
      const currentCartIndex = state.cartItems.findIndex(
        (cart) => cart.id === payload.id
      )
      const newCartItems = state.cartItems.map((item) => {
        if (item === state.cartItems[currentCartIndex]) {
          return {
            ...state.cartItems[currentCartIndex],
            cartQuantity: state.cartItems[currentCartIndex].cartQuantity - 1,
          }
        }
        return item
      })
      state.cartItems = newCartItems
      localStorage.setItem("cartItems", JSON.stringify(newCartItems))
    },
    getTotal(state, { payload }) {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem
          const itemTotal = price * cartQuantity

          cartTotal.total += itemTotal
          cartTotal.quantity += cartQuantity

          return cartTotal
        },
        {
          total: 0,
          quantity: 0,
        }
      )
      total = parseFloat(total.toFixed(2))
      state.cartTotalQuantity = quantity
      state.cartTotalAmount = total
    },
  },
})

export const {
  addToCart,
  removeCart,
  clearCart,
  increaseCartQuantity,
  decreaseCartQuantity,
  getTotal,
} = cartSlice.actions

export default cartSlice.reducer
