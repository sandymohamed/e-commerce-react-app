import { useRouteError } from "react-router-dom";
import { Container } from "react-bootstrap";
// -------------------------------------------------------------------------------------

const Error404 = () => {
    const error = useRouteError();
    console.error(error);
  
    return (
      <Container id="error-page">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i className="text-danger h5">{error.statusText || error.message}</i>
        </p>
        <button className='btn btn-primary' onClick={() => window.history.back()}>Go Back</button>


        </Container>

    );
  }
export default Error404;
