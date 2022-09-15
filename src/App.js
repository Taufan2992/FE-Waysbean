import React, { useContext, useEffect } from "react";
import { UserContext } from './context/user-context';
import {Routes, Route} from "react-router-dom"
import Main from "./pages/main/main"
import Login  from "./pages/main/login"
import Register  from "./pages/main/register"
import Mainuser  from "./pages/customer/mainuser"
import Cart  from "./pages/customer/cart"
import Profile from "./pages/customer/profile"
import Detailproduct from "./pages/customer/detailproduct"
import Transaction from "./pages/admin/transaction"
import Listproduct from "./pages/admin/listproduct"
import Addproduct from "./pages/admin/addproduct"
import { API, setAuthToken } from "./config/api"
import Updateproduct from "./pages/admin/updateproduct";
import Updateprofile from "./pages/customer/updateprofile";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
function App() {
  const [state,dispatch] = useContext(UserContext)
  console.log(state);

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    // if(state.isLogin === false) {
    //   return navigate('/main')
    // }else {
    //   if (state.user.status === "admin") {
    //     navigate("/transaction");
    //   } else if (state.user.status === "customer") {
    //     navigate("/mainuser");
    //   }
    // }
  },[state])

  const checkUser = async () => {
    try {
      const response = await API.get('/check-auth');
      console.log(response);
      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: 'AUTH_ERROR',
        });
      }

      // Get user data
      let payload = response.data.data;
      console.log(payload);
      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: 'USER_SUCCESS',
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage.token) {
      checkUser();
    }
  }, []);
  

  return (
    <Routes>
      <Route path="/" element={<Main/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/mainuser" element={<Mainuser/>} />
      <Route path="/cart" element={<Cart/>} />
      <Route path="/profile" element={<Profile/>} />
      <Route path="/detailproduct/:id" element={<Detailproduct/>} />
      <Route path="/transaction" element={<Transaction/>} />
      <Route path="/listproduct" element={<Listproduct/>} />
      <Route path="/addproduct" element={<Addproduct/>} />
      <Route path="/updateproduct/:id" element={<Updateproduct/>} />
      <Route path="/updateprofile/:id" element={<Updateprofile/>} />
    </Routes>

  );
}

export default App;
