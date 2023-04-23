import React, { FC } from 'react'
import { Solution } from '../../interfaces'

interface SolutionProps {
  solution?: Solution
}

const SolutionContent: FC<SolutionProps> = ({
  solution
}) => {

  if(!solution) return <></>
  
  return (
    <div>
      <h4>Solution</h4>
      {/* Subtract one for our "Complete" step */}
      <p>{solution.steps.length - 1} steps</p>
      {
        solution.steps.map((step, idx) => {

          return (
            <li key={`step-${idx}`}>
              <span>{step.display}</span>
            </li>
          )
        })
      }
    </div>
  )

}

export default SolutionContent