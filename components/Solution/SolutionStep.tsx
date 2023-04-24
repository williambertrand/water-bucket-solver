import React, { FC } from "react"

import { Step } from "../../interfaces"

const SolutionStep: FC<{ step: Step }> = ({ step }) => {
  return (
    <tr>
      <td>{step.display}</td>
      <td>{step.state?.a}</td>
      <td>{step.state?.b}</td>
      <td>{step.type === 'COMPLETE' ? step.state.c : '--'}</td>
    </tr>
  )
}


export default SolutionStep