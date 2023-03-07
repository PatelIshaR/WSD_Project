import './App.css';
import Login from './component/Auth/Login';
import Register from './component/Auth/Register';
import Home from './component/home/Home';
import { Route, Routes } from 'react-router-dom';
import Blogs from './component/Blog/Blogs';
import Content from './component/Blog/Content';

function App() {
  return (
    <>
      {/* <p>hello</p> */}
      {/* <Login /> */}
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/home' element={<Home />} />
        <Route path='/blogs' element={<Blogs />} />
        <Route path='/blogs/:id' element={<Content />} />
        
      </Routes>
    </>
  );
}

export default App;
