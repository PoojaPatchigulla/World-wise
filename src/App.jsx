import{BrowserRouter,Routes,Route, Navigate} from 'react-router-dom'

import HomePage from './pages/HomePage'
import Product from './pages/Product'
import Pricing from './pages/Pricing'
import PageNotFound from './pages/PageNotFound'
import AppLayout from './pages/AppLayout'
import Login from './pages/Login'
import CityList from './components/CityList'
import CountryList from './components/CountryList'
import City from './components/City'
import Form from './components/Form'
import {AuthProvider,useAuth} from './contexts/FakeAuth'
import { CitiesProvider } from './contexts/CitiesContext'
import ProtectedRoute from './pages/ProtectedRoute'
function App() {
   
  return (
    <AuthProvider>
    <CitiesProvider>
    <BrowserRouter>
     <Routes>
      <Route path='/' element={<HomePage/>} />
      <Route path='/product' element={<Product/>} />
      <Route path='/pricing' element={<Pricing/>} />
      
      <Route path='/login' element={<Login/>} />
      <Route path='/app' element={<ProtectedRoute><AppLayout/></ProtectedRoute>} >
         <Route index  element={<Navigate replace to="cities"/>}/>
         <Route path='cities' element={<CityList />}></Route>
         <Route path='countries' element={<CountryList />}></Route>
         <Route path='cities/:id' element={<City/>}></Route>
         <Route path='form' element={<Form/>}></Route>
      </Route>
      <Route path='*' element={<PageNotFound/>} />
     </Routes>
    </BrowserRouter>
    </CitiesProvider>
    </AuthProvider>
  )
}

export default App
