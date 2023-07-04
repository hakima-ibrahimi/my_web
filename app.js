$(document).ready(() => {
  const submitButton = $('#submit_btn');
  const display = $('#display');
  const clearButton = $('#btn_clear');

  submitButton.on('click', (event) => {
    event.preventDefault();
    const recipe = $('#recipe_name').val();

    const URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${recipe}`;

    console.log(recipe);

    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        displayRecipeData(data);
      })
      .catch((error) => {
        console.log('Oops:', error);
      });
  });

  function displayRecipeData(data) {
    display.empty();
    if (data.meals) {
      const row = $('<div class="row"></div>');

      data.meals.forEach((meal) => {
        const recipeCard = $(`
          <div class="col-12 col-sm-6 col-md-4 col-lg-3 recipe-card">
            <div class="card">
              <img class="card-img-top" src="${meal.strMealThumb}" alt="Meal Image">
              <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <button class="btn btn-primary show-details">Show Details</button>
              </div>
            </div>
          </div>
        `);

        recipeCard.find('.show-details').on('click', () => {
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
              <h1>${meal.strMeal}</h1>
              <img src="${meal.strMealThumb}" alt="Meal Image" width="500" height="500">
              <p>Category: ${meal.strCategory}</p>
              <p>Country: ${meal.strArea}</p>
              <p>Id: ${meal.idMeal}</p>
              <p>Type of Food: ${meal.strTags}</p>
              <p>Ingredients:</p>
              ${ingredientsList.html()}
              <p>Recipe: ${meal.strInstructions}</p>
              <iframe width="500" height="500" src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}" 
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
          `);

          const recipeContainer = $('<div class="col-12 col-sm-6 col-md-8"></div>').append(recipeDetails);

          display.append($('<div class="row"></div>').append(recipeCard, recipeContainer));

          clearButton.show();
        });

        row.append(recipeCard);
      });

      display.append(row);
    } else {
      display.append('<p>Oops! No recipes found.</p>');
    }
    clearButton.show();
  }

  clearButton.hide().on('click', (event) => {
    event.preventDefault();
    display.empty();
    clearButton.hide();
  });
});
