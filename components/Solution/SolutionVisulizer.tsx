import React, { FC, useEffect, useRef, useState } from 'react'
import { Solution } from '../../interfaces'

import Container from 'react-bootstrap/Container'
import { SolutionProps } from './SolutionTable'
import { Button } from 'react-bootstrap'

import { motion } from "framer-motion"
import { BucketVisual } from './BucketVisual'


/**
 * Helper hook for accessing an interval within useEffect
 * We need to use a Ref as the useEffect 
 * @param callback function to call at ech tick
 * @param delay : ms to delay between each call
 */
function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}


const SolutionVisualizer: FC<SolutionProps> = ({
  solution
}) => {

  // TODO: If time permits, allow user to speed up visualization
  const MS_PER_STEP = 2000 

  const [tick, setTick] = useState(0);

  useInterval(() => {
    // Your custom logic here
    if (tick < solution.steps.length - 1) setTick(tick + 1);
  }, MS_PER_STEP);



  const onReStart = () => {
    setTick(0)
  }

  const currentStep = solution.steps[tick]

  return (
    <Container>
      <h4>Solution Visualization</h4>
      <p>Step: {currentStep.display}</p>
      
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
        <BucketVisual name="Bucket A" fill={currentStep.state.a} total={solution.params.a} />
        <BucketVisual name="Bucket B" fill={currentStep.state.b} total={solution.params.b} />
      </div>

      <Button variant="secondary" onClick={onReStart}>Re-Start</Button>
      
    </Container>
  )

}

export default SolutionVisualizer