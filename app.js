$(document).ready(() => {
  const submitButton = $('#submit_btn');
  const display = $('#display');
  const clearButton = $('#btn_clear');

  submitButton.on('click', (event) => {
    event.preventDefault();
    const recipe = $('#recipe_name').val();
    let selectedOption = $('#myDropdown').val();
     
    const URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${recipe}`;
    const countryURL = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${recipe}`;
    const categoriesURL =`https://www.themealdb.com/api/json/v1/1/categories.php=${recipe}`;
    const ingredientURL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${recipe}`;   

    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        displayRecipeData(data);
      })
      .catch((error) => {
        console.log('Oops:', error);
      });

      if (selectedOption === "Ingredient") {
        fetch(categoriesURL);
      } else if (selectedOption === "Country") {
        fetch(countryURL);
      } else if (selectedOption === "Recipe name") {
        fetch(ingredientURL);
      }    
      else{
        console.log('Oops:', error);
      }
  });

  function displayCountryData(data) {
    display.empty();
    if (data.meals) {
  }
  const recipeContainer = $('<div class="recipe-container"></div>');

    data.meals.forEach((meal) => {
     const myCard = $(`<div class="recipe-card card">
     <div class="card-img-top">
       <h5 class="card-title recipe-name">${meal.strMeal}</h5>
       <img src="${meal.strMealThumb}" alt="Meal Image">
     </div>
     <div class="card-body">
     </div>
   </div>
 `);
    };
  function displayRecipeData(data) {
    display.empty();
    if (data.meals) {
      const recipeCardContainer = $('<div class="recipe-card-container"></div>');

      data.meals.forEach((meal) => {
        const recipeCard = $(`
          <div class="recipe-card card">
            <div class="card-img-top">
              <h5 class="card-title recipe-name">${meal.strMeal}</h5>
              <img src="${meal.strMealThumb}" alt="Meal Image">
            </div>
            <div class="card-body">
            </div>
          </div>
        `);
        recipeCard.find('.recipe-name').css({
          'font-size': '24px',
          'color': 'black',
          'text-align': 'center',
          'margin-bottom': '10px'
        });

        recipeCard.on('click', () => {
          display.empty();

          const ingredientsList = $(`
            <ul>
              <li>${meal.strIngredient1} : ${meal.strMeasure1}</li>
              <li>${meal.strIngredient2} : ${meal.strMeasure2}</li>
              <li>${meal.strIngredient3} : ${meal.strMeasure3}</li>
              <li>${meal.strIngredient4} : ${meal.strMeasure4}</li>
              <li>${meal.strIngredient5} : ${meal.strMeasure5}</li>
              <li>${meal.strIngredient6} : ${meal.strMeasure6}</li>
              <li>${meal.strIngredient7} : ${meal.strMeasure7}</li>
            </ul>
          `);

          const recipeDetails = $(`
            <div>
              <h1 class="recipe-title">${meal.strMeal}</h1>
              <img src="${meal.strMealThumb}" alt="Meal Image" width="500" height="500">
              <p>Category: ${meal.strCategory}</p>
              <p>Country: ${meal.strArea}</p>
              <p>Type of Food: ${meal.strTags}</p>
              <p>Ingredients:</p>
              ${ingredientsList.html()}
              <p>Recipe: ${meal.strInstructions}</p>
              <iframe width="500" height="500" src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}" 
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
          `);

          $('#myButton').click(function() {
            var selectedOption = $('#myDropdown').val();
            alert('Selected option: ' + selectedOption);
          });
          const recipeContainer = $('<div class="recipe-details"></div>').append(recipeDetails);

          display.append(recipeContainer);
          clearButton.show();
        });

        recipeCardContainer.append(recipeCard);
      });

      display.append(recipeCardContainer);
    } else {
      alert('Oops! No recipes found.');
    }
    clearButton.show();
  }

  clearButton.hide().on('click', (event) => {
    event.preventDefault();
    display.empty();
    clearButton.hide();
  });
});
