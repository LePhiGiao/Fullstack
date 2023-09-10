import './App.scss'
import Nav from './components/Navigation/Nav';
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppRoutes from './routes/AppRoutes';
import { Rings } from 'react-loader-spinner'
import { UserContext } from './context/UserContext'
import { useContext } from 'react';


function App() {
  const { user } = useContext(UserContext)

  return (
    <BrowserRouter>
      {user && user.isLoading
        ?
        <div className='loading-container'>
          <Rings
            height="80"
            width="80"
            radius="9"
            color='#1877f2'
            ariaLabel='three-dots-loading'
            wrapperStyle
            wrapperClass
          />
          <div>Loading data ...</div>
        </div>
        :
        <>
          <div className='app-header'>
            <Nav />
          </div>
          <div className="App">
            <AppRoutes />

            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />

          </div>
        </>
      }

    </BrowserRouter>
  );
}

export default App;
