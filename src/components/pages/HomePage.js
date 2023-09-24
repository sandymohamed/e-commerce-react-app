import { useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import { fetchProducts, selectProducts, selectLoading, selectError } from '../../redux/reducers/productsSlice';
import { PageNameContext } from '../../App';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { TiWarningOutline } from 'react-icons/ti';
import ProductCard from '../ProductCard';
import ImgSlider from '../ImgSlider';
import '../../App.scss';
import CardSketlon from '../CardSketlon';
// -------------------------------------------------------------------------------------


const HomePage = () => {

  const products = useSelector(selectProducts);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  const { setPageName } = useContext(PageNameContext)


  useEffect(() => {
    dispatch(fetchProducts());

    setPageName('Home')
  }, [dispatch, setPageName]);


  return (
    <>
      <Helmet>
        <title>ShopIn</title>
      </Helmet>
      <Container>
        <Row>
          <ImgSlider />


        </Row>

        {


          error ? (<Col className='text-danger mt-3'> <TiWarningOutline /> Error: {error}</Col>) :

            products && (
              <>
                <Row className='parent mt-4'>
                  <Row>
                    <Col sm={10}> <p className='h2 headTitle '>NEW PRODUCT</p> </Col>
                    <Col>
                      <Link to={'/new-products/'} className="btn buttons">
                        See All
                      </Link>
                    </Col>
                  </Row>

                  {
                    loading ? (
                      <>
                        <div className="spinner-border text-primary " role="status" />
                        <Container className='mb-4 d-flex justify-content-evenly aligh-items-center'>
                          {[...Array(4)].map((item, index) => (
                            <CardSketlon h={38} w={20} key={index} className='m-4 mb-3 ' />
                          ))}
                        </Container>
                      </>
                    ) :

                      products?.slice(0, 4)?.map((product) => (
                        <Col key={product?._id} xs={6} md={4} lg={3} className='mt-2 h-50'>
                          <ProductCard product={product} />
                        </Col>
                      ))
                  }
                </Row>

                <Row className='parent mt-4'>
                  <Row>
                    <Col sm={10}> <p className='h2 headTitle '>POPULAR PRODUCT</p> </Col>
                    <Col>
                      <Link to={'/products/'} className="btn buttons">
                        See All
                      </Link>

                    </Col>
                  </Row>

                  {
                    loading ? (
                      <>
                        <div className="spinner-border text-primary " role="status" />
                        <Container className='mb-4 d-flex justify-content-evenly aligh-items-center'>
                          {[...Array(4)].map((item, index) => (
                            <CardSketlon h={38} w={20} key={index} className=' m-4 mb-3 ' />
                          ))}
                        </Container>
                      </>
                    ) :

                      products?.slice(-6)?.map((product) => (
                        <Col key={product?._id} xs={6} md={4} lg={3} className='mt-2 h-50'>
                          <ProductCard product={product} />
                        </Col>
                      ))}
                </Row>
              </>
            )
        }

      </Container>
    </>
  );
};

export default HomePage;
