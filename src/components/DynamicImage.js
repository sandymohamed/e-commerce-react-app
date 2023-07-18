import React from 'react';

const DynamicImage = ({ image, className }) => {

  const imageUrl =
    /^https?:\/\//i.test(image) 
      ? image 
      : `${process.env.REACT_APP_API_URL}${image}`; 


  return <img src={imageUrl} alt={`pic-${image}`} className={className} />;
};

export default DynamicImage;
