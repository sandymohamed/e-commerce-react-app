import React from 'react';
import '../App.scss';
import DynamicImage from './DynamicImage';
// -------------------------------------------------------------------------------------

const UserAvatar = ({ imageUrl, altText, firstName, lastName }) => {

    const getInitials = () => {
        if (typeof firstName !== 'string' || typeof lastName !== 'string') {
            return '';
        }

        const initials = (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
        return initials;
    };



    return (
        <div className={`user-avatar rounded-circle mt-1 ${imageUrl ? null : 'boxShadow'}`}>
            {imageUrl ? (
                <DynamicImage image={imageUrl} alt={altText} className='w-100 rounded-circle boxShadow' />
            ) : (
                <div className="avatar-initials poppins-text fs-5" style={{ color: '#474747' }} >{getInitials()}</div>
            )}
        </div>
    );
};

export default UserAvatar;
