import React, {useState} from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './styles/App.css';
import Home from './pages/Home'
import MealGenerator from './pages/MealGenerator'
import RecipeFinder from './pages/RecipeFinder'
import ShoppingList from './pages/ShoppingList'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import NoPage from './pages/NoPage'
import Account from "./pages/Account";
import RecoverPw from "./pages/RecoverPw";
import TermsService from "./pages/TermsService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer/Footer";

function App() {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => {
    setIsOpen(!isOpen)
  }
  return (
    <div className="page-container">
      <div className="content-wrap">  
        <Router>
          <Navbar toggle={toggle} />
          <Sidebar isOpen={isOpen} toggle={toggle} />
          <Routes>
            <Route path="/" exact element={<Home/>} />
            <Route path="/recipe-finder" exact element={<RecipeFinder/>} />
            <Route path="/meal-generator" exact element={<MealGenerator/>} />
            <Route path="/shoppinglist" exact element={<ShoppingList/>} />
            <Route path="/account" exact element={<Account/>} />
            <Route path="/sign-up" exact element={<SignUp/>} />
            <Route path="/sign-in" exact element={<SignIn/>} />
            <Route path="/recover-pw" exact element={<RecoverPw/>} />
            <Route path="/terms-service" exact element={<TermsService/>} />
            <Route path="/privacy-policy" exact element={<PrivacyPolicy/>} />
            <Route path="*" exact element={<NoPage/>} />
          </Routes>
        </Router>
      </div>
      <Footer /> 
    </div>
  )
}

export default App;
