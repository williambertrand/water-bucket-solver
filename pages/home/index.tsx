import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from 'react-bootstrap/Spinner';

import Alert from 'react-bootstrap/Alert';

import type { Solution, SolutionParams } from '../../interfaces'
import { useState } from 'react'
import Header from '../../components/Header'
import { BucketForm } from '../../components/BucketForm';
import { fetchSolution } from '../../requests/solutions';
import SolutionContent from '../../components/Solution/SolutionTable';
import SolutionVisualizer from '../../components/Solution/SolutionVisulizer';

export default function HomePage() {

  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const [solution, setSolution] = useState<Solution>()

  const handleSubmit = async (params: SolutionParams) => {
    setLoading(true)
    setSolution(null)
    setError(null)
    try {
      const response = await fetchSolution(params)
      setSolution(response.attributes)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }


  return (
    <>
      <Header />
      <div style={styles.page}>
        <BucketForm onSubmit={handleSubmit} />
        <hr />
        {
          error && (
            <Alert key={"error-alert"} variant="danger">
              {error}
            </Alert>
          )
        }
        {
          loading && (
            <Spinner animation="border" role="status"></Spinner>
          )
        }
        { solution && <SolutionVisualizer solution={solution} />}
        <SolutionContent solution={solution} />
      </div>
    </>
  )
}

const styles = {
  page: {
    padding: "20px"
  },
  form: {
    marginBottom: "20px",
  }
}
