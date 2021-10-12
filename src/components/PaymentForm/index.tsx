import { Session } from 'next-auth'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { StripeCardElementChangeEvent } from '@stripe/stripe-js'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { ShoppingCart, ErrorOutline } from 'styled-icons/material-outlined'

import Button from 'components/Button'
import Heading from 'components/Heading'
import { FormLoading } from 'components/Form'

import { useCart } from 'hooks/use-cart'
import { createPaymentIntent } from 'utils/stripe/methods'

import * as S from './styles'

type PaymentFormProps = {
  session: Session
}

const PaymentForm = ({ session }: PaymentFormProps) => {
  const { items } = useCart()
  const { push } = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const [clientSecret, setClientSecret] = useState('')
  const [freeGames, setFreeGames] = useState(false)
  const stripe = useStripe()
  const elements = useElements()

  useEffect(() => {
    async function setPaymentMode() {
      if (items.length) {
        // bater na API /orders/create-payment-intent
        //enviar os items do carrinho
        const data = await createPaymentIntent({
          items,
          token: session.jwt as string
        })

        //se receber freeGames: true => setFreeGames
        //faz o fluxo de jogo gratuito
        if (data.freeGames) {
          setFreeGames(true)
          return
        }

        //se receber um erro => setError
        if (data.error) {
          setError(data.eror)
        } else {
          //senão o payment foi valido => setClientSecret
          setFreeGames(false)
          setClientSecret(data.client_secret)
        }
      }
    }

    setPaymentMode()
  }, [items, session])

  const handleChange = async (event: StripeCardElementChangeEvent) => {
    setDisabled(event.empty)
    setError(event.error ? event.error.message : '')
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)

    //se for freeGames salva no banco e redireciona para o success
    if (freeGames) {
      push('/success')
      return
    }

    const payload = await stripe!.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements!.getElement(CardElement)!
      }
    })

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`)
      setLoading(false)
    } else {
      setError(null)
      setLoading(false)

      //salvar a compra no banco do Strapi e redirecionarr para página de Sucesso
      push('/success')
    }
  }

  return (
    <S.Wrapper>
      <form onSubmit={handleSubmit}>
        <S.Body>
          <Heading color="black" size="small" lineBottom>
            Payment
          </Heading>

          {freeGames ? (
            <S.FreeGames>Only free games, click buy and enjoy!</S.FreeGames>
          ) : (
            <CardElement
              options={{
                hidePostalCode: true,
                style: {
                  base: {
                    fontSize: '16px'
                  }
                }
              }}
              onChange={handleChange}
            />
          )}

          {error && (
            <S.Error>
              <ErrorOutline size={20} />
              {error}
            </S.Error>
          )}
        </S.Body>
        <S.Footer>
          <Button as="a" fullWidth minimal>
            Continue shopping
          </Button>
          <Button
            fullWidth
            icon={loading ? <FormLoading /> : <ShoppingCart />}
            disabled={!freeGames && (disabled || !!error)}
          >
            {!loading && <span>Buy now</span>}
          </Button>
        </S.Footer>
      </form>
    </S.Wrapper>
  )
}

export default PaymentForm
