import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { Provider } from 'react-redux';
//import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/bootstrap-custom.css'
import './assets/styles/index.css';
import store from './store.js';
import App from './App.js';
import reportWebVitals from './reportWebVitals.js';
import PrivateRoute from './components/PrivateRoute.jsx';
import HomeScreen from './screens/HomeScreen.jsx';
import ProductScreen from './screens/ProductScreen.jsx';
import CartScreen from './screens/CartScreen.jsx';
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import GuideScreen from "./screens/GuideScreen.jsx";
import AdminScreen from './screens/AdminScreen.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} >
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/product/:id" element={<ProductScreen />} />
      <Route path='/cart' element={<CartScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/guide" element={<GuideScreen />} />
      <Route path="/admin" element={<AdminScreen />} />
      <Route path='' element={<PrivateRoute />} >
        
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();