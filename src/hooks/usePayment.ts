import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'

function usePaymentForm() {
  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async () => {
    const cardElement = elements?.getElement(CardElement)

    if (!stripe || !elements || !cardElement) {
      return
    }

    const stripeResponse = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    })

    const { error, paymentMethod } = stripeResponse

    if (error || !paymentMethod) {
      return
    }

    const paymentMethodId = paymentMethod.id

    return paymentMethodId
  }

  return {
    handleSubmit,
  }
}

export default usePaymentForm
