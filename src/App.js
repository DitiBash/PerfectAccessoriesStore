import './App.css';
import Basket from './features/orders/Basket';

import {Route, Routes, useNavigate } from 'react-router-dom';
import Home from './features/singlePage/home';
import About from './features/singlePage/about';
import NotFound from './features/singlePage/notFound';
import NavBar from './features/navbar/NavBar';
import NavBarUser from './features/navbar/NavBarUser';
import EnterManager from './features/manager/EnterManager';
import ProductsList from './features/product/ProductsList';
import Login from './features/user/LogIn';
import AddUser from './features/user/AddUser';
import Register from './features/user/Register';
import SmallBasket from './features/orders/SmallBasket';
import ManagerSlice from './features/manager/managerSlice';
import AddProduct1 from './features/manager/AddProduct';
import ListUser from './features/user/ListUser'
import NavBarMeneger from "./features/navbar/NavBarMeneger"
import Trys from './features/navbar/Trys'
import AddOrUpdateProduct  from './features/manager/AddOrUpdateProduct';
// import Basket2 from './features/orders/Basket2';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";








function App() {
  // let isEdit = useSelector(st => st.manager.forEdit)
  
  return (
    <div className="App">
      <Trys/>
      {/* <NavBarMeneger/> */}
      {/* <img src='https://perfectaccessories.co.il/wp-content/uploads/2019/11/perfect-accessories-logo-03.jpg'/> */}
      <Register/>
      <Login/>
      <NavBarUser/>
      
      <Routes>
      <Route path='/addUser' element={<Register />} />
        {/* <Route path='/addUser' element={<AddUser />} /> */}
        <Route path='/users' element={<ListUser/>}/>
        <Route path='/addProduct' element={<AddOrUpdateProduct />} />
        <Route path='/home/addUser' element={<Register />} />
        <Route path='/' element={<Home />} />
        <Route path='/login' element={ <Login/>}/>
        <Route path='/enterManager' element={<EnterManager />} />
        <Route path='home' element={<Home />} />
        <Route path='/products' element={<ProductsList />} >

          <Route path='basket/:id' element={<Basket />} />
        </Route>
        <Route path='/about' element={<About />} />
        <Route path='/basket' element={<Basket />} />
        <Route path='/home/login' element={<Login />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
{/* 
      <ProductsList />*/}
      <NavBar />
    </div>
  );
}

export default App;
