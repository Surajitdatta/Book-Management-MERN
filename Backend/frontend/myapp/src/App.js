import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Header from './components/Header';
import Home from './components/Home';
import Show from './components/Show';
import Form from './components/Form';
import View from './components/View';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const [data, setData] = useState([])
  
  return (
    <div className="App">
      <BrowserRouter>
      <Header/>
        <Routes>
           <Route  path="/" element={<Home/>} />
           <Route  path="/show" element={<Show/>} />
           <Route  path="/form" element={<Form/>} />
           <Route  path="/view" element={<View/>} />
        </Routes>
      </BrowserRouter> 

      <ToastContainer
        position="top-right"
        autoClose={5000}  // Close after 5 seconds
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"  // Optional: you can change to 'light' or 'dark'
      />

      
    </div>
  );
}

export default App;
