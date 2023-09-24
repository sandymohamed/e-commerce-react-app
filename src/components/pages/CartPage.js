import '../../App.scss';
import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Link, useNavigate } from 'react-router-dom';
import { addItem, selectTotalQuantity, selectTotal, removeCart, selectCartitems, removeItemFromCart, getCartDetails } from '../../redux/reducers/cartSlice';
import { PageNameContext } from '../../App';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { selectUser } from '../../redux/reducers/userSlice';
import StepsHeader from '../StepsHeader';
import CardSketlon from '../CardSketlon';
import DynamicImage from '../DynamicImage';


// -------------------------------------------------------------------------------------
const CartPage = () => {

  const { setPageName } = useContext(PageNameContext)

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const items = useSelector(selectCartitems);
  const totalQuantity = useSelector(selectTotalQuantity);
  const total = useSelector(selectTotal);

  const user = useSelector(selectUser);

  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(true)

  const incrementQuantity = (quantity, countInStock, id) => {
    if (quantity < countInStock) {
      quantity++;

      setAnimate(true);

      setTimeout(() => {
        setAnimate(false);

      }, 5000);

    }
  };

  const decrementQuantity = (quantity, id) => {
    if (quantity > 1) {
      quantity--;

      setAnimate(true);

      setTimeout(() => {
        setAnimate(false);

      }, 5000);

    }

  };


  const handleAddToCart = (item) => {
    dispatch(addItem(item));

  };

  const handleRemoveFromCart = (item) => {
    dispatch(removeItemFromCart(item));
  };

  const handleClearCart = (user) => {
    dispatch(removeCart(user));

  };

  useEffect(() => {

    if (user) {

      dispatch(getCartDetails()).then(() => setLoading(false))
    }

    setPageName('Cart')


  }, [dispatch, user, setPageName]);


  const renderDigits = (number) => {

    const newNum = number?.toString()?.split('');

    return newNum?.map((digit, index) => (
      <span
        key={index}
        className={`digit 
          ${animate ? 'animateup' : ''}
          `}
        onAnimationEnd={() => setAnimate(false)}
      >
        {digit}
      </span>
    ));
  };

  const handleCheckout = () => {
    const token = localStorage.getItem('token')

    if (token) {
      navigate('/shipping', { replace: true })

    } else {
      navigate('/login', { state: { from: '/checkout' } })

    }

  }


  return (
    <Container align='left' className='poppins-text' >
      <StepsHeader>
        <Breadcrumb.Item active> Shipping</Breadcrumb.Item>
        <Breadcrumb.Item active> Payment </Breadcrumb.Item>
        <Breadcrumb.Item active>Order</Breadcrumb.Item>
      </StepsHeader>
      <Row xs={12} >
        <Col xs={6}>
          <p className='fs-2 mt-2 text-light'> My Cart:</p>
        </Col>
        <Col xs={6} className='d-flex justify-content-end align-items-center'>

          <p className='fs-4 m-1 text-light'>{totalQuantity} {totalQuantity > 1 ? 'items' : 'item'}</p>
          <Button
            onClick={() => handleClearCart(user._id)}
            variant="outline-danger"
          >
            <RiDeleteBin5Fill className='mb-1' />
            Clear Cart
          </Button>

        </Col>
      </Row>
      <Row>
        <Col xs={12} md={8}>
          {loading ? (
            <>
              <div className="spinner-border text-primary " role="status" />
              {[...Array(3)].map((item, index) => (
                <div className='mb-4 '>
                  <CardSketlon details={true} h={25} index={index} className='mb-4 ' />
                </div>
              ))

              }
            </>

          ) :
            items?.length ?
              items.map((item, index) => (
                <Card key={item?.id} className='w-100 poppins-text d-flex flex-row m-2 box-border cart-card ' style={{ height: '20vh' }}>

                  <Link to={`/product/${item._id}`} className='w-25' >
                    <DynamicImage variant="top" image={item.image} className='h-100 w-100 rounded' />
                  </Link>


                  <Card.Body className='row pb-1 d-flex justify-content-between'>

                    <Col xs={7} md={6} lg={8}>

                      <Card.Title align='start'>{item.name}</Card.Title>

                      {item.oldPrice ? <>
                        <Card.Text align='start' className='text-light fs-3 text-nowrap' > <span className='text-decoration-line-through fs-6 text-dark'> {`${item?.oldPrice} $`}</span>  {`${item?.price} $`} </Card.Text>

                      </>
                        :
                        <Card.Text align='start' className='text-light fs-3' >{`${item?.price} $`}</Card.Text>
                      }

                    </Col>

                    <Col xs={5} md={6} lg={3} className="d-flex align-items-center mb-1 pe-1 rounded text-light bg-orange" style={{ height: '5vh', }}>
                      <button
                        className="btn count-btn  bg-orange-hover"
                        onClick={() => {
                          handleRemoveFromCart(item)
                          decrementQuantity(item.quantity, item._id)
                        }}
                        disabled={item.quantity === 0}
                      >
                        -
                      </button>

                      <span className="fs-4  border border-top-0 border-bottom-0 ps-1 pe-1">{item.quantity}</span>
                      <button
                        className="btn count-btn bg-orange-hover"
                        onClick={() => {
                          handleAddToCart(item)
                          incrementQuantity(item.quantity, item.countInStock, item._id)
                        }}
                        disabled={item.quantity >= item.countInStock}
                      >
                        +
                      </button>


                      <Row className='d-block text-light position-absolute bottom-0 end-0 me-2' >
                        {item.quantity} * {item.price} =

                        <span className={` total-price ${animate ? 'animate' : ''}`} >
                          {renderDigits(Math.ceil(item.totalPrice))}
                        </span>

                      </Row>
                    </Col>

                  </Card.Body>
                </Card>
              )

              )
              :
              (
                <p className='text-light fs-5'>You didn't add any products yet start adding some.</p>
              )}

          <hr />
        </Col>
        {
          items &&


          <Col xs={12} md={4}>
            <Card className='w-100 mt-2 p-2  box-border cart-card'>

              <Card.Title className='fs-3 text-light'> Order Summary : </Card.Title>
              <Card.Text className='fs-5 text-light'> Subtotal :
                <span className={` total-price ms-2 ${animate ? 'animate' : ''}`} >
                  {renderDigits(Math.ceil(total))}

                </span> $
              </Card.Text>

              <Card.Text className='fs-5 text-light'> Shipping :
                <span className='ms-2 fs-6' >
                  Calculated at checkout

                </span>
              </Card.Text>
              <button
                className="btn buttons"
                onClick={handleCheckout}
                disabled={total <= 0}
              >
                Continue to shipping
              </button>

            </Card>
          </Col>
        }
      </Row>
    </Container>

  );
};

export default CartPage;
