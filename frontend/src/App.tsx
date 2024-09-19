import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Blog from './pages/Blog';
import Newsfeed from './pages/Newsfeed';
import Navbar from './components/UI/NavBar';
import Errorpage from './pages/ErrorPage';
import { navbarConfig } from './config';
import TextEditor from './pages/TextEditor';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar
          logoSrc={navbarConfig.logoSrc}
          logoAlt={navbarConfig.logoAlt}
          menuItems={navbarConfig.menuItems}
          profileImgSrc={navbarConfig.profileImgSrc}
          profileName={navbarConfig.profileName}
        />
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/blog/create" element={<TextEditor />} />
          <Route path="/blog/all" element={<Newsfeed />} />
          <Route path="*" element={<Errorpage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
