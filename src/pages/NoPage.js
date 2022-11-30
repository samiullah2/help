import React from 'react'
import '../styles/NoPage.css'

function NoPage() {
  return (
    <div class="hero">
      <img id='copyRightImage' src={require("../assets/404image.png")} alt="" />    
      <div class="text">
        <p id='copyrightText'>Sad Orange made by werezu on Vecteezy</p>
      </div>
    </div>
  )
}


export default NoPage
