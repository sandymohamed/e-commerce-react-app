import React, { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import { login, selectError, selectLoading, } from '../../redux/reducers/userSlice';
import { TiWarningOutline } from 'react-icons/ti';
import { PageNameContext } from '../../App';
import '../../App.scss'
// -------------------------------------------------------------------------------------

const schema = yup.object().shape({
    email: yup.string().required('Email is required').email('Invalid email format'),
    password: yup.string().required('Password is required'),
});
// -------------------------------------------------------------------------------------

const Login = () => {

    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();


    const handleSignUp = () => {
        navigate('/signup', { state: { from: location } })
    };


    const { handleSubmit, register, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            email: 'Jesseka@example.com',
            password: 's1234'

        }
    });

    const onSubmit = async (data) => {

        await dispatch(login(data)).then((res) => {
            if (res && !error)
                navigate(location.state?.from || '/');
        })

    };

    const { setPageName } = useContext(PageNameContext);

    useEffect(() => {
        setPageName('Login');
    }, [setPageName]);


    return (
        <Container className='mt-4 p-4  position-relative '>
            <Form onSubmit={handleSubmit(onSubmit)} className='position-absolute start-0 w-100' style={{ top: '15vh' }} >

                <Form.Group className="mt-4 p-2  " controlId="formBasicEmail">
                    <Form.Control
                        className={errors.email ? 'form-control-error' : 'form-control'}
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        {...register('email')}
                    />
                    {errors.email && <Form.Text className="text-danger">{errors.email.message}</Form.Text>}
                </Form.Group>

                <Form.Group className="mt-4 p-2" controlId="formBasicPassword">
                    <Form.Control
                        className={errors.password ? 'form-control-error' : 'form-control'}
                        type="password"
                        name="password"
                        placeholder="Password"
                        {...register('password')}
                    />
                    {errors.password && <Form.Text className="text-danger">{errors.password.message}</Form.Text>}
                </Form.Group>
                {
                    loading ? (
                        <div className="spinner-border text-primary mt-2" role="status">
                            {/* <span className="sr-only">Loading...</span> */}
                        </div>
                    ) : (
                        <Button className="btn buttons mt-2" type="submit">
                            Log In
                        </Button>
                    )}

                {/* <Link to={'/signup'} 
                className="text-light d-block"
                > */}

                <div className='d-flex justify-content-center align-items-center'>

                    <button
                        // to={'/login'}
                        className='d-block text-light text-decoration-underline text-center border-0 bg-transparent p-0'
                        onClick={handleSignUp}
                    >
                        New Customer?
                    </button>
                </div>
                {/* </Link> */}


            </Form>



            {error && <Form.Text className="fs-4 text-danger d-block"> <TiWarningOutline /> {error}</Form.Text>}

        </Container>
    );
};

export default Login;
