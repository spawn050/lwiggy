import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    count: 0,
  },
  reducers: {
    addToCart(state, action) {
      const existing = state.items.find((i) => i.id === action.payload.id)
      if (existing) {
        existing.quantity += 1
      } else {
        state.items.push({ ...action.payload, quantity: 1 })
      }
      state.count += 1
    },
    removeFromCart(state, action) {
      const existing = state.items.find((i) => i.id === action.payload)
      if (!existing) {
        return
      }
      if (existing.quantity === 1) {
        state.items = state.items.filter((i) => i.id !== action.payload)
      } else {
        existing.quantity -= 1
      }
      state.count -= 1
    },
    clearCart(state) {
      state.items = []
      state.count = 0
    },
  },
})

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions
export default cartSlice.reducer