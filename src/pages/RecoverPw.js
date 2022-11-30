import React, {useState} from 'react'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../firebase'
import { Link } from "react-router-dom"
import '../styles/Pages.css'
import '../styles/SignForms.css'
import toast, { Toaster } from "react-hot-toast";

const RecoverPw = () => {
    const [email, setEmail] = useState("");
    const successToast = (toastMessage) => toast.success(toastMessage)
    const errorToast = (errorMessage) => toast.error(errorMessage)

    const handlePwReset = async () => {
        await sendPasswordResetEmail(auth, email)
        .then(() => {
            successToast("Recovery email was sent successfully")
        })
        .catch((error) => {
            errorToast(error.message)
        });
    }


  return (
    <>
    <div className='contBodySignForms'>
      <div className="signFormCont">
        <h1>Reset Password</h1>
        <div className="signFormContInputs">
          <label htmlFor="email">EMAIL</label>
          <input placeholder='Enter your email' type="text" className="inputForm" onChange={(event) => {setEmail(event.target.value)}}/>
        </div>
        <div className="signFormBtnLinkCont">
          <button className='formBttn' onClick={handlePwReset}>MAIL ME</button><Toaster/>
          <p>Remembered your password ? <Link to="/sign-in" className="linkBtnForms">Sign in</Link></p>   
        </div>    
      </div>
    </div>
   </>
  )
}

export default RecoverPw