import { Link } from 'react-router-dom'

const NotFound = (props) => {
    return (
        <div>
            <h1>404 not found</h1>
            <button><Link to="/">Back to CibusPlanning</Link>
            </button>
        </div>
      );
}
 
export default NotFound;