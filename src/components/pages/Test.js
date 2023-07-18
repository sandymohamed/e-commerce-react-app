// import React, { useState } from 'react';
// import AxiosInstance from '../../axiosInstance';

// const Test = () => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [productData, setProductData] = useState({
//     name: '',
//     brand: '',
//     price: 0,
//     description: '',
//     category: '',
//     rating: 0,
//     countInStock: 0,
//   });

//   const handleFileChange = (e) => {
//     setSelectedFile(e.target.files[0]);
//   };

//   const handleInputChange = (e) => {
//     setProductData({
//       ...productData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // const formData = new FormData();
//     // formData.append('image', selectedFile);
//     // for (const key in productData) {
//     //   formData.append(key, productData[key]);
//     // }

//     // console.log(formData);
//     console.log(productData);
//     console.log(selectedFile);
//     const data = {...productData, image: selectedFile}
//     console.log( 'DD',data);
//     try {
//       const response = await AxiosInstance.post('/api/products', data, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       console.log('Product creation success:', response.data);
//     } catch (error) {
//       console.error('Product creation failed:', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label>Name:</label>
//         <input
//           type="text"
//           name="name"
//           value={productData.name}
//           onChange={handleInputChange}
//         />
//       </div>
//       <div>
//         <label>Brand:</label>
//         <input
//           type="text"
//           name="brand"
//           value={productData.brand}
//           onChange={handleInputChange}
//         />
//       </div>
//       <div>
//         <label>Price:</label>
//         <input
//           type="number"
//           name="price"
//           value={productData.price}
//           onChange={handleInputChange}
//         />
//       </div>
//       <div>
//         <label>Description:</label>
//         <textarea
//           name="description"
//           value={productData.description}
//           onChange={handleInputChange}
//         ></textarea>
//       </div>
//       <div>
//         <label>Category:</label>
//         <input
//           type="text"
//           name="category"
//           value={productData.category}
//           onChange={handleInputChange}
//         />
//       </div>
//       <div>
//         <label>Rating:</label>
//         <input
//           type="number"
//           name="rating"
//           value={productData.rating}
//           onChange={handleInputChange}
//         />
//       </div>
//       <div>
//         <label>Count in Stock:</label>
//         <input
//           type="number"
//           name="countInStock"
//           value={productData.countInStock}
//           onChange={handleInputChange}
//         />
//       </div>
//       <div>
//         <label>Image:</label>
//         <input type="file" onChange={handleFileChange} />
//       </div>
//       <button type="submit">Upload</button>
//     </form>
//   );
// };

// export default Test;
