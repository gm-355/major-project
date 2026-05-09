let recipesData = [];
let currentCategory = "all";

// load the recipes from the JSON file
document.addEventListener("DOMContentLoaded", function () {
  fetch("recipes.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      recipesData = data;
      displayRecipes(recipesData);
      setButtons();
      setSearch();
    })
    .catch(function (error) {
      console.log("Error loading recipes:", error);
    });
});

// show recipe cards on the page
function displayRecipes(recipes) {
  let container = document.getElementById("recipeContainer");
  container.innerHTML = "";

  for (let i = 0; i < recipes.length; i++) {
    let ingredientsList = "";
    let instructionsList = "";

    for (let j = 0; j < recipes[i].ingredients.length; j++) {
      ingredientsList += "<li>" + recipes[i].ingredients[j] + "</li>";
    }

    for (let j = 0; j < recipes[i].instructions.length; j++) {
      instructionsList += "<li>" + recipes[i].instructions[j] + "</li>";
    }

    container.innerHTML += `
      <div class="recipe-card">
        <img src="${recipes[i].image}" alt="${recipes[i].name}">
        <p class="recipe-title">${recipes[i].name}</p>
        <p class="recipe-description">${recipes[i].shortDescription}</p>
        <p class="recipe-meta"><strong>Time:</strong> ${recipes[i].time}</p>
        <p class="recipe-meta"><strong>Difficulty:</strong> ${recipes[i].difficulty}</p>

        <details class="recipe-details">
          <summary>View Recipe</summary>

          <h3>Ingredients</h3>
          <ul>
            ${ingredientsList}
          </ul>

          <h3>Instructions</h3>
          <ol>
            ${instructionsList}
          </ol>
        </details>
      </div>
    `;
  }
}

// set up the category buttons
function setButtons() {
  let allBtn = document.getElementById("allBtn");
  let sweetBtn = document.getElementById("sweetBtn");
  let savoryBtn = document.getElementById("savoryBtn");

  allBtn.addEventListener("click", function () {
    currentCategory = "all";
    updateActiveButton(allBtn);
    displayRecipes(recipesData);
  });

  sweetBtn.addEventListener("click", function () {
    currentCategory = "sweet";
    updateActiveButton(sweetBtn);

    let sweetRecipes = [];
    
    for (let i = 0; i < recipesData.length; i++) {
      if (recipesData[i].category == "sweet") {
        sweetRecipes.push(recipesData[i]);
      }
    }

    displayRecipes(sweetRecipes);
  });

  savoryBtn.addEventListener("click", function () {
    currentCategory = "savory";
    updateActiveButton(savoryBtn);

    let savoryRecipes = [];

    for (let i = 0; i < recipesData.length; i++) {
      if (recipesData[i].category == "savory") {
        savoryRecipes.push(recipesData[i]);
      }
    }

    displayRecipes(savoryRecipes);
  });

  updateActiveButton(allBtn);
}

// highlight the selected category button
function updateActiveButton(activeBtn) {
  let allButtons = document.querySelectorAll(".category-buttons button");

  for (let i = 0; i < allButtons.length; i++) {
    allButtons[i].classList.remove("active-btn");
  }

  activeBtn.classList.add("active-btn");
}

// set up the search form
function setSearch() {
  let searchForm = document.getElementById("searchForm");

  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();

    let searchText = document.getElementById("searchBox").value.toLowerCase();
    let filteredRecipes = [];

    for (let i = 0; i < recipesData.length; i++) {
      let matchesCategory = false;
      let matchesSearch = false;

      if (currentCategory == "all") {
        matchesCategory = true;
      } else if (recipesData[i].category == currentCategory) {
        matchesCategory = true;
      }

      if (recipesData[i].name.toLowerCase().search(searchText) != -1) {
        matchesSearch = true;
      }

      if (matchesCategory && matchesSearch) {
        filteredRecipes.push(recipesData[i]);
      }
    }

    displayRecipes(filteredRecipes);
  });
}