# Water Bucket Problem Solver

Nextjs frontend with an api endpoint for solving the classic water bucket problem

View it live: https://water-bucket-solver.vercel.app

--- 

## Getting started
- Run `yarn install`
- Run `yarn dev` to run dev mode
- Open `localhost:3000` to see the running pp

## Testing
- run `yarn test` to run some very minimal component tests

## Dependencies:
- Bootstrap: UI library
- Framer-motion: Animation library used for the bucket visualization
  - Probably could have stuck with css transitions but I was planning to have more complex animations, but didn't have time to get to that

## Dev dependencies
- Jest
- Babel: For transpilling TS to JS for jest

## Project Structure
- Next.js uses file based routing: all files under the `pages/` directory are mapped to a page.
- All files under `/page/api` are mapped to api endpoints (see docs: [API routes](https://github.com/vercel/next.js#api-routes))
- the `services` directory contains services used by the api
    - Unfortunately, this structure is required as adding `services` anywhere under the `pages/api` directory would result in the "service" file being mapped to an api endpoint. In the future, better organization could be worked out, but this is easy enough when starting with a small project like this.

## API Endpoints

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
    steps: [ ... list of Steps for solution]
  }
}

```

## Future Improvements
- More tests, didn't get around to adding any tests for the visualization code. Also e2e tests (e.g. cypress)
- The code for creating solution could be improved and consolidated.