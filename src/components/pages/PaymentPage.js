import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Col, Row, Container, Card, Breadcrumb } from 'react-bootstrap';
import { selectCartitems, selectTotal } from '../../redux/reducers/cartSlice';
import { addOrder, orderSlice, selectShihppingAddress, } from '../../redux/reducers/orderSlice';
import StepsHeader from '../StepsHeader';
import '../../App.scss';
// --------------------------------------------------------------------

const schema = yup.object().shape({
  paymentOption: yup.string().required('Please select a payment method'),
});
// --------------------------------------------------------------------

const PaymentForm = () => {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { setPaymentMethods } = orderSlice.actions;

  const products = useSelector(selectCartitems);
  const totalPrice = useSelector(selectTotal);
  const shihppingAddress = useSelector(selectShihppingAddress);



  const { register, handleSubmit, errors, watch } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      paymentOption: ''
    }
  });
  const selectedPaymentOption = watch('paymentOption');


  const onSubmit = async (data) => {

    await dispatch(setPaymentMethods(data.paymentOption))


    const order = {
      products: [...products],
      shippingAddress: { ...shihppingAddress },
      paymentMethods: data.paymentOption,
      totalPrice: totalPrice,
      taxPrice: .5,
      shippingPrice: 5,
      isPaid: data.paymentOption === "cash" ? false : true,
      paidAt: data.paymentOption === "cash" ? null : new Date(),
      deliveredAt: "",


    }

    if (data.paymentOption === 'cash') {

      dispatch(addOrder(order));

      navigate('/orders')
    } else {
      navigate('/checkout')

    }


  };




  useEffect(() => {

  }, []);

  return (
    <Container>

      <StepsHeader>
        <Breadcrumb.Item > <Link to='/shipping'> Shipping </Link></Breadcrumb.Item>
        <Breadcrumb.Item active> <Link to='/payment'> Payment </Link> </Breadcrumb.Item>
        <Breadcrumb.Item active>Order</Breadcrumb.Item>
      </StepsHeader>
      <Container className='d-flex justify-content-center align-items-center ' style={{ height: ' 80vh' }}>
        <Card className="w-75 text-start align-items-center text-light bg-dark card-box-border " >
          <Card.Header className='h2 text-bold'>Payment</Card.Header>
          <Card.Body>
            <Card.Text className='poppins-text'>
              All transactions are secure and encrypted.
            </Card.Text>


            <Form onSubmit={handleSubmit(onSubmit)} className='mb-5 text-light'>
              <Row>

                <Col sm={10}>
                  <Form.Group>
                    <Form.Check
                      inline
                      type="radio"
                      id="cash"
                      name="cash"
                      value="cash"
                      {...register('paymentOption')}

                    /> <Form.Label>Pay Cash</Form.Label>

                  </Form.Group>
                  <Form.Group>
                    <Form.Check
                      inline
                      type="radio"
                      id="card"
                      name="card"
                      value="card"
                      {...register('paymentOption')}

                    /> <Form.Label>Using Card</Form.Label>

                  </Form.Group>
                  <Form.Group>
                    <Form.Check
                      inline
                      type="radio"
                      id="paypal"
                      name="paypal"
                      value="paypal"
                      {...register('paymentOption')}

                    /> <Form.Label>Using PayPal</Form.Label>

                  </Form.Group>
                  {errors && (
                    <div className="text-danger">{errors.message}</div>
                  )}
                </Col>

              </Row>
              <Button type="submit" className='btn buttons mt-5 '>  {selectedPaymentOption === 'cash' ? 'Complete Order' : ' Pay Now'}</Button>

            </Form>
          </Card.Body>



        </Card>
      </Container>

    </Container>
  );

};

export default PaymentForm;
