import { createSolution, validateParams } from "../_solution.service"

describe('_solutionService', () => {
  describe('validateParams', () => {
    test('returns true for valid params', () => {
      const res = validateParams({
        a: 3,
        b: 5,
        c: 4
      })
      expect(res.valid).toEqual(true)
    })
    test('includes message for invalid params', () => {
      const res = validateParams({
        a: 2,
        b: 8,
        c: 7
      })
      expect(res.valid).toEqual(false)
      expect(res.message).toEqual('C Bucket cannot be odd if the other two buckets are even.')
    })
  })

  describe('createSolution', () => {
    test('Builds and returns optimal solution', () => {
      const res = createSolution({
        a: 3,
        b: 5,
        c: 4
      })
      expect(res.steps[res.steps.length - 1].type === 'COMPLETE')
      // Optimal solution has 6 steps, sub-optimal has 8
      expect(res.steps.filter(s => s.type !=='COMPLETE')).toHaveLength(6)
    })
  })
})