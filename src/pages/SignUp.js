import React, {useState} from 'react'
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth"
import { doc, setDoc } from 'firebase/firestore'
import { auth, firestore } from '../firebase'
import { Link, useNavigate } from 'react-router-dom'
import Select from 'react-select'
import '../styles/Pages.css'
import '../styles/SignForms.css'


function SignUp() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedDiet, setSelectedDiet] = useState("");

  const dietlist = [
    { value: "glutenfree", label: "Gluten Free" },
    { value: "vegan", label: "Vegan" },
    { value: "vegetarian", label: "Vegetarian" },
    { value: "ketogenic", label: "Ketogenic" },
    { value: "pescetarian", label: "Pescetarian" },
    { value: "paleo", label: "Paleo" },
    { value: "lacto-vegetarian", label: "Lacto-Vegetarian" },
    { value: "ovo-vegetarian", label: "Ovo-Vegetarian" },
    { value: "primal", label: "Primal" },
    { value: "whole30", label: "Whole30" },

  ];

  const colourStyles = {
    control: styles => ({ ...styles, backgroundColor: 'white' }),
    option: (styles, {isFocused }) => {
      return {
        ...styles,
        backgroundColor: isFocused ? '#e86375' : '#FDD6A3',
        color:  isFocused ? '#fff' : '#203354 ',
      };
    },
  };

  const handleSignUp = () => {
    if ((username.length > 3) && (email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) && (password.length > 5) && (confirmPassword === password)) {
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        setDoc(doc(firestore, "users", auth.currentUser?.uid), {
          username: username,
          email: email,
          dietPlan: selectedDiet
        })
        sendEmailVerification(auth.currentUser)
        .then(() => {
          console.log("Verification e-mail send at:", auth.currentUser.email)
        }).catch((error) => {
          console.log("Couldn't send verification email", error)
        })
        console.log('Registered as:', userCredentials.user.email);
        signupSuccess();
      })
      .catch(error => alert(error.message))
      
    } else {
      console.log("Invalid fields", "One or multiple fields where not filled correctly.")
    }
    
  }

  function handleDiet(diet) {
    setSelectedDiet(diet);
  }

  const navigate = useNavigate();
  const signupSuccess = event => navigate('/');

  return (
    <>
    <div className="contBodySignForms">
      <div className="signFormCont">
        <h1>SIGN UP</h1>
        {(username.length > 3) ? null :
          <p className='formInputError'>Username must be at least 4 characters</p>
        }
        <input placeholder='Username' type="text" className="inputForm" onChange={(event) => {setUsername(event.target.value)}}/>
        {(email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) ? null :
          <p className='formInputError'>Invalid email (e.g. test@test.com)</p>
        }
        <input placeholder='Email' type="text" className="inputForm" onChange={(event) => {setEmail(event.target.value)}}/>
        {(password.length > 5) ? null :
          <p className='formInputError'>Password must be at least 6 charcters long</p>
        }
        <input placeholder='Password' type="password" className="inputForm" onChange={(event) => {setPassword(event.target.value)}}/>
        {(confirmPassword === password) ? null :
          <p className='formInputError'>Passwords don't match</p>
        }
        <input placeholder='Confirm Password' type="password" className="inputForm" onChange={(event) => {setConfirmPassword(event.target.value)}}/>
        <div className="drpDiet">
          <Select
            options={dietlist}
            placeholder="Select your diet"
            value={selectedDiet}
            onChange={handleDiet}
            isSearchable={true}
            styles={colourStyles}
          />
        </div>
        <button className='formBttn' onClick={handleSignUp}>CREATE ACCOUNT</button>
        <p>Already have an account ? <Link to="/sign-in" className="linkBtnForms">sign in</Link></p>
      </div>
   </div>
    </>
  )
}

export default SignUp