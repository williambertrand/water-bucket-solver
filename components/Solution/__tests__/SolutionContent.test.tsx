import React from 'react'
import {render, screen} from '@testing-library/react'
import SolutionContent from '../SolutionContent'
import { Solution } from '../../../interfaces'


const solution: Solution = { 
  steps: [
    { display: 'Step 1, fill large bucket', type: 'FILL'},
    { display: 'Step 2, trasnfer to small bucket', type: 'EMPTY'},
    { display: 'Step 3, repeat...', type: 'COMPLETE'},
  ]
}

describe('SolutionContent', () => {
  test('Renders empty if no solution provided', () => {
    render(<SolutionContent solution={undefined} />)
    expect(screen.queryByText('Solution')).toBeNull()
  })

  test('Renders solution with steps', () => {
    render(<SolutionContent solution={solution} />)
    solution.steps.forEach(s => {
      expect(screen.getByText(s.display)).toBeDefined()
    })
  })
})