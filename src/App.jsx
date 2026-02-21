import "./App.css"
import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
//import Bookdetails from './pages/BookDetails'
//import { Profile } from './pages/Profile'
//import { UserCart } from './pages/UserCart'
import { Navbar } from './components/Navbar/Navbar'
import { ShoppingCartProvider } from './context/ShoppingCartContext'
import { BookContextProvider } from './context/DataBooksContext'
const Login = lazy(() => import('./components/Login/Login'))
const Register = lazy(() => import('./components/Register/Register'))
const Bookdetails = lazy(() => import('./pages/BookDetails'))
const Orders = lazy(() => import('./pages/Orders'))
const ErrorRoute = lazy(() => import('./components/ErrorRoute/ErrorRoute'))
const CheckoutSuccess = lazy(() => import('./components/CheckoutSuccess/CheckoutSucess'))
const Profile = lazy(() => import('./pages/Profile'))
const ProtectedRoute = lazy(() => import('./components/ProtectedRoute/ProtectedRoute'))
const Landing = lazy(() => import('./components/Landing/Landing'))
const About = lazy(() => import('./pages/About/About'))
const Contact = lazy(() => import('./pages/Contact/Contact'))
//import Login from './components/Login'
//import Register from './components/Register'
import { AuthContextProvider } from './context/AuthContext'
import Footer from './components/Footer/Footer'

function App() {

  return (
    <AuthContextProvider>
      <BookContextProvider>
        <ShoppingCartProvider>
          <div className='container'>
            <Navbar />
            <main className="main-content">
              <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                  <Route path='/' element={<Landing />} />
                  <Route path='/books' element={<Home />} />
                  <Route path='/books/:id' element={<Bookdetails />} />
                  <Route path='/about' element={<About />} />
                  <Route path='/contact' element={<Contact />} />
                  <Route element={<ProtectedRoute redirectTo='/login' />}>
                    <Route path='/user/profile' element={<Profile />} />
                    <Route path='/order/:id' element={<Orders />} />
                    <Route path='/success' element={<CheckoutSuccess />} />
                  </Route>
                  <Route path='/login' element={<Login />} />
                  <Route path='/register' element={<Register />} />
                  <Route path='*' element={<ErrorRoute />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </div>
        </ShoppingCartProvider >
      </BookContextProvider>
    </AuthContextProvider>
  )
}

export default App
