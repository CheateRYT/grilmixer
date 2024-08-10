// store.ts
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CartItem {
	productId: number
	quantity: number
}

interface CartState {
	items: CartItem[]
}

const initialState: CartState = {
	items: [],
}

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart(state, action: PayloadAction<CartItem>) {
			const existingItem = state.items.find(
				item => item.productId === action.payload.productId
			)
			if (existingItem) {
				existingItem.quantity += action.payload.quantity
			} else {
				state.items.push(action.payload)
			}
		},
		removeFromCart(state, action: PayloadAction<number>) {
			state.items = state.items.filter(
				item => item.productId !== action.payload
			)
		},
		updateQuantity(
			state,
			action: PayloadAction<{ productId: number; quantity: number }>
		) {
			const existingItem = state.items.find(
				item => item.productId === action.payload.productId
			)
			if (existingItem) {
				existingItem.quantity = action.payload.quantity
			}
		},
	},
})

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions

const store = configureStore({
	reducer: {
		cart: cartSlice.reducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
