import logo from './logo.svg';
import './App.css';
import Header from './widget/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Button } from 'react-bootstrap';
import Navigation from './widget/Navigation';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <div className='p-3'>
          <Header />
          <Navigation />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
