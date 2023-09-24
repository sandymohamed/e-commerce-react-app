import { useCallback, useEffect, useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { addCart, } from '../redux/reducers/cartSlice';
import { selectUser } from '../redux/reducers/userSlice';
import DynamicImage from './DynamicImage';
import '../App.scss';
// --------------------------------------------------------------------

const StyledBody = styled.div`
height: 10%; width:100%;

`;

// --------------------------------------------------------------------

const ProductCard = ({ product }) => {
  const { name, image, price, oldPrice, rating, _id, countInStock } = product;

  const [productName, setProductName] = useState(name);

  const getProductName = useCallback(() => {

    const words = name.split(' ');

    if (name.length <= 3) {
      return name;
    }

    const shortenedWords = [];

    for (let i = 0; i < words.length && shortenedWords.length < 3; i++) {
      shortenedWords.push(words[i]);
    }

    setProductName(shortenedWords.join(' '))

  }, [name])

  useEffect(() => {

    getProductName()

  }, [getProductName])

  const dispatch = useDispatch();
  const user = useSelector(selectUser);



  const handleAddToCart = (item) => {
    const data = { user: user._id, ...item }
    dispatch(addCart(data));
  };

  return (
    <Card className='box-border h-100'>
      <Link to={`/product/${_id}`} style={{ height: '40vh' }}>
        <DynamicImage variant="top" image={image} className='product-card-img' />
      </Link>
      <StyledBody>

        <Row>
          <Col md={6}>
            <Card.Title align="start" className='ps-1 poppins-text text-nowrap'>{productName}</Card.Title>
          </Col>

        </Row>

        <Row>
          <Col md={6}>
            <Rating value={rating} />
          </Col>

          <Col>
            {oldPrice ? <>
              <Card.Text className='yellow-text fs-3 text-nowrap' > <span className='text-decoration-line-through fs-6 text-dark'> {`${oldPrice} $`}</span>  {`${price} $`} </Card.Text>

            </>
              :
              <Card.Text className='yellow-text fs-3' >{`${price} $`}</Card.Text>
            }
          </Col>
        </Row>

        <button
          className={
            countInStock >= 0 ?
              'btn buttons ms-auto' :
              'btn btn-muted ms-auto'
          }
          disabled={product.countInStock <= 0}
          onClick={() => handleAddToCart(product)}
        >{countInStock > 0 ? 'Add to Cart' : 'Sold Out'}</button>


      </StyledBody>
    </Card>
  );
};

export default ProductCard;
