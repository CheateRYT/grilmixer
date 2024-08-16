import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CartItem {
	productId: number
	name: string
	price: string
	extraIngredients: string
	quantity: number
}

interface CartState {
	items: {
		[shopId: string]: CartItem[]
	}
}

const loadCartState = (): CartState => {
	const savedCart = localStorage.getItem('cart')
	return savedCart ? JSON.parse(savedCart) : { items: {} }
}
interface AddToCartPayload {
	productId: number
	shopId: string // Добавляем shopId
	quantity: number
	name: string
	price: string
	extraIngredients: string
}
const initialState: CartState = loadCartState()
const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart(state, action: PayloadAction<AddToCartPayload>) {
			const { shopId, productId, quantity, name, price, extraIngredients } =
				action.payload

			if (!state.items[shopId]) {
				state.items[shopId] = [] // Инициализируем массив для нового shopId
			}

			const existingItem = state.items[shopId].find(
				item =>
					item.productId === productId &&
					item.extraIngredients === extraIngredients
			)

			if (existingItem) {
				existingItem.quantity += quantity // Увеличиваем количество
			} else {
				state.items[shopId].push({
					productId,
					quantity,
					name,
					price,
					extraIngredients,
				}) // Добавляем новый товар
			}

			saveCartState(state) // Сохраняем состояние в localStorage
		},
		removeFromCart(
			state,
			action: PayloadAction<{ shopId: string; productId: number }>
		) {
			const { shopId, productId } = action.payload
			if (state.items[shopId]) {
				state.items[shopId] = state.items[shopId].filter(
					item => item.productId !== productId
				)
				saveCartState(state)
			}
		},
		plusValue(
			state,
			action: PayloadAction<{
				shopId: string
				productId: number
				index: number
			}>
		) {
			const { shopId, index } = action.payload
			const existingItem = state.items[shopId]?.[index]
			if (existingItem) {
				++existingItem.quantity
			}
			saveCartState(state)
		},
		minusValue(
			state,
			action: PayloadAction<{
				shopId: string
				productId: number
				index: number
			}>
		) {
			const { shopId, index } = action.payload
			const existingItem = state.items[shopId]?.[index]
			if (existingItem) {
				if (existingItem.quantity > 1) {
					--existingItem.quantity
				} else {
					// Удаляем товар, если его количество становится 0
					state.items[shopId].splice(index, 1)
				}
			}
			saveCartState(state)
		},
		clearCart(state, action: PayloadAction<string>) {
			const shopId = action.payload
			state.items[shopId] = [] // Очищаем корзину для конкретного магазина
			saveCartState(state)
		},
	},
})

// Функция для сохранения состояния корзины в localStorage
const saveCartState = (state: CartState) => {
	localStorage.setItem('cart', JSON.stringify(state))
}

export const { addToCart, removeFromCart, plusValue, minusValue, clearCart } =
	cartSlice.actions

const store = configureStore({
	reducer: {
		cart: cartSlice.reducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
