import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Blog from './pages/Blog';
import Newsfeed from './pages/Newsfeed';

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
         <Route path='/' element={<Signup/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/signin' element={<Signin/>} />
        <Route path='/blog/:id' element={<Blog/>} />
        <Route path='/blog/all' element={<Newsfeed/>} />
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
