import { createContext, useContext,useState,useEffect, useReducer, act } from "react"


const CitiesContext = createContext();
const BASE_URL = "http://localhost:8000";
// eslint-disable-next-line react/prop-types

function reducer(state,action){
  switch(action.type){
    case'loading':
        return {...state,isLoading:true};
    case 'cities/loaded' :
      return{
        ...state,isLoading:false,cities:action.payload
      }
    case 'city/created' :
      return {
        ...state,isLoading:false,cities:[...state.cities,action.payload]
      }
    case 'city/deleted' :
      return {
        ...state,isLoading:false,
        cities:state.cities.filter((city)=>city.id!=action.payload)
      }
    case 'city/selected' :
      return {...state,isLoading:false,currentCity:action.payload}
    case 'rejected':
      return {...state,isLoading:false,error:action.payload}
    default :
    throw new Error(`no action named ${action.type}`)
  }
}

const initialState = {
  cities:[],
  isLoading:false,
  currentCity:{},
  error:null
}

function CitiesProvider({children}) {

  const [{cities,isLoading,currentCity},dispatch]  = useReducer(reducer,initialState);

  //   const [cities,setCities] = useState([]);
  //  const [isLoading,setIsLoading] = useState(false);
  //  const [currentCity,setCurrentCity] = useState({});

   useEffect(function (){
       async function fetchCities(){
        try{
           dispatch({type:"loading"});
          const res = await fetch(`${BASE_URL}/cities`);
          const data = await res.json();
          dispatch({type:"cities/loaded",payload:data});
        }
        catch(e){
          dispatch({type:"rejected",payload:e.message});
        }
        
  
       }

    fetchCities();
   },[])

   async function getCity(id){
     if(Number(id)===currentCity.id)return;
        try{
          dispatch({type:"loading"});
          const res = await fetch(`${BASE_URL}/cities/${id}`);
          const data = await res.json();
          dispatch({type:"city/selected",payload:data});
        }
        catch(e){
          dispatch({type:"rejected",payload:e.message});
        }
        
   }
   async function createCity(newCity){
        try{
          dispatch({type:"loading"});
          const res = await fetch(`${BASE_URL}/cities/`,{
            method:'POST',
            body:JSON.stringify(newCity),
            headers:{
              "Content-Type":"application/json",
            },
          });
          const data = await res.json();
          dispatch({type:"city/created",payload:data});
        }
        catch(e){
          dispatch({type:"rejected",payload:e.message});
        }
        
   }
   
   async function deleteCity(id){
    try{
      dispatch({type:"loading"});
     await fetch(`${BASE_URL}/cities/${id}`,{
         method:'DELETE',
       });
      
      dispatch({type:'city/deleted',payload:id});
     }
     catch(e){
      dispatch({type:"rejected",payload:e.message});
     }
     
   }
    return (
        <CitiesContext.Provider value={{
          deleteCity,cities,isLoading,currentCity,getCity,createCity
        }}>
            {children}
        </CitiesContext.Provider>
    )
}

function useCities(){
    const context = useContext(CitiesContext);

    return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export  {CitiesProvider,useCities}
