import { createContext, useReducer } from 'react'
export const UserContext = createContext()

const initialState = {
    isLogin : false,
    // customerLogin : false,
    // adminLogin : false,
    isRegister : false,
    user : {}
};

const reducer = (state, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case "USER_SUCCESS":
      case "LOGIN_SUCCESS":
        localStorage.setItem("token", payload.token);
        return {
          isLogin: true,
          // customerLogin : true,
          // adminLogin : false,
          user: payload,
        };
      case "REGISTER_SUCCESS":
        return {
          isRegister: true,
          // adminLogin : false,
          // customerLogin : false,
          user: payload,
        };
      case "ADD_CART_SUCCESS":
        return {
          cart: {},
        };
      case "AUTH_ERROR":
      case "LOGOUT":
        localStorage.removeItem("token");
        return {
          isLogin: false,
          // customerLogin : false,
          // adminLogin : false,
          user: {},
        };
      default:
        throw new Error();
    }
  };

export const UserContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
    <UserContext.Provider value={[state, dispatch]}>
        {children}
    </UserContext.Provider>
    );
};
