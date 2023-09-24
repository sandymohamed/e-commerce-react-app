import { useContext, useEffect, useState } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { Helmet } from 'react-helmet';
import { Container, Row, Col } from 'react-bootstrap';
import ProductCard from '../ProductCard';
import { useSelector, useDispatch } from 'react-redux';
import { selectError, getCategoriesNames, fetchProductsByCategory, getBrandsNames, fetchProductsByBrand, fetchLatestProducts } from '../../redux/reducers/productsSlice';
import { PageNameContext } from '../../App';
import CardSketlon from '../CardSketlon';

// -------------------------------------------------------------------------------------

const LatestProductsPage = () => {

    const error = useSelector(selectError);
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState(null);
    const [catOptions, setCatOptions] = useState(null);
    const [brandOptions, setBrandOptions] = useState(null);


    const { setPageName } = useContext(PageNameContext)


    useEffect(() => {
        setPageName('New Products')
        dispatch(fetchLatestProducts()).then(res => {
            setProducts(res);
            setLoading(false);
        })
        dispatch(getCategoriesNames()).then((res) => setCatOptions(res));
        dispatch(getBrandsNames()).then((res) => setBrandOptions(res));



    }, [dispatch, setPageName]);


    return (
        <>
            <Helmet>
                <title>Products</title>
            </Helmet>

            <Container>
                <Row>
                    <Col xs={12} sm={6} className='d-flex  text-light m-2'>
                        <Typeahead
                            variant="warning"
                            id="category"
                            labelKey="name"
                            placeholder='Category'
                            options={catOptions ? catOptions : null}
                            onChange={(selected) => {
                                dispatch(fetchProductsByCategory(selected[0]))

                            }}
                        />
                        <Typeahead
                            className='ms-2'
                            variant="warning"
                            id="Brand"
                            labelKey="name"
                            placeholder='Brand'
                            options={brandOptions ? brandOptions : null}
                            onChange={(selected) => {
                                dispatch(fetchProductsByBrand(selected[0]))

                            }}
                        />


                    </Col>

                </Row>
                <Row className='parent mt-4'>


                    {


                        error ? (<Col className='text-danger '>Error: {error}</Col>) :

                            loading ? (
                                <>
                                    <div className="spinner-border text-primary " role="status" />
                                    <Container className='mb-6 d-flex flex-wrap justify-content-evenly aligh-items-center'>
                                        {[...Array(14)].map((item, index) => (
                                            <CardSketlon h={50} w={20} key={index} className=' mb-6 ' />
                                        ))}
                                    </Container>
                                </>
                            ) :

                                products?.map((product) => (
                                    <Col key={product._id} xs={6} md={4} lg={3} className='mt-2 h-50' >
                                        <ProductCard product={product} />
                                    </Col>
                                ))

                    }
                </Row>
            </Container>
        </>
    )
}

export default LatestProductsPage;