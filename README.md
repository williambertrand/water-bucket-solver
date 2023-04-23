### Water Bucket Problem Solver
- Nextjs frontend with an api endpoint for solving the classic water bucket problem


# API routes with REST

Next.js ships with [API routes](https://github.com/vercel/next.js#api-routes), which provide an easy solution to build your own `API`. This example shows how it can be used to create your [REST](https://en.wikipedia.org/wiki/Representational_state_transfer) `API`.

## Getting started
- Run `yarn install`
- Run `yarn dev` to run dev mode
- Open `localhost:3000` to see the running pp

### Dependencies:
- Bootstrap: UI library
- 

### Dev dependencies
- Jest
- Babel: For transpiling JS to TS for jest


### Endpoints
#### POST `/api/solutions`

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
  type: 'solution

}

```


### TODOS:
- add mocked fetch test: 
  - https://testing-library.com/docs/react-testing-library/example-intro