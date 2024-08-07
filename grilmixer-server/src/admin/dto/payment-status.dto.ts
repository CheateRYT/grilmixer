class ObjectPayment {
	id: string
	status: string
	amount: { value: string; currency: string }
	description: string
	metadata: { order_id: string }
	recipient: { account_id: string; gateway_id: string }
	payment_method: {
		type: string
		id: number
		saved: boolean
		title: string
	}
	created_at: string
	expires_at: string
}

export class PaymentStatusDto {
	event: string
	type: string
	object: ObjectPayment
}
