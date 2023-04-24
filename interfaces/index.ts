export interface APIObject<T> {
  id: string
  type: string
  attributes: T
} 

export interface ErrorApiObject {
  message: string
}

export type Step = {
  display: string
  state: {
    a: number,
    b: number,
    c?: number
  }
  type: 'FILL' | 'TRANSFER' | 'EMPTY' | 'COMPLETE'
}

export interface Solution {
  steps: Step[]
  params: SolutionParams
}

export interface SolutionParams {
  a: number
  b: number
  c: number
}

export type SolutionApiObject = APIObject<Solution>