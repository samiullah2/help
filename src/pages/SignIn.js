import React, {useState} from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import { Link, useNavigate } from "react-router-dom"
import '../styles/Pages.css'
import '../styles/SignForms.css'
import toast, { Toaster } from "react-hot-toast";

const SignIn = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
    .then(userCredentials => {
      const user = userCredentials.user;
      successToast("Logged in as:", user.email);
      loginSuccess();
    })
    .catch(error => errorToast(error.message))
  }

  const navigate = useNavigate();
  const loginSuccess = event => navigate('/');
  const successToast = (toastMessage) => toast.success(toastMessage);
  const errorToast = (errorMessage) => toast.error(errorMessage);

  return (
    <>
    <div className='contBodySignForms'>
      <div className="signFormCont">
        <h1>LOGIN</h1>
        <div className="signFormContInputs">
          <label htmlFor="email">EMAIL</label>
          <input placeholder='Enter your email' type="text" className="inputForm" onChange={(event) => {setEmail(event.target.value)}}/>
        </div>
        <div className="signFormContInputs">
          <label htmlFor="password">PASSWORD</label>
          <input placeholder='Enter your password' type="password" className="inputForm" onChange={(event) => {setPassword(event.target.value)}}/>
        </div>
        <div className="signFormBtnLinkCont">
          <button className='formBttn' onClick={handleLogin}>LOGIN</button><Toaster/>
          <p>Don't have an account ? <Link to="/sign-up" className="linkBtnForms">Sign up</Link></p>   
          <p>Forgot password ? <Link to="/recover-pw" className="linkBtnForms">Recover here</Link></p>    
        </div>
      </div>
    </div>
   </>
  )
}

export default SignIn