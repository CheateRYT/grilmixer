import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CartItem {
	productId: number
	name: string
	price: string
	extraIngredients: string
	quantity: number
}

interface CartState {
	items: CartItem[]
}

const loadCartState = (): CartState => {
	const savedCart = localStorage.getItem('cart')
	return savedCart ? JSON.parse(savedCart) : { items: [] }
}

const initialState: CartState = loadCartState()

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart(state, action: PayloadAction<CartItem>) {
			const existingItem = state.items.find(
				item =>
					item.productId === action.payload.productId &&
					item.extraIngredients === action.payload.extraIngredients
			)
			if (existingItem) {
				existingItem.quantity += action.payload.quantity // Увеличиваем количество
			} else {
				state.items.push(action.payload) // Добавляем новый товар
			}
			saveCartState(state) // Сохраняем состояние в localStorage
		},
		removeFromCart(state, action: PayloadAction<number>) {
			state.items = state.items.filter(
				item => item.productId !== action.payload
			)
			saveCartState(state) // Сохраняем состояние в localStorage
		},
		plusValue(
			state,
			action: PayloadAction<{ productId: number; index: number }>
		) {
			const existingItem = state.items[action.payload.index]
			if (existingItem) {
				++existingItem.quantity
			}
			saveCartState(state)
		},
		minusValue(
			state,
			action: PayloadAction<{ productId: number; index: number }>
		) {
			const existingItem = state.items[action.payload.index]
			if (existingItem) {
				if (existingItem.quantity > 1) {
					--existingItem.quantity
				} else {
					// Удаляем товар, если его количество становится 0
					state.items.splice(action.payload.index, 1)
				}
			}
			saveCartState(state)
		},
	},
})

// Функция для сохранения состояния корзины в localStorage
const saveCartState = (state: CartState) => {
	localStorage.setItem('cart', JSON.stringify(state))
}

export const { addToCart, removeFromCart, plusValue, minusValue } =
	cartSlice.actions

const store = configureStore({
	reducer: {
		cart: cartSlice.reducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
