import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
// import { products } from "../data/products"
import axios from "axios"
import { toast } from "react-toastify"

export const productsFetch = createAsyncThunk(
  "products/productsFetch",
  async () => {
    const response = await axios.get(
      `https://shopping-cart-backend-dev.herokuapp.com/products`
    )
    return response?.data
  }
)

export type Product = {
  id: number
  name: string
  desc: string
  price: number
  img: string
}

export interface ProductsType {
  products: Product[]
  status: null | string
}

const initialState: ProductsType = {
  products: [],
  status: null,
}

export const productsSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(productsFetch.pending, (state, { payload }) => {
      state.status = "pending"
    })
    builder.addCase(productsFetch.fulfilled, (state, { payload }) => {
      state.status = "success"
      state.products = payload
    })
    builder.addCase(productsFetch.rejected, (state, { payload }) => {
      state.status = "rejected"
      toast.error('Promise Rejected')
    })
  },
})

// export const {} = productsSlice.actions

export default productsSlice.reducer
