import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import '../App.scss';
// --------------------------------------------------------------------

function Carousels() {
  return (
    // <div className='img-container'>
    <Carousel controls={false} className='rounded mt-4 '>
      <Carousel.Item  >
        <img
          className='w-100 rounded img-container m-2 me-4 '
          src='/images/pic-1.jpeg'
          alt='First slide'
        />

      </Carousel.Item>
      <Carousel.Item >
        <img
          className='w-100 rounded img-container m-2 me-4 '
          src='/images/pic-2.jpeg'
          alt='Second slide'
        />

      </Carousel.Item>
      <Carousel.Item >
        <img
          className='w-100 rounded img-container m-2 me-4 '
          src='/images/pic-3.webp'
          alt='Third slide'
        />

      </Carousel.Item>

      <Carousel.Item >

        <img
          className='w-100 rounded img-container m-2 me-4 '
          src='/images/pic-4.webp'
          alt='Fourth slide'
        />

      </Carousel.Item>
      <Carousel.Item >
        <img
          className='w-100 rounded img-container m-2 me-4 '
          src='/images/pic-5.webp'
          alt='Fifth slide'
        />
        <Carousel.Caption>
          <h3>Fifth slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>

      </Carousel.Item>
    </Carousel>
  );
}

export default Carousels;
