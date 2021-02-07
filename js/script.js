// base url
const baseUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s='

// add event listener on button 
document.getElementById('search-btn').addEventListener('click',()=>{
    let mealName = document.getElementById('meal-input').value.trim();

    // if user enter the meal name
    if(mealName){
        // send request for data
        fetch(baseUrl+mealName)
            .then(response=> response.json())
            .then(data => {
            // if meals not exist
            if(!data.meals){
                showNotFound(mealName);
            }else{
                showMeals(data.meals);
            }
            })
    }
    else{
        showNotFound(mealName);
    }

})

document.getElementById('meal-items-section').addEventListener('click',event=>{
    const h3 = event.target.parentNode.children['1'];
    
    if(h3.tagName == 'H3'){
        // send request
        fetch(baseUrl+h3.innerText)
        .then(response => response.json())
        .then(data =>{
            showIngredients(data.meals[0]);
        });
    }
})


// other functions
function showNotFound(mealName){
    document.getElementById('ingredients-section').style.display = 'none';
    document.getElementById('meal-items-section').style.display = 'none';
    document.getElementById('not-found-section').style.display = 'block';

    // if user can not provide the meal name
    if(!mealName){
        document.getElementById('error').innerText = 'Please enter the meal name.'
        document.getElementById('error-message').innerText= 'You can not provide meal name in the search box.Please enter the meal name';
        document.getElementById('emoji').className = 'fas fa-search';
    }else{
        document.getElementById('error').innerText = 'Oops! This meal is not cocking!'
        document.getElementById('error-message').innerText= 'Please search another meal.';
        document.getElementById('emoji').className = 'far fa-frown';
    }
}


function showMeals(mealList){
    // track mealsContainer and clear it.
    const mealsContainer = document.getElementById('meal-items-section');
    mealsContainer.innerHTML = '';

    // display none not-found-section and ingredients-section
    document.getElementById('not-found-section').style.display = 'none';
    document.getElementById('ingredients-section').style.display = 'none';

    // show meal inside the mealsContainer
    mealList.forEach(meal => {
        const  mealCard = createMealCard(meal.strMeal,meal.strMealThumb);
        mealsContainer.appendChild(mealCard);
        mealsContainer.style.display = 'grid';
    });

}


function createMealCard(mealName,mealImage){
    // create element
    const mealDiv = document.createElement('div');
    const mealImg = document.createElement('img');
    const mealH3 = document.createElement('h3');

    // set class and attribute
    mealDiv.className = 'item';
    mealImg.src = mealImage;
    mealImg.alt = mealName;
    mealH3.innerText = mealName;

    // join fragment
    mealDiv.appendChild(mealImg);
    mealDiv.appendChild(mealH3);

    return mealDiv
}

function showIngredients(meal){
    // track ingredients-section section and update
    document.getElementById('ingredients-section').style.display = 'block';
    document.getElementById('target-meal-img').src = meal.strMealThumb;
    document.getElementById('food-name').innerText = meal.strMeal;

    // upade ingredients
    const ingredientsContainer = document.getElementById('igredients');
    ingredientsContainer.innerHTML = '';
    const ingredientsList = getIngredients(meal);
    ingredientsList.forEach(item=>{
        ingredientsContainer.appendChild(item);
    })

}

function getIngredients(meal){
    const ingredientsNameList = [];

    for( let i = 1; i <=20;i++){
        const ingredient = meal[`strIngredient${i}`];

        // if ingredient null or  '' empty string 
        if(!ingredient){
            break;
        }
        else{
            const measureOfIngredient = meal[`strMeasure${i}`];
            const listItem = createListItem(ingredient,measureOfIngredient);
            ingredientsNameList.push(listItem);
        }        
    }

    return ingredientsNameList;
}

function createListItem(ingredient,measurement){
    // create element
    let p = document.createElement('p');
    let icon = document.createElement('i');
    let span = document.createElement('span');

    // set class name and value
    icon.className = 'fas fa-shopping-basket';
    span.innerText = measurement.trim() +' ' + ingredient;
    
    // appenchild
    p.appendChild(icon);
    p.appendChild(span);
    return p;
}