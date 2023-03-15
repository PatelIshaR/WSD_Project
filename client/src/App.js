import './App.css';
import Login from './component/Auth/Login';
import Register from './component/Auth/Register';
import Home from './component/home/Home';
import { Route, Routes } from 'react-router-dom';
import Blogs from './component/Blog/Blogs';
import Content from './component/Blog/Content';
import AddBlog from './component/Blog/AddBlog';
import BlogById from './component/Blog/BlogById'
import UpdateBlog from './component/Blog/UpdateBlog';
import Error from './component/error/Error';

function App() {
  return (
    <>
      {/* <p>hello</p> */}
      {/* <Login /> */}
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/home' element={<Home />} />
        <Route path='/blogs' element={<BlogById />} />
        <Route path='/blog/:id' element={<Content />} />
        <Route path='/addBlog/:id' element={<AddBlog />} />      
        <Route path='/updateBlog/:id' element={<UpdateBlog />} />      
        <Route path='*' element={<Error />} />      
      </Routes>
    </>
  );
}

export default App;
