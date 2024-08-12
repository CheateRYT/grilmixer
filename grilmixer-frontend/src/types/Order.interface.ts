export interface Order {
	id: number
	shopId: number
	amount: string
	phoneNumber: string
	deliveryAddress: string
	email: string
	clientName: string
	createdTime: string
	completedTime: string | null
	type: string
	paymentType: string
	personCount: number
	status: string
	changeFrom: string
	productsCount: string
	products: { id: number; name: string }[]
	extraIngredientsOrder: {
		productId: number
		productCount: number
		extraIngredients: string
	}[]
}
