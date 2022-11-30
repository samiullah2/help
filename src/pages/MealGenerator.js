import React, {useState, useEffect} from 'react'
import MealList from '../components/Mealgenerator/MealList'
import '../styles/Pages.css'
import '../styles/MealGenerator.css'
import { onAuthStateChanged } from 'firebase/auth'
import { getDoc, doc } from 'firebase/firestore'
import { auth, firestore } from '../firebase'

const MealGenerator = () => {
  const [calories, setCalories] = useState(2000);
  const [userData, setUserData] = useState(null);
  const [mealData, setMealData] = useState(null);
  const [fetchUrl, setFetchUrl] = useState(`https://api.spoonacular.com/mealplanner/generate?apiKey=075d827095ae4832835c9c0b0d282448&timeFrame=day&targetCalories=${calories}`);

  function getMealData() {
    console.log(calories, fetchUrl)
    fetch(
      fetchUrl
    )
    .then((response) => response.json())
    .then((data) => {
      setMealData(data);
      console.log(data);
    })
    .catch(() => {
      console.log("Error occured while fetching mealplan");
    })
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userSnapshot = await getDoc(doc(firestore, "users", currentUser.uid))
        console.log(userSnapshot.data())
        setUserData(userSnapshot.data());
        setFetchUrl(`https://api.spoonacular.com/mealplanner/generate?apiKey=075d827095ae4832835c9c0b0d282448&timeFrame=day&targetCalories=${calories}&diet=${userSnapshot.data().dietPlan.value}`)
      }
    })
  }, []);
  
  useEffect(() => {
    setFetchUrl(`https://api.spoonacular.com/mealplanner/generate?apiKey=075d827095ae4832835c9c0b0d282448&timeFrame=day&targetCalories=${calories}`)
  }, [calories]);
  

  return (
    <div className='mealGeneratorCont'>
        <h1>Meal Generator</h1>
        <h3>Current diet plan: {userData ? userData.dietPlan.label : 'Log in to for custom plan'}</h3>
        <section className="controls">
          <input 
          type="number"
          placeholder='Calories (e.g. 2000)' 
          onChange={(event) => {setCalories(event.target.value)}}
          />
        </section>
        <button onClick={getMealData}>Get Daily Meal Plan</button>
        {mealData && <MealList mealData={mealData} />}
    </div>
  )
}
export default MealGenerator