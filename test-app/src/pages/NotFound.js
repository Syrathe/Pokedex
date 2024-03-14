import { Link } from 'react-router-dom'
export default function NotFound() {
  return (
    <div>
      <h1>Pikachu ran out of battery. This is a 404.</h1>
      <Link to="/">Home</Link>
    </div>
  )
}
