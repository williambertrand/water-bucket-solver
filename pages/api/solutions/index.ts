import type { NextApiRequest, NextApiResponse } from 'next'
import { ErrorApiObject, SolutionApiObject } from '../../../interfaces'
import { createSolution, validateParams } from '../../../services/solutionService'

export default function solutionHandler(
  req: NextApiRequest,
  res: NextApiResponse<SolutionApiObject | ErrorApiObject>
) {
  const { body, method } = req

  switch (method) {
    case 'POST':
      const { valid, message } = validateParams(body)
      if (!valid) {
        return res.status(400).json({ message })
      }
      const solution = createSolution(body)
      return res.status(200).json({ type: 'solution', id: 'solution-id', attributes: { ...solution }})
    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
