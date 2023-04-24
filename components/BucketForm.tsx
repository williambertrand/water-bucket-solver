import React, { FC, useCallback, useState } from 'react'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { SolutionParams } from '../interfaces';


export const BucketForm = ({
  onSubmit
}) => {

  const [bucketState, setBucketState] =  useState<SolutionParams>({ a: 3, b: 5, c: 4 })

  const updateBucketState = (params: Partial<SolutionParams>) => {
    setBucketState({
      ...bucketState,
      ...params
    })
  }

  return (
    <Container>
      <h4>Bucket Params</h4>
      <Row>
        <Col sm={6} md={4}>
        <Form.Group className="mb-3" controlId="bucketA">
          <Form.Label>Bucket A Size</Form.Label>
          <Form.Control
            type="number"
            placeholder="Param A" 
            value={bucketState.a.toString()}
            onChange={(v) => updateBucketState({ a: Number(v.target.value) })}
          />
        </Form.Group>
        </Col>
        <Col sm={6} md={4}>
        <Form.Group className="mb-3" controlId="bucketA">
          <Form.Label>Bucket B Size</Form.Label>
          <Form.Control
            type="number"
            placeholder="Param B" 
            value={bucketState.b.toString()}
            onChange={(v) => updateBucketState({ b: Number(v.target.value) })}
          />
        </Form.Group>
        </Col>
        <Col sm={6} md={4}>
        <Form.Group className="mb-3" controlId="bucketA">
          <Form.Label>Bucket C Size</Form.Label>
          <Form.Control
            type="number"
            placeholder="Param C" 
            value={bucketState.c.toString()}
            onChange={(v) => updateBucketState({ c: Number(v.target.value) })}
          />
        </Form.Group>
        </Col>
      </Row>
      <Button variant="primary" type="submit" onClick={() => onSubmit(bucketState)}>
        Submit
      </Button>
    </Container>
  )
}