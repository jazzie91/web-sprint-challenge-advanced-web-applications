import React from 'react'
import { render, screen } from '@testing-library/react'
import Spinner from './Spinner'


test('sanity', () => {
  expect(true).toBe(true)
})

test('Spinner renders correctly when spinnerOn is true', () => {
  render(<Spinner spinnerOn={true} />)
  const spinner = screen.getByTestId('spinner')
  expect(spinner).toBeInTheDocument()
  expect(spinner).toHaveTextContent('Please wait...')
})

test('Spinner does not render when spinnerOn is false', () => {
  render(<Spinner spinnerOn={false} />)
  const spinner = screen.queryByTestId('spinner')
  expect(spinner).toBeNull() 
})

test('Spinner does not render when spinnerOn prop is not provided', () => {
  render(<Spinner />)
  const spinner = screen.queryByTestId('spinner')
  expect(spinner).toBeNull()
})