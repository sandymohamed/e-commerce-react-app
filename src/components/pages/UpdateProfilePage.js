import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectError, selectLoading, selectUser, updateProfile } from '../../redux/reducers/userSlice';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Form } from 'react-bootstrap';
import { TiWarningOutline } from 'react-icons/ti';
import '../../App.scss';
import Message from '../Message';

// --------------------------------------------------------------------

const schema = yup.object().shape({
    firstName: yup.string(),
    lastName: yup.string(),
    email: yup.string().email('Invalid email'),
    avatar: yup.mixed(),
    password: yup.string(),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
    ,
});
// --------------------------------------------------------------------

const UpdateProfile = () => {

    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);

    const [avatarFile, setAvatarFile] = useState(null);

    const [alertVariant, setAlertVariant] = useState(null);
    const [alertMessage, setAlertMessage] = useState('');

    const showMessage = (message, variant) => {
        setAlertVariant(variant);
        setAlertMessage(message);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            firstName: user?.firstName,
            lastName: user?.lastName,
            email: user?.email,
            avatar: '',
            password: '',
            confirmPassword: '',
        },
    });

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        setAvatarFile(file);
    };


    const onSubmit = async (data) => {

        const formData = new FormData();
        formData.append('avatar', avatarFile);
        formData.append('firstName', data.firstName);
        formData.append('lastName', data.lastName);
        formData.append('email', data.email);
        formData.append('password', data.password);
        formData.append('confirmPassword', data.confirmPassword);
     

        try {
            await dispatch(updateProfile(formData));
            showMessage('Profile Updated Successfully✔', 'warning');
        } catch (error) {
            showMessage('Profile Update failed❌', 'danger');
        }
    };

    useEffect(() => {

    }, [user])

    return (
        <Form onSubmit={handleSubmit(onSubmit)} className='w-100 text-start'>
            {alertVariant && (
                <Message messageText={alertMessage} variant={alertVariant} />
            )}
            <Form.Group className='d-flex justify-content-between align-items-center mt-5 fs-5 lh-base' controlId="formBasicfirstName">
                <Form.Label className='w-50'>First Name</Form.Label>
                <Form.Control
                    className='w-50'
                    type="text"
                    name="firstName"
                    {...register('firstName')}
                    isInvalid={!!errors.firstName}
                />
            </Form.Group>
            {errors.firstName && <Form.Text className="text-danger m-1 position-absolute start-50 "  >{errors.firstName.message}</Form.Text>}


            <Form.Group className='d-flex justify-content-between align-items-center mt-5 fs-5 lh-base' controlId="formBasicLastName">
                <Form.Label className='w-50'>Last Name</Form.Label>
                <Form.Control
                    className='w-50'
                    type="text"
                    name="lastName"
                    {...register('lastName')}
                    isInvalid={!!errors.lastName}
                />
            </Form.Group>
            {errors.lastName && <Form.Text className="text-danger m-1 position-absolute start-50 "  >{errors.lastName.message}</Form.Text>}


            <Form.Group className='d-flex justify-content-between align-items-center mt-5 mb-5 fs-5 lh-base' controlId="formBasicEmail">
                <Form.Label className='w-50'>Email address</Form.Label>
                <Form.Control
                    className='w-50'
                    type="email"
                    name="email"
                    {...register('email')}
                    isInvalid={!!errors.email}
                />

            </Form.Group>
            {errors.email && <Form.Text className="text-danger m-1 position-absolute start-50 "  >{errors.email.message}</Form.Text>}


            <Form.Label className='w-50'>* If you don't need to update password leave it empty.</Form.Label>
            <Form.Group className='d-flex justify-content-between align-items-center  fs-5 lh-base' controlId="formBasicPassword">
                <Form.Label className='w-50'>New Password</Form.Label>
                <Form.Control
                    className='w-50'
                    type="password"
                    placeholder='*...*'
                    name="password"
                    {...register('password')}
                    isInvalid={!!errors.password}
                />

            </Form.Group>
            {errors.password && <Form.Text className="text-danger m-1 position-absolute start-50 "  >{errors.password.message}</Form.Text>}


            <Form.Group className='d-flex justify-content-between align-items-center mt-5 fs-5 lh-base' controlId="formBasicConfirmPassword">
                <Form.Label className='w-50'>Confirm Password</Form.Label>
                <Form.Control
                    className='w-50'
                    type="password"
                    placeholder='*...*'
                    name="confirmPassword"
                    {...register('confirmPassword')}
                    isInvalid={!!errors.confirmPassword}
                />

            </Form.Group>


            <Form.Group className="mt-4 p-2" controlId="formAvatar">
                <Form.Label className='w-50 text-light text-start fs-5'>Your Photo: </Form.Label>
                <input type="file" onChange={handleAvatarChange} className='text-light' />

                {errors.avatar && <Form.Text className="text-danger">{errors.avatar.message}</Form.Text>}
            </Form.Group>


            {errors.confirmPassword && <Form.Text className="text-danger m-1 position-absolute start-50 "  >{errors.confirmPassword.message}</Form.Text>}
            {
                loading ? (
                    <div className="spinner-border text-primary mt-2" role="status">
                    </div>
                ) : (

                    <div className="w-100 mt-5 d-flex justify-content-center">
                    <button className="w-50 btn buttons" type="submit">
                      Update Profile
                    </button>
                  </div>
                )}
            {error && <Form.Text className="fs-4 text-danger d-block"> <TiWarningOutline /> {error}</Form.Text>}

        </Form>
    );
};

export default UpdateProfile;
