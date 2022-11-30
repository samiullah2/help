import React, { useState, useEffect } from 'react'
import '../styles/Pages.css'
import '../styles/Settings.css'

import { signOut, onAuthStateChanged, deleteUser, updateEmail, updatePassword } from 'firebase/auth'
import { getDoc, doc, deleteDoc, setDoc } from 'firebase/firestore'
import { auth, firestore } from '../firebase'
import { useNavigate, Link } from 'react-router-dom'
import Select from 'react-select'

import { FiLogOut, FiTrash2 } from 'react-icons/fi'
import { HiOutlineMail, HiLockClosed, HiLockOpen, HiOutlineSaveAs } from 'react-icons/hi'
import toast, { Toaster } from "react-hot-toast";

const Account = () => {

  const [userData, setUserData] = useState(null);
  const [newUsername, setNewUsername] = useState(userData ? userData.username : "");
  const [newEmail, setNewEmail] = useState(userData ? userData.email : "");
  const [emailPw, setEmailPw] = useState(userData ? userData.email : "");
  const [newPassword, setNewPassword] = useState("");
  const [newSelectedDiet, setNewSelectedDiet] = useState(userData ? userData.dietPlan : "");

  const navigate = useNavigate();

  const successToast = (toastMessage) => toast.success(toastMessage)
  const errorToast = (errorMessage) => toast.error(errorMessage)

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
        backgroundColor: isFocused ? '#e86375' : '#68D6AC',
        color:  isFocused ? '#fff' : '#203354 ',
      };
    },
  };

  useEffect(() => {
    const getUsers = async () => {
      onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser) {
          const userSnapshot = await getDoc(doc(firestore, "users", currentUser.uid))
          console.log(userSnapshot.data())
          setUserData(userSnapshot.data());
        }
      })
    }

    getUsers();
    
  }, []);
  
  const handleSignOut = async () => {
    await signOut(auth);
    successToast("Logged out, See you soon !")
  }

  const handleDelete = async () => {
    await deleteDoc(doc(firestore, "users", auth.currentUser.uid));
    console.log("User information deleted")
    await deleteUser(auth.currentUser).then(() => {
      console.log("User deleted")
      successToast("Account was deleted successfully.")
    }).catch((error) => {
      errorToast(error.message)
    });
  }

  const handlePwChange = (e) => {
    e.preventDefault();
    if ((emailPw === auth.currentUser?.email) && (newPassword.length > 5)) {
      updatePassword(auth.currentUser, newPassword).then(() => {
        successToast("Password was changed, you can now use it when logging in.")
      }).catch((error) => {
        errorToast(error.message)
      });
    } else {
      errorToast("Email must be current email and password at least 5 charcters long");
    }
  }

  const handleUpdateInfo = (e) => {
        e.preventDefault();
        const docRef = doc(firestore, "users", auth.currentUser.uid);
        const data = {
          username: newUsername !== "" ? newUsername : userData.username,
          email: newEmail !== "" ? newEmail : userData.email,
          dietPlan: newSelectedDiet !== "" ? newSelectedDiet : userData.dietPlan,
        };
        setDoc(docRef, data, {merge:true})
        .then(() => {
          updateEmail(auth.currentUser, newEmail).then(() => {
            console.log("User updated");
            successToast("Account information was updated successfully")
          }).catch((error) => {
            errorToast(error.message)
          })
        }).catch((error) => {
          errorToast("Error updating information: ", error.message);
        });
  }

  function handleDiet(diet) {
    setNewSelectedDiet(diet);
  }

  return (
    <>
        <h1 id="titleSettings">Account Settings</h1>
        <div className="accSettingsFormCont">
          <div className="settingsForm">
            <div className="settingsFormBox">
              <form>
                <h3>General information</h3>
                <div className="settingsBoxInput">
                  <label htmlFor="name">Username:</label>
                  <input onChange={(event) => {setNewUsername(event.target.value)}} className="inputSettingsUserN" type="text" placeholder="Your new username" />
                </div> 
                <div className="settingsBoxInput">
                  <label htmlFor="email">Email:</label>
                  <div className="boxInputBox">
                    <div className="boxInputIcon">
                        <HiOutlineMail/>
                    </div>
                    <input onChange={(event) => {setNewEmail(event.target.value)}} type="text" placeholder="Your new email" />
                  </div>
                </div>
                <div className="settingsBoxInput">
                  <label htmlFor="diet-plan">Diet Plan:</label>
                  <Select
                    options={dietlist}
                    placeholder="Select your new dietplan"
                    value={newSelectedDiet}
                    onChange={handleDiet}
                    isSearchable={true}
                    styles={colourStyles}
                  />
                  <button className="goodActnBtn accSettingsFormbttn" onClick={handleUpdateInfo}><HiOutlineSaveAs/> Update Info</button><Toaster/>
                </div>
                <h3>Account security</h3>
                <div className="settingsBoxInput">
                  <label htmlFor="change password">Change Password:</label>
                  <label htmlFor="email">Email:</label>
                  <div className="boxInputBox">
                    <div className="boxInputIcon">
                        <HiOutlineMail/>
                    </div>
                    <input type="text" placeholder="Current Email" onChange={(event) => {setEmailPw(event.target.value)}} />
                  </div>
                  <label htmlFor="email">Password:</label>
                  <div className="boxInputBox">
                    <div className="boxInputIcon">
                        <HiLockOpen/>
                    </div>
                    <input type="password" placeholder="New Password" onChange={(event) => {setNewPassword(event.target.value)}}/>
                  </div>
                  <p>Forgot password ? <Link to="/recover-pw" className="linkBtnForms">Recover here</Link></p>

                  <button className="goodActnBtn accSettingsFormbttn" onClick={handlePwChange}><HiLockClosed/> Change Password</button><Toaster/>
                  <button className="accSettingsFormbttn" onClick={handleDelete}><FiTrash2/> Delete Account</button><Toaster/>
                </div>
              </form>
            </div>
          </div>
          <button className='accLogoutBttn' onClick={handleSignOut}><FiLogOut/> Sign Out</button><Toaster/>
        </div>
    </>
  )
}

export default Account
