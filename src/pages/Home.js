import React, {useEffect, useState} from 'react'
import '../styles/Home.css'

const Home = () => {
  const [recipe, setRecipe] = useState(null);

    useEffect(() => {
      const fetchUrl = 'https://api.spoonacular.com/recipes/random?number=1&apiKey=012a247f989042f8939939a8bb824cc3';
      const getRecipe = () => {
        fetch(
          fetchUrl
        )
        .then((response) => response.json())
        .then((data) => {
    
          setRecipe(data);
        })
        .catch(() => {
          console.log("Error occured while fetching recipes");
        })
      };
  
      getRecipe();
    }, []);

  return ( 
    <>
    <div className='pageWrapper'>
      <div className='headerHome'>
        <h2>Welcome to WonderMealz!</h2>
        <p id='intro'>Want to try something new? Find recipes you didn't even know existed or simply don't want to waste any ingredients you have laying around? Look no further, you have come to the right place.</p>
      </div>
      <div className='firstRecipe'>
        <div className='recipeInfo'>
          <h3>Recipe Finder</h3>
          <p>
            Don't know what to eat? Have some ingredients laying around and are wondering what you could cook with them? 
            Worry no more, our recipe finder is here to help you out!
            Simply select the ingredients you have at your disposal in the list and select the recipe of your choice.
            Start cooking and enjoy your delicious meal by yourself or with your family.
          </p>
          <a href="/recipe-finder">Go to Recipe Finder</a>
        </div>
        <img src={require("../assets/pizza-unsplash.webp")} alt='First recipe'/>
      </div>
      <div className='secondRecipe'>
        <img src={require("../assets/burger-unsplash.webp")} alt='Second Recipe'/>
          <div className='recipeInfo'>
            <h3>Meal-Generator</h3>
            <p>
              Need some inspiration? Following a specific diet and have no idea what you could eat today?
              Try out our meal-generator, get 3 delicious meals that fit your dietplan.
              Enjoy new delicious meals you've never tried before while still maintaining your diet.
              Who said a diet couldn't be enjoyable?
            </p>
            <a href="/meal-generator">Go to Meal Generator</a>
          </div>
      </div>
      <div className='firstRecipe'>
        <div className='recipeInfo'>
          <h3>{recipe?.recipes[0].title}</h3>
          <p>{recipe?.recipes[0].summary}</p>
          <a href={recipe?.recipes[0].sourceUrl}>Go to recipe</a>
        </div>
        <img src={recipe?.recipes[0].image} alt='First recipe'/>
      </div>
    </div>
    </>
  )
}

export default Home
