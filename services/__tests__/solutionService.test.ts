import { createSolution, validateParams } from "../solutionService"

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
      expect(res.message).toEqual('Bucket C cannot be odd if the other two buckets are even.')
    })
    test('includes message for unsolvable params', () => {
      const res = validateParams({
        a: 3,
        b: 6,
        c: 2
      })
      expect(res.valid).toEqual(false)
      expect(res.message).toEqual('Bucket C cannot be solved for with those parameters.')
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