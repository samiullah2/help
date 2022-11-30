import React, {useState, useEffect} from 'react'

export default function Meal({meal}) {
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        fetch(
            `https://api.spoonacular.com/recipes/${meal.id}/information?apiKey=075d827095ae4832835c9c0b0d282448&includeNutrition=false`
        )
        .then((response) => response.json())
        .then((data) => {
            setImageUrl(data.image);
        })
        .catch(() => {
            console.log('Error occured while fetching image url');
        })
    }, [meal.id])

  return (
    <article>
        <h1>{meal.title}</h1>
        <img src={imageUrl} alt="Final Result" />
        <ul className='instructions'>
            <li>Preparation time: {meal.readyInMinutes} min. </li>
            <li>Number of servings: {meal.servings} </li>
        </ul>

        <a className='goToRecipe' href={meal.sourceUrl}> Go to Recipe</a>
    </article>
  )
}
