import { Solution, SolutionParams, Step } from "../interfaces";


const isEven = (x: number) => x % 2 === 0

export const validateParams = (params: SolutionParams): { valid: boolean, message?: string} => {
  const { a, b, c } = params;
  
  if (a === c || b === c) return { valid: true }

  if (c > a && c > b) {
    return { valid: false, message: 'Bucket C cannot be larger than the other two buckets.'}
  }
  if (isEven(a) && isEven(b) && !isEven(c)) {
    return { valid: false, message: 'Bucket C cannot be odd if the other two buckets are even.'}
  }

  // If a or b are 1 and the other bucket is larger than C, this can be solved
  if((a === 1 && b > c ) || (b === 1 && a > c)) {
    return { valid: true }
  }

  if(Math.abs( a - b) % c !== 0 && c % Math.abs( a - b) !== 0 && a !== 1 && b !== 1) {
    return { valid: false, message: 'Bucket C cannot be solved for with those parameters.'}
  }
  return { valid: true }
}

const initsBuckets = ({ a, b }) => {
  return {
    bigBucketSize: Math.max(a, b),
    smallBucketSize: Math.min(a, b),
    bigBucket: a > b ? 'A' : 'B',
    smallBucket: a > b ? 'B' : 'A'
  }
}

/**
 * Pattern 1: Big to Small
 * Fill Big when empty
 * Dump small when full
 * keep transferring till bigBucket has target units of water 
*/
const getStepsForBigToSmall = (params: SolutionParams): Step[]  => {
  const { a, b, c } = params
  const steps = []

  const { 
    bigBucketSize,
    smallBucketSize,
    bigBucket,
    smallBucket
  } = initsBuckets({ a, b })

  // Represents the current amount in each bucket
  let bigVal = 0;
  let smallVal = 0;

  while(bigVal !== c) {

    if(bigVal == 0 ) {
      bigVal = bigBucketSize
      steps.push({ type: 'FILL', display: `Fill Bucket ${bigBucket}`, state: {[bigBucket]: bigVal, [smallBucket]: smallVal }})
    }

    // Transfer as much of what is currently in the big bucket as possible
    const transferAmount = Math.min(smallBucketSize - smallVal, bigVal)
    
    bigVal -= transferAmount
    smallVal += transferAmount

    steps.push({ type: 'TRANSFER', target: bigBucket, display: `Transfer from Bucket ${bigBucket} to Bucket ${smallBucket}`, state: {[bigBucket]: bigVal, [smallBucket]: smallVal }})

    if(smallVal == smallBucketSize && bigVal !== c) {
      smallVal = 0
      steps.push({ type: 'EMPTY', target: smallBucket, display: `Empty Bucket ${smallBucket}`, state: {[bigBucket]: bigVal, [smallBucket]: smallVal }})
    }
  }

  steps.push({ type: 'COMPLETE', display: `Complete! You now have ${c} units of water in Bucket ${bigBucket}`, state: {[bigBucket]: bigVal, [smallBucket]: smallVal, c } })

  return steps
}


/**
 * Pattern 2: Small to Big
 * Fill Small when empty
 * Dump big when full
 * keep transferring small to big until big bucket has target units of water 
 */
const getStepsForSmallToBig = (params: SolutionParams): Step[]  => {
  const { a, b, c } = params
  const steps = []

  const { 
    bigBucketSize,
    smallBucketSize,
    bigBucket,
    smallBucket
  } = initsBuckets({ a, b })

  // Represents the current amount in each bucket
  let bigVal = 0;
  let smallVal = 0;

  while(bigVal !== c) {
    if(smallVal == 0 ) {
      smallVal = smallBucketSize
      steps.push({ type: 'FILL', display: `Fill Bucket ${smallBucket}`, state: {[bigBucket]: bigVal, [smallBucket]: smallVal }})
    }

    // Transfer as much of small -> big that the big bucket can still hold
    const transferAmount = Math.min(smallVal, bigBucketSize - bigVal)
    bigVal += transferAmount
    smallVal -= transferAmount

    steps.push({ type: 'TRANSFER', target: smallBucket, display: `Transfer from Bucket ${smallBucket} to Bucket ${bigBucket}`, state: {[bigBucket]: bigVal, [smallBucket]: smallVal }}, )

    if(bigVal === bigBucketSize) {
      bigVal = 0
      steps.push({ type: 'EMPTY', target: bigBucket, display: `Empty Bucket ${bigBucket}`, state: {[bigBucket]: bigVal, [smallBucket]: smallVal }})
    }
  }

  steps.push({ type: 'COMPLETE', display: `Complete! You now have ${c} units of water in Bucket ${bigBucket}`, state: {[bigBucket]: bigVal, [smallBucket]: smallVal, c } })

  return steps
}

export const createSolution = (params: SolutionParams): Solution  => {

  const { a, b, c } = params
  const steps = []

  // Quickly check for some easy solutions before trying the two patterns
  if (a === c || b === c) {
    let bucket = a === c ? 'A' : 'B'
    steps.push({ type: 'FILL', display: `Fill Bucket ${bucket}` })
    steps.push({ display: `Complete! You now have ${c} units of water in Bucket ${bucket}`, type: 'COMPLETE' })
    return { steps, params }
  }

  const bigToSmallSteps = getStepsForBigToSmall(params)
  const smallToBigSteps = getStepsForSmallToBig(params)

  const optimalSteps = bigToSmallSteps.length < smallToBigSteps.length ? bigToSmallSteps : smallToBigSteps

  return {
    steps: optimalSteps,
    params
  }
}