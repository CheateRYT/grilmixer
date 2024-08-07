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
	status: string
	productsCount: string
	products: { id: number; name: string }[]
}
