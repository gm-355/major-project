let recipesData = [];

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
    })
    .catch(function (error) {
      console.log("Error loading recipes:", error);
    });
});

function displayRecipes(recipes) {
  let container = document.getElementById("recipeContainer");
  container.innerHTML = "";

  for (let i = 0; i < recipes.length; i++) {
    container.innerHTML += `
      <div class="recipe-card">
        <img src="${recipes[i].image}" alt="${recipes[i].name}">
        <p class="recipe-title">${recipes[i].name}</p>
        <p class="recipe-description">${recipes[i].shortDescription}</p>
      </div>
    `;
  }
}

function setButtons() {
  let allBtn = document.getElementById("allBtn");
  let sweetBtn = document.getElementById("sweetBtn");
  let savoryBtn = document.getElementById("savoryBtn");

  allBtn.addEventListener("click", function () {
    displayRecipes(recipesData);
  });

  sweetBtn.addEventListener("click", function () {
    let sweetRecipes = [];

    for (let i = 0; i < recipesData.length; i++) {
      if (recipesData[i].category == "sweet") {
        sweetRecipes.push(recipesData[i]);
      }
    }

    displayRecipes(sweetRecipes);
  });

  savoryBtn.addEventListener("click", function () {
    let savoryRecipes = [];

    for (let i = 0; i < recipesData.length; i++) {
      if (recipesData[i].category == "savory") {
        savoryRecipes.push(recipesData[i]);
      }
    }

    displayRecipes(savoryRecipes);
  });
}