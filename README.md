# Water Bucket Problem Solver

Nextjs frontend with an api endpoint for solving the classic water bucket problem

View it live: https://water-bucket-solver.vercel.app

--- 

## Getting started
- Run `yarn install`
- Run `yarn dev` to run dev mode
- Open `localhost:3000` to see the running pp

## Dependencies:
- Bootstrap: UI library

## Dev dependencies
- Jest
- Babel: For transpilling TS to JS for jest


## API Endpoints
Next.js ships with [API routes](https://github.com/vercel/next.js#api-routes), which provide an easy solution to build out an api

### POST `/api/solutions`

RequestBody:
```
{
 a: 3,
 b: 5,
 c: 4,
}
```

Succesfull Response in ([JSON:API Spec](https://jsonapi.org/)): 
```
{ 
  type: 'solution',
  attributes: {
    steps: [ ... list of steps for solution]
  }
}

```


### TODOS:
- add mocked fetch test: 
  - https://testing-library.com/docs/react-testing-library/example-intro