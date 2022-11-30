import React from 'react'
import {Nav, NavLink, Bars, NavMenu, NavBtnLink} from './NavbarElements'
import { auth, firestore } from '../../firebase'
const Navbar = ({toggle}) => {
  return (
    <>
        <Nav>
            <NavLink to='/'>
                {/* <img src={require('../../assets/logo-full-nobackg.png')} alt="Wonder Meals Logo" /> */}                
                <h1 className='LogoTitle'>WonderMealz</h1>
            </NavLink>
            <Bars onClick={toggle} />
            <NavMenu>
                <NavLink to='/recipe-finder' activeStyle>Recipe Finder</NavLink>
                <NavLink to='/meal-generator' activeStyle>Meal Generator</NavLink>
                <NavLink to='/shoppinglist' activeStyle>Groceries</NavLink>
                <NavLink to='/account' activeStyle>Account</NavLink>
                <NavBtnLink to='/sign-in'>Sign In</NavBtnLink>
            </NavMenu>
        </Nav>
    </>
  )
}

export default Navbar