import { render, screen, waitFor } from 'utils/test-utils'
import userEvent from '@testing-library/user-event'

import PaymentOptions from '.'
import cards from './mock'

describe('<PaymentOptions />', () => {
  it('should render the saved card options and the add new card button', () => {
    render(<PaymentOptions cards={cards} handlePayment={jest.fn} />)

    expect(screen.getByLabelText(/4325/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/4326/i)).toBeInTheDocument()
    expect(screen.getByText(/add a new credit card/i)).toBeInTheDocument()
  })

  it('should handle select card when clicking on the label', async () => {
    render(<PaymentOptions cards={cards} handlePayment={jest.fn} />)

    userEvent.click(screen.getByLabelText(/4325/i))

    await waitFor(() => {
      expect(screen.getByRole('radio', { name: /4325/i })).toBeChecked()
    })
  })

  it('should not call handlePayment when button is disabled', () => {
    const handlePayment = jest.fn()

    render(<PaymentOptions cards={cards} handlePayment={handlePayment} />)

    userEvent.click(screen.getByRole('button', { name: /buy now/i }))

    expect(handlePayment).not.toHaveBeenCalled()
  })

  it('should call handlePayment when credit card is selected', async () => {
    const handlePayment = jest.fn()

    render(<PaymentOptions cards={cards} handlePayment={handlePayment} />)

    userEvent.click(screen.getByLabelText(/4325/i))
    userEvent.click(screen.getByRole('button', { name: /buy now/i }))

    await waitFor(() => {
      expect(handlePayment).toHaveBeenCalled()
    })
  })
})