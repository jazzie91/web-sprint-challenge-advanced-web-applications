import React from 'react'
import { render, screen } from '@testing-library/react'
import Spinner from './Spinner'


test('sanity', () => {
  expect(true).toBe(true)
})

Spinner.defaultProps = {
  on: false, 
};

test('Spinner renders correctly when on is true', () => {
  render(<Spinner on={true} />)
  const spinner = screen.getByTestId('spinner')
  expect(spinner).toBeInTheDocument()
  expect(spinner).toHaveTextContent('Please wait...')
})

test('Spinner does not render when on prop is false', () => {
  render(<Spinner on={false} />)  
  const spinner = screen.queryByTestId('spinner')
  expect(spinner).toBeNull()
})

test('Spinner does not render when on prop is not provided', () => {
  render(<Spinner />)
  const spinner = screen.queryByTestId('spinner')
  expect(spinner).toBeNull()
})

