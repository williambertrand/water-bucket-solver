import React, { FC } from 'react'
import { Solution } from '../../interfaces'

import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'
import SolutionStep from './SolutionStep'


interface SolutionProps {
  solution?: Solution
}

const SolutionContent: FC<SolutionProps> = ({
  solution
}) => {

  if (!solution) return <></>

  return (
    <Container>
      <h4>Solution</h4>
      {/* Subtract one for our "Complete" step */}
      <p>This bucket problem can be solved in {solution.steps.length - 1} steps</p>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Step</th>
            <th>Bucket A</th>
            <th>Bucket B</th>
            <th>C</th>
          </tr>
        </thead>
        <tbody>
          {
            solution.steps.map((step, idx) => {

              return (
                <SolutionStep step={step} key={idx} />
              )
            })
          }
        </tbody>
      </Table>
    </Container>
  )

}

export default SolutionContent