import { Solution, SolutionParams, Step } from "../../../interfaces";


const isEven = (x: number) => x % 2 === 0

export const validateParams = (params: SolutionParams): { valid: boolean, message?: string} => {
  const { a, b, c } = params;
  
  if (a === c || b === c) return { valid: true }

  if (c > a && c > b) {
    return { valid: false, message: 'C Bucket cannot be larger than the other two buckets.'}
  }
  if (isEven(a) && isEven(b) && !isEven(c)) {
    return { valid: false, message: 'C Bucket cannot be odd if the other two buckets are even.'}
  }
  return { valid: true }
}

const getStepsForBigToSmall = (params: SolutionParams): Step[]  => {
  const { a, b, c } = params
  const steps = []

  // Pattern 1 
  // Fill Big when empty
  // Dump small when full
  // keep transferring till bigBucket has target units of water 

  const bigBucketSize = Math.max(a, b)
  const smallBucketSize = Math.min(a, b)
  const bigBucket = a > b ? 'a' : 'b'
  const smallBucket = a > b ? 'b' : 'a'

  // Represents the current amount in the big bucket
  let bigVal = 0;
  let smallVal = 0;

  while(bigVal !== c) {

    if(bigVal == 0 ) {
      bigVal = bigBucketSize
      steps.push({ type: 'FILL', display: `Fill bucket ${bigBucket}`, state: {[bigBucket]: bigVal, [smallBucket]: smallVal }})
    }

    // Transfer as much of what is currently in the big bucket as possible
    const transferAmount = Math.min(smallBucketSize - smallVal, bigVal)
    
    bigVal -= transferAmount
    smallVal += transferAmount

    steps.push({ type: 'TRANSFER', target: bigBucket, display: `Transfer from ${bigBucket} to ${smallBucket}`, state: {[bigBucket]: bigVal, [smallBucket]: smallVal }})

    if(smallVal == smallBucketSize && bigVal !== c) {
      smallVal = 0
      steps.push({ type: 'EMPTY', target: smallBucket, display: `Empty ${smallBucket}`, state: {[bigBucket]: bigVal, [smallBucket]: smallVal }})
    }
  }

  steps.push({ type: 'COMPLETE', display: `Complete! You now have ${c} units of water in bucket ${bigBucket}`, state: {[bigBucket]: bigVal, [smallBucket]: smallVal, c } })

  return steps
}

const getStepsForSmallToBig = (params: SolutionParams): Step[]  => {
  const { a, b, c } = params
  const steps = []
  
  // Pattern 2
  // Fill Small when empty
  // Dump big when full
  // keep transferring small to big until big bucket has target units of water 

  const bigBucketSize = Math.max(a, b)
  const smallBucketSize = Math.min(a, b)
  const bigBucket = a > b ? 'a' : 'b'
  const smallBucket = a > b ? 'b' : 'a'

  // Represents the current amount in the big bucket
  let bigVal = 0;
  let smallVal = 0;

  while(bigVal !== c) {
    if(smallVal == 0 ) {
      smallVal = smallBucketSize
      steps.push({ type: 'FILL', display: `Fill bucket ${smallBucket}`, state: {[bigBucket]: bigVal, [smallBucket]: smallVal }})
    }

    // Transfer as much of small -> big that the big bucket can still hold
    const transferAmount = Math.min(smallVal, bigBucketSize - bigVal)
    bigVal += transferAmount
    smallVal -= transferAmount

    steps.push({ type: 'TRANSFER', target: smallBucket, display: `Transfer from ${smallBucket} to ${bigBucket}`, state: {[bigBucket]: bigVal, [smallBucket]: smallVal }}, )

    if(bigVal === bigBucketSize) {
      bigVal = 0
      steps.push({ type: 'EMPTY', target: bigBucket, display: `Empty ${bigBucket}`, state: {[bigBucket]: bigVal, [smallBucket]: smallVal }})
    }
  }

  steps.push({ type: 'COMPLETE', display: `Complete! You now have ${c} units of water in bucket ${bigBucket}`, state: {[bigBucket]: bigVal, [smallBucket]: smallVal, c } })

  return steps
}

export const createSolution = (params: SolutionParams): Solution  => {

  const { a, b, c } = params
  const steps = []

  // Quickly check for some easy solutions before trying the two patterns
  if (a === c || b === c) {
    let bucket = a === c ? 'a' : 'b'
    steps.push({ type: 'FILL', display: `Fill bucket ${bucket}` })
    steps.push({ display: `Complete! You now have ${c} units of water in bucket ${bucket}`, type: 'COMPLETE' })
    return { steps }
  }

  const bigToSmallSteps = getStepsForBigToSmall(params)
  const smallToBigSteps = getStepsForSmallToBig(params)

  const optimalSteps = bigToSmallSteps.length < smallToBigSteps.length ? bigToSmallSteps : smallToBigSteps

  return {
    steps: optimalSteps
  }
}