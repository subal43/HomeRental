
import './App.css'


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import { Post, Login,SignUp ,Admin,Rent,Home_layout,Review} from './Component/index';

function App() {


  return (
    <Router>
      <Routes>
        <Route path='/Login' element={<Login />} />
        <Route path='/SignUp' element={<SignUp/>}/>
        <Route path='/' element={<Layout />}>
          <Route path='' element={<Home_layout/>}/>
          <Route path='/rent' element={< Rent/>}   />
          <Route path='/post' element={<Post />} />
          <Route path='/review' element={<Review/>}/>
          <Route path='/admin' element={<Admin/>}/>

        </Route>
      </Routes>
    </Router>
  )
}

export default App
