import { createSlice } from '@reduxjs/toolkit';
import AxiosInstance from '../../axiosInstance';
// --------------------------------------------------------------------

const initialState = {
  user: {},
  loading: false,
  error: null,
}


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
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

    }

  }
})

export const { setUser, setLoading, setError } = userSlice.actions;

export const login = (data) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const response = await AxiosInstance.post('api/user/login/', data , {
      headers: {
        'Content-Type': 'multipart/form-data',
      } });
    dispatch(setUser(response.data));

    localStorage.setItem('token', response.data.token);

  } catch (error) {
    if (error.response && error.response.status === 401) {
      // Server returned an error response with data
      dispatch(setError('Invalid email or password'));
    } else if (error.request) {
      // Request made but no response received
      dispatch(setError('Request failed. Please try again.'));

    }
    else {
      // Something else happened
      dispatch(setError('An unexpected error occurred.'));
    }

  }
};


export const logout = (data) => async dispatch => {

  try {
    dispatch(setLoading());
    dispatch(setUser({}));

    localStorage.removeItem('token')

  } catch (error) {
    dispatch(setError(error.message))

  }


}




export const signUp = (data) => async dispatch => {

  try {
    dispatch(setLoading());
    const response = await AxiosInstance.post('api/user/signup/', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    dispatch(setUser(response.data));

    localStorage.setItem('token', response.data.token);

  } catch (error) {
    if (error.response && error.response.status === 400) {
      // Server returned an error response with data
      dispatch(setError('Email already exist'));
    } else if (error.request) {
      // Request made but no response received
      dispatch(setError('Request failed. Please try again.'));

    }
    else {
      // Something else happened
      dispatch(setError('An unexpected error occurred.'));
    }

  }
}

export const updateProfile = (data) => async dispatch => {

  try {
    dispatch(setLoading());
    const response = await AxiosInstance.put('api/users/profile', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
    dispatch(setUser(response.data));

    localStorage.setItem('token', response.data.token);

  } catch (error) {

    if (error.request) {
      // Request made but no response received
      dispatch(setError('Request failed. Please try again.'));

    }
    else {
      // Something else happened
      dispatch(setError('An unexpected error occurred.'));
    }

  }
}


export const fetchUserData = () => async dispatch => {

  try {
    // Make an API request to fetch user data
    const response = await AxiosInstance.get('/api/user/profile');
    dispatch(setUser(response.data));
  } catch (error) {
    console.error('Error fetching user data:', error);
  }

};

export const selectUser = state => state.user.user;
export const selectLoading = state => state.user.loading;
export const selectError = state => state.user.error;
