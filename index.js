document.addEventListener('DOMContentLoaded', ()=>{
    fetchDrinks();
    createDrinks();
})

function fetchDrinks(){
    fetch("http://localhost:3000/drinks")
    .then(resp => resp.json())
    .then(drinks => loadDrinks(drinks))
}

function loadDrinks(drinks){
    let drinkMenu = document.getElementById('drink-menu');
    let sideMenu = document.createElement('table');
    let drinkDisplay = document.createElement('div');
    let displayMenu = document.getElementById('display-menu');

    drinks.forEach(drink=> {
        let drinkCard = document.createElement('div');
        drinkCard.setAttribute('class', 'card');

        let drinkName = document.createElement('h2');
        drinkName.setAttribute('hidden', true);
        drinkName.setAttribute('class', 'drink-name');
        drinkName.innerHTML = drink.name;

        let drinkPic = document.createElement('img');
        drinkPic.src = drink.image;
        drinkPic.setAttribute('class', 'drink-imgs')

        drinkCard.appendChild(drinkPic);
        drinkCard.appendChild(drinkName);
        drinkMenu.appendChild(drinkCard);

        sideMenu.setAttribute('id', 'side-menu');
        let sideMenuItem = document.createElement('tr');
        sideMenuItem.innerHTML = drink.name;
        sideMenu.appendChild(sideMenuItem);
        sideMenuItem.addEventListener('click', ()=>{
            drinkDisplay.textContent ='';
            createDrinkDisplay(drinkDisplay, displayMenu, drink);
        })

        drinkCard.addEventListener('mouseenter', ()=>{
            drinkName.removeAttribute('hidden');
            drinkPic.style.opacity = 0.5;
        })
        drinkCard.addEventListener('mouseleave', ()=>{
            drinkName.setAttribute('hidden', true);
            drinkPic.style.opacity = 1;
        })
        drinkCard.addEventListener('click', ()=>{
            drinkMenu.textContent="";
            createSideMenu(sideMenu, displayMenu);
            createDrinkDisplay(drinkDisplay, displayMenu, drink);
        })

    });
}

function createDrinks(){
    const addDrinksButton = document.getElementById("new-drink-btn");
    const drinkIntroForm = document.getElementById('add-drink-intro-form');
    const drinkIngredientsForm = document.getElementById('add-drink-ingredients-form');
    const drinkInstructionsForm = document.getElementById('add-drink-instructions-form');
    const wantMoreDrinksHeader = document.getElementById('want-more-drinks');
    addDrinksButton.addEventListener('click', ()=>{
        drinkIntroForm.removeAttribute('hidden');
        addDrinksButton.setAttribute('hidden', true);
        wantMoreDrinksHeader.setAttribute('hidden', true);
    })
    drinkIntroForm.addEventListener('submit', (e)=>{
        e.preventDefault();
        drinkIntroForm.setAttribute('hidden', true);
        drinkIngredientsForm.removeAttribute('hidden');
    })
    drinkIngredientsForm.addEventListener('submit',(e)=>{
        e.preventDefault();
        drinkIngredientsForm.setAttribute('hidden', true);
        drinkInstructionsForm.removeAttribute('hidden');
    })
    drinkInstructionsForm.addEventListener('submit', (e)=>{
        e.preventDefault();
        drinkIngredientsForm.setAttribute('hidden', true);
        drinkInstructionsForm.setAttribute('hidden', true)
        addDrinksButton.removeAttribute('hidden');
        wantMoreDrinksHeader.removeAttribute('hidden');
        alert('Great! Your drink has been added!');
    })
}

function createSideMenu(sideMenu, displayMenu){
    let menuHeader = document.createElement('tr');
    menuHeader.innerHTML = "Drink Menu"
    menuHeader.setAttribute('id', 'menu-header');
    sideMenu.prepend(menuHeader);
    displayMenu.append(sideMenu);
}

function createDrinkDisplay(drinkDisplay, displayMenu, drink){
    let displayName = document.createElement('h1');
    displayName.innerHTML = drink.name;
    displayName.setAttribute('class', 'display-names');

    let displayPic = document.createElement('img');
    displayPic.src = drink.image;
    displayPic.setAttribute('class', 'display-imgs');

    drinkDisplay.append(displayName, displayPic);
    drinkDisplay.setAttribute('id', 'drink-display');
    displayMenu.append(drinkDisplay);

    let ingredientsHeader = document.createElement('h3');
    ingredientsHeader.innerHTML = 'Ingredients'
    drinkDisplay.append(ingredientsHeader);

    let ingredients = Object.values(drink.recipe.ingredients);
    ingredients.forEach(ingredient => {
        let ingredientItem = document.createElement('li');
        ingredientItem.innerHTML = ingredient;
        drinkDisplay.append(ingredientItem);
    })

    let instructionsHeader = document.createElement('h3');
    instructionsHeader.innerHTML = 'Instructions'
    drinkDisplay.append(instructionsHeader);

    let instructionList = document.createElement('ol');
    drinkDisplay.append(instructionList);

    let instructions = Object.values(drink.recipe.instructions);
    instructions.forEach(step => {
        let stepItem = document.createElement('li');
        stepItem.innerHTML = step;
        instructionList.append(stepItem);
    })

    let likeButton = document.createElement('button');
    likeButton.innerHTML = 'Favorite';
    likeButton.setAttribute('class', 'opinion-button');

    let dislikeButton = document.createElement('button');
    dislikeButton.innerHTML = 'Not a Fan';
    dislikeButton.setAttribute('class', 'opinion-button');

    drinkDisplay.append(likeButton, dislikeButton);

}
