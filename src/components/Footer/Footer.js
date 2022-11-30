import React from 'react';
import '../../styles/Footer.css'
import { FaFacebookSquare, FaInstagram } from 'react-icons/fa'

const Footer = () => {
  return (
    <div className="footer">
        <div className="footer-container">
            <div className="footer-row">
                {/* Column1 */}
                <div className="footer-col">
                    <h4 className='footer-col-title'>WonderMealz</h4>
                    <ul className="footer-list">
                        <li><a href="#">+32-456-555-163</a></li>
                        <li>Brussels, Belgium</li>
                        <li>Muntplein 123, 1000 Brussels</li>
                    </ul>
                </div>
                {/* Column2 */}
                <div className="footer-col">
                    <h4 className='footer-col-title'>Quick Links</h4>
                    <ul className="footer-list">
                        <li><a href="/recipe-finder">Find Recipes</a></li>
                        <li><a href="/meal-generator">Meal-Generator</a></li>
                        <li><a href="/shoppinglist">Shopping List</a></li>
                        <li><a href="/account">Account</a></li>
                    </ul>
                </div>
                {/* Column3 */}
                <div className="footer-col">
                    <h4 className='footer-col-title'>Social Media</h4>
                    <ul className="footer-list">
                        <li><a href="#"><FaFacebookSquare/> Facebook</a></li>
                        <li><a href="#"><FaInstagram/> Instagram</a></li>
                    </ul>
                </div>
            </div>
            <hr />
            <div className="footer-row">
                <p className="copyright">
                    &copy; {new Date().getFullYear()} WonderMealz | All Rights reserved | <a href="/terms-service">Terms Of Service</a> | <a href="/privacy-policy">Privacy Policy</a>
                </p>
            </div>
        </div>
    </div>
  )
}

export default Footer