const meals = document.getElementById('meals');

getRandomMeal();
fetchFavouriteMeals();

async function getRandomMeal(){
   const res = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
   const resData = await res.json()
   const randomMeals = resData.meals[0]
   console.log(randomMeals);

   addMeal(randomMeals, true);
}

async function getMealById(id) {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const resData = await res.json();
    const meal = resData.meals[0]
    return meal
}

async function mealSearch(name){
    const search = await  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
}

function addMeal(mealData, random=false){
    const meal = document.createElement('div');
    meal.classList.add('meal')
    meal.innerHTML = `
        <div class="meal__header">
            ${random ? `<span class="random">Random Meal</span>` : ''}
            <img src=${mealData.strMealThumb} alt=${mealData.strMeal}>
        </div>
        <div class="meal__body">
            <h4>${mealData.strMeal}</h4>
            <button class="fav__btn">
                <i class="fas fa-heart"></i>
            </button>
        </div>
    `;

    meals.appendChild(meal);

   const btn = meal.querySelector('.meal__body .fav__btn')
   btn.addEventListener('click', () => {
        /* btn.classList.toggle('active'); */
        if(btn.classList.contains('active')){
            btn.classList.remove('active');
            removeMealfromLocalStorage(mealData.idMeal)
        }
        else{
            btn.classList.add('active');
            addToLocalStorage(mealData.idMeal);
        }
    });
}

function addMealToFavourite(meal){}

function addToLocalStorage(meal){
    console.log(meal)
    const meals = getMealsFromLocalStorage();

    localStorage.setItem('meals', JSON.stringify([...meals, meal]));
}

function getMealsFromLocalStorage(){
    const meals = JSON.parse(localStorage.getItem('meals'));

   return meals === null ? [] : meals
}

function removeMealfromLocalStorage(passedMeal){
    const meals = getMealsFromLocalStorage();

    localStorage.setItem('meals',JSON.stringify(meals.filter(meal => meal !== passedMeal)));
}

async function fetchFavouriteMeals(){
    const mealIds = getMealsFromLocalStorage();
    const meals = []

    for (let i=0; i < meals.length; i++){
        const mealID = meals[i];
        const meal = await getMealById(mealID);
        meals.push(meal);
    }
    console.log(meals)
}