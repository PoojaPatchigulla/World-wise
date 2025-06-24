import { createContext, useContext } from "react";
import { useReducer } from "react";

const AuthContext = createContext();

const initialState = {
    user:null,
    isAuthenticated:false,
    error:null,
}


function reducer(state,action){
    switch(action.type){
        case "login":
            return{...state,user:action.payload,isAuthenticated:true,error:null};
        case "logout":
            return{...state,user:null,isAuthenticated:false,error:null};
        case "login/error":
            return{...state,user:null,isAuthenticated:false,error:action.payload}
        default:throw new Error('unknow action')
    }
}

const FAKE_USER = {
    name: "Jack",
    email: "jack@example.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?u=zz",
  };


export function AuthProvider({children}) {

    const [{user,isAuthenticated,error},dispatch] = useReducer(reducer,initialState);
    function login(email,password){
        console.log("hello from fake auth");
       if(email===FAKE_USER.email&&password===FAKE_USER.password){
        dispatch({type:'login',payload:FAKE_USER});
       }
       else{
         dispatch({type:'login/error',payload:'enter correct email and password'})
       }
    }

    function logout(){
       dispatch({type:'logout'});
    }
    return (
        <AuthContext.Provider value={{user,isAuthenticated,login,logout,error}}>
           {children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
    const context = useContext(AuthContext);
    return context;
}
