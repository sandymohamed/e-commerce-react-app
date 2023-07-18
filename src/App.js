import React, { createContext, useEffect, useState } from 'react';
import './App.scss';
import Routes from './components/pages/Routes';
import { getCartDetails } from './redux/reducers/cartSlice';
import { fetchUserData, selectUser } from './redux/reducers/userSlice';
import { useDispatch, useSelector } from 'react-redux';

// -------------------------------------------------------------------------------------

export const PageNameContext = createContext();

// -------------------------------------------------------------------------------------

function App() {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);

  const updateRenderData = async() => {
    await dispatch(fetchUserData())
    
    dispatch(getCartDetails(user._id))

     
  }

  useEffect(() => {
    updateRenderData()

   

  }, []);
  

  const [pageName, setPageName] = React.useState('');


  
  return (
    <PageNameContext.Provider value={{ pageName, setPageName }}>

      <div className="App">
        <Routes />
      </div>
    </PageNameContext.Provider>

  );
}

export default App;
