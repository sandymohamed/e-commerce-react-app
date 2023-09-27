import { useState, useEffect, useContext, useCallback } from 'react';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import Rating from '../Rating';
import UserAvatar from '../UserAvatar';
import Message from '../Message';
import { selectUser } from '../../redux/reducers/userSlice';
import AxiosInstance from '../../axiosInstance';
import CardSketlon from '../CardSketlon';
import DynamicImage from '../DynamicImage';
import { PageNameContext } from '../../App';
import "../../App.scss";

// --------------------------------------------------------------------
const schema = yup.object().shape({
  rating: yup.number().min(1).max(5).required(),
  comment: yup.string().required("Comment is required"),
  image: yup.mixed(),

});

// -------------------------------------------------------------------------------------

const ProductDetails = () => {
  const { id } = useParams();

  const user = useSelector(selectUser);

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [loading, setLoading] = useState(true);

  const { setPageName } = useContext(PageNameContext);


  const [alertVariant, setAlertVariant] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');

  const showMessage = (message, variant) => {
    setAlertVariant(variant);
    setAlertMessage(message);
  };


  const [imageFile, setImageFile] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      rating: '',
      comment: '',
      image: '',
    },
  });

  // const { register, handleSubmit, formState: { errors }, reset } = methods;



  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const onSubmit = async (data) => {


    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('rating', data.rating);
    formData.append('comment', data.comment);


    AxiosInstance.post('/api/reviews/new', { ...data, image: imageFile, product: id }, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((res) => {
        setReviews((prevReviews) => [...prevReviews, res.data]);
        reset();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDeleteReview = (id) => {

    AxiosInstance.delete(`/api/reviews/${id}`)
      .then((res) => {
        // Update the reviews state with the new review
        getProductReviews();
        showMessage(`Success✔ ${res?.data?.message}`, 'success');
      })
      .catch((error) => {
        showMessage(`Failed ${error}❌`, 'danger');
      });
  }



  const getProductReviews = useCallback(() => {

    AxiosInstance.post('api/reviews/', { product: id })
      .then((res) => {
        setLoading(false);
        setReviews(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id])


  const [productName, setProductName] = useState(product?.name);

  const getProductName = useCallback(() => {

    const words = product?.name.split(' ');

    if (product?.name.length <= 3) {
      return product?.name;
    }

    const shortenedWords = [];

    for (let i = 0; i < words?.length && shortenedWords?.length < 3; i++) {
      shortenedWords.push(words[i]);
    }

    setProductName(shortenedWords.join(' '))

    setPageName(productName)

  }, [product?.name, productName, setPageName])


  useEffect(() => {

    getProductName();
    getProductReviews();
    AxiosInstance.get(`/api/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.log(error);
      });



  }, [getProductName, id, product?.name, getProductReviews]);


  if (!product) {
    return (
      <>
        <div className="spinner-border text-primary" role="status" />
        <Container className=' ms-6 w-75 align-center'>
          <CardSketlon details={true} />
        </Container>
      </>

    );
  }

  return (
    <>

      <Container className='text-light p-2'>
        <Row className="text-start boxShadow bg-dark rounded mt-3 p-4">
          <Col xs={11} sm={5} className="m-0  p-0 ">
            <DynamicImage image={product.image} alt={product.name} className="rounded card-image w-75" />
          </Col>
          <Col sm={6} className='card-text-start '>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: {product.price}</p>
            <button
              className={product.countInStock >= 0 ? 'btn buttons ms-auto' : 'btn btn-muted ms-auto'}
              disabled={product.countInStock <= 0}
            >
              Add to Cart
            </button>
          </Col>
        </Row>

        <hr />


        <p className="fs-4">Reviews:</p>

        {alertVariant && (
          <Message messageText={alertMessage} variant={alertVariant} />
        )}
        {loading &&
          <>
            <div className="spinner-border text-primary" role="status" />
            {[...Array(4)].map((item, index) => (
              <div key={index}>
                <CardSketlon h={23} w={100} details={true} index={index} review className=' m-4 mb-6 ' />
                <br />
              </div>
            ))}
          </>
        }
        {reviews?.map((review) => (
          <Row
            className="boxShadow text-start bg-dark text-light rounded mt-3 p-2 d-flex flex-row justify-content-start align-items-center"
            key={review.id}
          >
            <div className="w-100 d-flex flex-row flex-wrap-nowrap align-items-center position-relative mb-3">
              <UserAvatar
                imageUrl={review?.userId?.avatar}
                altText={review?.userId?.firstName}
                firstName={review?.userId?.firstName}
                lastName={review?.userId?.lastName}
              />
              <p className="fs-5 m-2">{review?.userId?.firstName} {review?.userId?.lastName}</p>



              {
                (user._id === review.userId._id) &&
                <button onClick={() => {
                  handleDeleteReview(review._id)
                }}>

                  <RiDeleteBin5Fill className='fs-5 position-absolute end-0 me-2 text-danger cursor-pointer' />
                </button>}

            </div>
            <Rating value={review?.rating} />
            <p>{review?.comment}</p>
            {
              review?.image &&

              <DynamicImage image={review?.image} alt={`pic-${review?.image}`} className="rounded w-25 h-25" />

            }

          </Row>
        ))
        }

        <hr />
        <Row className='mt-6'>
          <p className="fs-4">Add New Review:</p>
          {/* <FormProvider {...methods} > */}
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="formBasicRating">
              <Form.Control
                type="number"
                name="rating"
                placeholder="Rate"
                {...register('rating')}
              />
              {errors.rating && <span>This field is required and should be between 1 and 5</span>}
            </Form.Group>

            <br />
            <Form.Group controlId="formBasicComment">
              <Form.Control
                as="textarea"
                name="comment"
                placeholder="Comment"
                {...register('comment')}
              />
              {errors.comment && <span>This field is required</span>}
            </Form.Group>

            <Form.Group className="mt-4 p-2" controlId="formImage">
              <Form.Label className='w-50 text-light text-start fs-5'>Picture: </Form.Label>
              <input type="file" onChange={handleImageChange} className='text-light' />

              {errors.avatar && <Form.Text className="text-danger">{errors.image.message}</Form.Text>}
            </Form.Group>

            <Button type="submit" className='btn buttons mt-3'>Submit</Button>
          </Form>
          {/* </FormProvider> */}
        </Row>
      </Container>
    </>
  );
};

export default ProductDetails;
