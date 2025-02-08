import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './User/layout/Layout';
import Index from './User/pages/Index';
import Login from './User/pages/Login';
import Register from './User/pages/Register';
import Cart from './User/pages/Cart';
import ProductDetail from './User/pages/ProductDetail';
import AccountManagement from './User/pages/AccountManagement ';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import store from './User/Reducer/Store';
import CheckoutPage from './User/pages/CheckoutPage';
import About from "./User/pages/About"
import Page404 from './User/pages/Page404';
function App() {
 
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>

          <Route path='' element={<Layout></Layout>}>

            <Route index element={<Index></Index>}></Route>
            <Route path='login' element={<Login></Login>}></Route>
            <Route path='register' element={<Register></Register>}></Route>
            <Route path='aboutus' element={<About></About>}></Route>
            <Route path='cart' element={<Cart></Cart>}></Route>
            <Route path='productDetail/:id' element={<ProductDetail></ProductDetail>}></Route>
            <Route path='profile' element={<AccountManagement></AccountManagement>}></Route>
            <Route path='checkout' element={<CheckoutPage></CheckoutPage>}></Route>
            
          </Route>


          <Route path='*' element={<Page404></Page404>}> </Route>
        </Routes>


        <ToastContainer autoClose={3000} pauseOnHover={false} pauseOnFocusLoss={false} ></ToastContainer>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
