document.addEventListener("DOMContentLoaded", function () {
  fetch("recipes.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      displayRecipes(data);
    })
    .catch(function (error) {
      console.log("Error loading recipes:", error);
    });
});

function displayRecipes(recipes) {
  const container = document.getElementById("recipeContainer");
  container.innerHTML = "";

  for (let i = 0; i < recipes.length; i++) {
    container.innerHTML += `
      <div class="recipe-card">
        <img src="${recipes[i].image}" alt="${recipes[i].name}">
        <p class="recipe-title">${recipes[i].name}</p>
      </div>
    `;
  }
}