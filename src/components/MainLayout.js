import { Outlet } from 'react-router-dom';
import Header from './pages/Header';
import Footer from './pages/Footer';
import '../App.scss'
// -------------------------------------------------------------------------------------


function MainLayout() {


  return (
    <div className="MainLayout "
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}>

      <Header />

      <div style={{ flex: 1,marginBottom: '1rem', minHeight:'70vh',}}>
        <Outlet />
      </div>

      <Footer style={{ flexShrink: 0 }} />

    </div>
  );
}

export default MainLayout;

