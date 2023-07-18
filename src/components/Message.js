import Alert from 'react-bootstrap/Alert';
// --------------------------------------------------------------------

function Message({ messageText, variant }) {
  return (
    <>

      <Alert key={variant} variant={variant || 'warning'}>
        {messageText}
      </Alert>

    </>
  );
}

export default Message;