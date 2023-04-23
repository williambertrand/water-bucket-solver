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
  type: 'FILL' | 'TRANSFER' | 'EMPTY' | 'COMPLETE'
}

export interface Solution {
  steps: Step[]
}

export interface SolutionParams {
  a: number
  b: number
  c: number
}

export type SolutionApiObject = APIObject<Solution>