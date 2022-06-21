
import './App.css';
import { useEffect, useState } from 'react';
import  video from './food.mp4';
import icon from './icon.png';
import MyRecipesComponent from './MyRecipesComponent';

const MY_ID ='f7fd4236';
const API_KEY ='b32fcf0637179436998e66fa9748ec86';

function App(){

  const [mySearch, setMySearch] = useState ( "" );
  const [myRecipe, setMyRecipe] = useState ( [] );
  const [wordSubmitted, setWordSubmitted]=useState('avocado')
  
 
 useEffect(async() => {
   const response = await fetch(`https://api.edamam.com/search?q=${wordSubmitted}&app_id=${MY_ID}&app_key=${API_KEY}`);
   const data = await response.json();
   console.log (data.hits);
   setMyRecipe(data.hits);

 }, [wordSubmitted])

 const myRecipeSearch = (e) =>{
   setMySearch(e.target.value)
  }
  const finalSearch = (e)=>{
    e.preventDefault();
    setWordSubmitted(mySearch);
    
  }

 return(

  <div className="App">
   <div className="container">
  <video autoPlay muted loop>
   <source src={video} type="video/mp4" />
</video>
  <h1>Find a Recipe</h1>
  </div>
 

<div className="container">
  <form onSubmit={finalSearch}>
    <input className='search' placeholder='Search...' onChange={myRecipeSearch}  value={mySearch}  ></input>
  </form>
 
    <button onClick={finalSearch}> <img src={icon} className='icon' width='30px' alt='icon' /></button>
  </div>

  {myRecipe.map (element =>(
    <MyRecipesComponent label={element.recipe.label} image={element.recipe.image} calories={element.recipe.calories} ingredients={element.recipe.ingredientLines}/>
  ))}
     </div> 
    
 );

}  
  


export default App;
