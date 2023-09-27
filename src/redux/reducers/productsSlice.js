import { createSlice } from '@reduxjs/toolkit';
import AxiosInstance from '../../axiosInstance';
// --------------------------------------------------------------------

const initialState = {
  products: [],

  loading: false,
  error: null,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading(state) {
      state.loading = true;
      state.error = null;
    },
    setError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { setProducts, setLoading, setError } = productsSlice.actions;

export const fetchProducts = () => async dispatch => {
  try {
    dispatch(setLoading());
    const response = await AxiosInstance.get('/api/products/');
    dispatch(setProducts(response.data));

   

  } catch (error) {
    dispatch(setError(error?.response?.data?.message))

  }
};

export const fetchLatestProducts = () => async dispatch => {
  try {
    dispatch(setLoading());
    const response = await AxiosInstance.get('/api/products/latest');

    return response.data;
  } catch (error) {
    dispatch(setError(error?.response?.data?.message))

  }
};

export const searchProducts = (name) => async dispatch => {
  console.log('ser', name);
  try {
    dispatch(setLoading());
    const response = await AxiosInstance.get(`/api/products/name/${name}`);
    dispatch(setProducts(response.data));

   
  } catch (error) {
    dispatch(setError(error?.response?.data?.message))

  }
};


export const fetchProductsByCategory = (cat) => async dispatch => {
  try {
    dispatch(setLoading());
    let response;

    cat ?
     response = await AxiosInstance.get(`/api/products/category/${cat}`)
    : 
     response = await AxiosInstance.get('/api/products/')

    dispatch(setProducts(response.data));

   
  } catch (error) {
    dispatch(setError(error?.response?.data?.message))

  }
};

export const fetchProductsByBrand = (brand) => async dispatch => {
  try {
    dispatch(setLoading());
    let response;

    brand ?
     response = await AxiosInstance.get(`/api/products/brand/${brand}`)
    : 
     response = await AxiosInstance.get('/api/products/')

    dispatch(setProducts(response.data));

   
  } catch (error) {
    dispatch(setError(error?.response?.data?.message))

  }
};

export const getCategoriesNames = () => async dispatch => {
  try {
    const response = await AxiosInstance.get('/api/products/all-categories/');
    return response.data;

  } catch (error) {
    dispatch(setError(error?.response?.data?.message))

  }
};

export const getBrandsNames = () => async dispatch => {
  try {
    const response = await AxiosInstance.get('/api/products/all-brands/');
    return response.data;

  } catch (error) {
    dispatch(setError(error?.response?.data?.message))

  }
};

export const postProduct = (data) => async dispatch => {
  try {
    dispatch(setLoading());
    const response = await AxiosInstance.post('/api/products/', data);
    dispatch(setProducts(response.data));

   
  } catch (error) {
    dispatch(setError(error?.response?.data?.message))

  }
};

export const selectProducts = state => state.products.products;
export const selectLoading = state => state.products.loading;
export const selectError = state => state.products.error;
