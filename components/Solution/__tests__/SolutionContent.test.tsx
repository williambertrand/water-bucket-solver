import React from 'react'
import {render, screen} from '@testing-library/react'
import SolutionContent from '../SolutionTable'
import { Solution } from '../../../interfaces'


const solution: Solution = { 
  steps: [
    { display: 'Step 1, fill large bucket', type: 'FILL', state: {a: 0, b: 6 }},
    { display: 'Step 2, trasnfer to small bucket', type: 'EMPTY', state: {a: 0, b: 2 } },
    { display: 'Step 3, repeat...', type: 'COMPLETE', state: {a: 0, b: 5, c: 5}},
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