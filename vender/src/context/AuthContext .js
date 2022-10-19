import { createContext, useEffect, useReducer } from "react";

const INITIAL_STATE = {
  vender: localStorage.getItem("vender")
    ? JSON.parse(localStorage.getItem("vender"))
    : null,
  loading: false,
  error: null,
};

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        vender: null,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        vender: action.payload,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        vender: null,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      localStorage.removeItem("vender");
      return {
        vender: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("vender", JSON.stringify(state.vender));
  }, [state.vender]);

  return (
    <AuthContext.Provider
      value={{
        vender: state.vender,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
