import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { BucketForm } from '../BucketForm'

describe("BucketForm", () => {

  const onSubmit = jest.fn()

  test('renders prams', () => {
    render(<BucketForm onSubmit={onSubmit} />)
    expect(screen.getByText('Bucket Params')).toBeDefined()
    expect(screen.getAllByRole('input')).toHaveLength(3)
    expect(screen.getByText('Bucket A Size')).toBeDefined()
    expect(screen.getByText('Bucket B Size')).toBeDefined()
    expect(screen.getByText('Desired Amount (C)')).toBeDefined()
  })

  test('calls onSubmit on pressing submit', () => {
    render(<BucketForm onSubmit={onSubmit} />)
    fireEvent.click(screen.getByText('Submit'))
    expect(onSubmit).toHaveBeenCalledWith({a: 3, b: 5, c: 4})
  })
})