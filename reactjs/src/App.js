import './App.scss'
import Nav from './components/Navigation/Nav';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home/Home';
import News from './components/News/News';
import NotFound from './components/NotFound/NotFound';
import Login from './components/Login/Login';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* <Nav /> */}

        <Routes>
          <Route path='/news' element={<News />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Home />} />
          <Route path='*' element={<NotFound />} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
