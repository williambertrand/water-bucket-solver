import { SolutionApiObject } from "../../interfaces";

export const fetchSolution = async (body): Promise<SolutionApiObject> => {
  const response = await fetch('/api/solutions', {
    method: "POST", 
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })

  if(!response.ok) {
    let res = await response.json()
    let err = new Error(res.message)
    throw err
  }

  return response.json(); 
}