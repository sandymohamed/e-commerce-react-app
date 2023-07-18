import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../App.scss';
// --------------------------------------------------------------------


function CardSketlon({ details = false, review = false, h = null, w = null }) {
    return (
        <Card className='m-2 boxShadow bg-dark rounded' style={{ height: `${!h ? '60vh' : `${h}vh`}`, width: `${!w ? '' : `${w}%`}` }}>
            <Card.Body className={`  ${details ? 'd-flex' : ''} `}>
                {!review ?

                    <div className={`bg-secondary  ${details ? 'h-100 w-50 d-flex' : 'h-50 w-100'} `} />
                    :
                    <div className='bg-secondary rounded-circle circle' />

                }

                <div className={`  ${details ? 'ms-2 w-50' : 'w-100'} `}>

                    <Card.Title className='bg-secondary   w-50 m-3 text-center' > --</Card.Title>
                    <Card.Text className='bg-secondary  w-100'>  -- </Card.Text>

                    {
                    !review ?
                        <Button className='btn buttons w-50 '> -</Button>
                        : null
                    }
                </div>
            </Card.Body>
        </Card>
    );
}

export default CardSketlon;