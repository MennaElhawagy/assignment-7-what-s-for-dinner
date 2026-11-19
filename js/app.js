/* =========================================================
   What's For Dinner — App logic
   ---------------------------------------------------------
   `meals` (the array of meal objects) comes from js/meals.js
   ========================================================= */

const LONG_MEAL_MINUTES = 45; // show the warning when totalTime is more than this

let lastIndex = -1; // index of the meal shown last time

/* ---------- Pick a random meal (never the same one twice in a row) ---------- */
function getRandomMeal() {
  if (meals.length <= 1) return meals[0];

  let index;
  do {
    index = Math.floor(Math.random() * meals.length);
  } while (index === lastIndex);

  lastIndex = index;
  return meals[index];
}

/* ---------- Show a meal on the page ---------- */
function displayMeal(meal) {
  // Name, description, image
  document.getElementById("recipe-name").textContent = meal.name;
  document.getElementById("recipe-description").textContent = meal.description;

  const image = document.getElementById("recipe-image");
  image.src = meal.imgCover;
  image.alt = meal.name;

  // Rating
  document.getElementById("rating-average").textContent = meal.ratingsAverage;
  document.getElementById("rating-quantity").textContent = `(${meal.ratingsQuantity} reviews)`;

  // Prep / Cook / Servings
  document.getElementById("prep-time-display").textContent = meal.prepTime;
  document.getElementById("cook-time-display").textContent = meal.cookTime;
  document.getElementById("servings-display").textContent = meal.servings;

  // Badges
  document.getElementById("difficulty-badge").textContent = meal.difficulty;
  document.getElementById("category-badge").textContent = meal.category;

  displayIngredients(meal.ingredients);
  displayInstructions(meal.instructions);
  displayNutrition(meal.nutrition);
  displayTips(meal.tips);

  // Warning for long recipes
  const timeWarning = document.getElementById("time-warning");
  if (meal.totalTime > LONG_MEAL_MINUTES) {
    timeWarning.classList.remove("hidden");
  } else {
    timeWarning.classList.add("hidden");
  }

  // Start every tab at the top for the new meal
  document.querySelectorAll(".tab-content").forEach((tab) => (tab.scrollTop = 0));

  // The section is hidden until the first meal is ready
  document.getElementById("recipe-display-section").classList.remove("hidden");
}

function displayIngredients(ingredients) {
  const list = document.getElementById("ingredients-list");
  list.innerHTML = "";

  ingredients.forEach((ingredient, index) => {
    const li = document.createElement("li");
    li.className = "flex items-start";
    li.innerHTML = `
      <div class="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5 mr-3 flex-shrink-0">${index + 1}</div>
      <span class="text-gray-700">${ingredient}</span>
    `;
    list.appendChild(li);
  });
}

function displayInstructions(instructions) {
  const list = document.getElementById("instructions-list");
  list.innerHTML = "";

  instructions.forEach((step, index) => {
    const div = document.createElement("div");
    div.className = "flex items-start";
    div.innerHTML = `
      <div class="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center text-white text-xl font-bold mr-4 flex-shrink-0">${index + 1}</div>
      <div class="flex-1 pt-2">
        <p class="text-gray-700">${step}</p>
      </div>
    `;
    list.appendChild(div);
  });
}

function displayNutrition(nutrition) {
  document.getElementById("calories-value").textContent = nutrition.calories;
  document.getElementById("protein-value").textContent = nutrition.protein;
  document.getElementById("carbs-value").textContent = nutrition.carbs;
  document.getElementById("fat-value").textContent = nutrition.fat;
  document.getElementById("fiber-value").textContent = nutrition.fiber;
  document.getElementById("sodium-value").textContent = nutrition.sodium;
}

function displayTips(tips) {
  const list = document.getElementById("tips-list");
  list.innerHTML = "";

  tips.forEach((tip) => {
    const div = document.createElement("div");
    div.className = "flex items-start p-4 bg-amber-50 rounded-xl border-l-4 border-amber-400";
    div.innerHTML = `
      <i class="fa-solid fa-check-circle text-amber-600 text-xl mr-3 mt-1"></i>
      <p class="text-gray-700">${tip}</p>
    `;
    list.appendChild(div);
  });
}

/* ---------- Tabs ---------- */
const tabButtons = document.querySelectorAll(".tab-button");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const tabName = this.getAttribute("data-tab");

    // Make every tab button inactive
    tabButtons.forEach((btn) => {
      btn.classList.remove("text-orange-600", "border-orange-600");
      btn.classList.add("text-gray-500", "border-transparent");
    });

    // Make the clicked one active
    this.classList.remove("text-gray-500", "border-transparent");
    this.classList.add("text-orange-600", "border-orange-600");

    // Show only the matching content
    tabContents.forEach((content) => content.classList.add("hidden"));
    document.getElementById(tabName + "-tab").classList.remove("hidden");
  });
});

/* ---------- "Try Another Recipe" button ---------- */
document.getElementById("try-another-btn").addEventListener("click", function () {
  displayMeal(getRandomMeal());
  document.getElementById("recipe-display-section").scrollIntoView({ behavior: "smooth" });
});

/* ---------- Mobile menu ---------- */
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

mobileMenuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");

  // Switch the icon between ☰ and ✕
  const menuIcon = mobileMenuBtn.querySelector("i");
  if (menuIcon.classList.contains("fa-bars")) {
    menuIcon.classList.replace("fa-bars", "fa-xmark");
  } else {
    menuIcon.classList.replace("fa-xmark", "fa-bars");
  }
});

/* ---------- Start: show a random meal ---------- */
displayMeal(getRandomMeal());
