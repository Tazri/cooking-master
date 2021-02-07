<h1>This project for programming hero assignment 5</h1>
<p>This is simple project where show the meal and meals ingredients.This project for api practicing.In this project I use themealdb api.</p>

<h2>The Meal Api</h2>
<p>I use two api link from the meal api.</p>

<ul>
    <li>It use for Search => https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast</li>
    <li>It use for Search =>  https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata </li>
</ul>

<h2>Function Details</h2>

<h3>showNotFound() Function</h3>
<p>showNotFound function first take one string as a argument. If string is empty or undefined so in that case it do two work. if string is empty it show meassgae for write something inside the input.If it undefined it show message for the meal is not cooking.</p>

<h3>showMeals(meals as array) function</h3>
<p>It take a object of array as a argument. this object of come from server. create meal card and add name and add inside the meal-items-section.And then it set this section display style to grid.</p>

<h3>createMealCard(meal name,meal img) function</h3>
<p>This function create create meal card and return it.</p>