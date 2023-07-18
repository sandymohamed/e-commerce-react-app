import React, { useContext, useEffect, useState } from 'react'
import { Card, CardGroup, Col, Container, Row, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { deleteOrder, getOrders, selectOrder } from '../../redux/reducers/orderSlice'
import { useDispatch, useSelector } from 'react-redux'
import CardSketlon from '../CardSketlon'
import { PageNameContext } from '../../App';
// --------------------------------------------------------------------

const OrdersPage = () => {

    const dispatch = useDispatch();
    const orders = useSelector(selectOrder);

    const { pageName, setPageName } = useContext(PageNameContext);

    const [loading, setLoading] = useState(true);

    const handleCancelOrder = (id) => {

        dispatch(deleteOrder(id))

    }

    useEffect(() => {
        setPageName('My Orders')
        dispatch(getOrders()).then(() => setLoading(false))

    }, [loading])


    return (
        <Container className=' p-2 text-light'>
            {
                loading ? (
                    <>
                        <div className="spinner-border text-primary " role="status" />
                        <Container className='mb-4 '>
                            {[...Array(2)].map((item, index) => (
                                <div key={index}>
                                    <p className='bg-secondary   w-50 m-3 text-center' > --</p>
                                    <p className='bg-secondary  w-100'>  -- </p>
                                    <p className='bg-secondary  w-100'>  -- </p>

                                    <CardSketlon h={38} w={20} index={index} className=' m-4 mb-3 ' />
                                </div>
                            ))}
                        </Container>
                    </>
                ) :
                    orders.length ?
                        orders.map((order) => (
                            <div key={order._id} className='mb-4'>
                                <Row>
                                    <Col>
                                        <p className='fs-3 text-start yellow-text'>Order Details: </p>
                                    </Col>
                                    <Col>
                                        {order.status !== 'delivered' &&
                                            <Button variant="outline-danger" onClick={() => { handleCancelOrder(order._id) }}> Cancel Order </Button>
                                        }
                                    </Col>
                                </Row>
                                <Container className="d-block">

                                    <p className='fs-5 mt-4 text-start '> <span style={{ color: '#ccc', marginRight: '.5rem', }} className='poppins-text' >Ordered at:  </span> {new Date(order?.createdAt)?.toLocaleDateString()}</p>
                                    <p className='fs-5 mt-4 text-start text-decoration-underline'> <span style={{ color: '#ccc', marginRight: '.5rem', }} className='poppins-text' > Shipping Status: </span>{order?.status}  </p>
                                    <p className='fs-5 mt-4 text-start '> <span style={{ color: '#ccc', marginRight: '.5rem', }} className='poppins-text' > Address: </span> {order?.shippingAddress?.address} </p>
                                    <p className='fs-5 mt-4 text-start '> <span style={{ color: '#ccc', marginRight: '.5rem', }} className='poppins-text' > Paid: </span> {order?.isPaid ? 'Yes' : 'NO'} </p>
                                    <p className='fs-5 mt-4 text-start '> <span style={{ color: '#ccc', marginRight: '.5rem', }} className='poppins-text' > Total Price: </span> {order?.totalPrice} </p>

                                </Container>
                                <Row >
                                    <CardGroup key={order?._id} className='w-100 mb-6 mt-4 d-flex flex-wrap justify-content-evenly align-items-center m-2 box-border ' >

                                        {order?.products.length &&
                                            order.products.map((item) => (
                                                <Col xs={6} md={4} key={item._id}>

                                                    <Card className=' m-2 box-border cart-card ' style={{ height: '32vh' }}>

                                                        <Link to={`/product/${item._id}`} className='h-50 rounded' >
                                                            <Card.Img variant="top" src={item.image} className='h-100 rounded' />
                                                        </Link>

                                                        <Card.Body className=' '>
                                                            <Row>

                                                                <Col xs={12} sm={8}>
                                                                    <Card.Title align='start' className='fs-5'>{item.name}</Card.Title>
                                                                </Col>
                                                                <Col xs={12} sm={4}>
                                                                    <Card.Text align='start' className='text-light fs-5' >{`${item?.price} $`}</Card.Text>
                                                                </Col>
                                                            </Row>



                                                            <span className="d-flex flex-start" > Qty: {item.quantity} -
                                                                Total:  {Math.ceil(item.price * item.quantity)}</span>

                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                            ))
                                        }

                                    </CardGroup>
                                </Row>
                                <hr />
                            </div>
                        ))
                        :
                        (
                            <>
                                <p> You didn't ordered before </p>
                            </>
                        )
            }

        </Container>
    )
}

export default OrdersPage