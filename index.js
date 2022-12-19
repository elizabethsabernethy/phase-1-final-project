document.addEventListener('DOMContentLoaded', ()=>{
    fetchDrinks();
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
        makeADrink(drink, drinkMenu, sideMenu, drinkDisplay, displayMenu);
    });
    createDrinks(drinks, drinkMenu, sideMenu, drinkDisplay, displayMenu);
}


function makeADrink(drink, drinkMenu, sideMenu, drinkDisplay, displayMenu){
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
}

function createDrinks(drinks, drinkMenu, sideMenu, drinkDisplay, displayMenu){
    const addDrinksButton = document.getElementById("new-drink-btn");
    const drinkIntroForm = document.getElementById('add-drink-intro-form');
    const drinkIngredientsForm = document.getElementById('add-drink-ingredients-form');
    const drinkInstructionsForm = document.getElementById('add-drink-instructions-form');
    const wantMoreDrinksHeader = document.getElementById('want-more-drinks');

    addDrinksButton.addEventListener('click', ()=>{
        drinkIntroForm.removeAttribute('hidden');
        addDrinksButton.setAttribute('hidden', true);
        wantMoreDrinksHeader.setAttribute('hidden', true);
        displayMenu.textContent='';
        drinkMenu.textContent='';
    })
    drinkIntroForm.addEventListener('submit', (e)=>{
        e.preventDefault();
        drinkIntroForm.setAttribute('hidden', true);
        drinkIngredientsForm.removeAttribute('hidden');
    })
    drinkIngredientsForm.addEventListener('submit',(e)=>{
        e.preventDefault();
        drinkIngredientsForm.setAttribute('hidden', true);
        if(document.getElementById('yes-mocktail').checked){
           let mockForm = document.getElementById('add-mocktail-form');
           mockForm.removeAttribute('hidden');
           mockForm.addEventListener('submit', (e)=>{
            e.preventDefault();
            mockForm.setAttribute('hidden', true);
            drinkInstructionsForm.removeAttribute('hidden');
           })
        }
        else if(document.getElementById('no-mocktail').checked){
            drinkInstructionsForm.removeAttribute('hidden');
        }
    })
    drinkInstructionsForm.addEventListener('submit', (e)=>{
        e.preventDefault();
        drinkIngredientsForm.setAttribute('hidden', true);
        drinkInstructionsForm.setAttribute('hidden', true)
        addDrinksButton.removeAttribute('hidden');
        wantMoreDrinksHeader.removeAttribute('hidden');
        addDrink(drinkMenu, sideMenu, drinkDisplay, displayMenu, drinkIntroForm, drinkIngredientsForm, drinkInstructionsForm);
        alert('Great! Your drink has been added!');
        loadDrinks(drinks);
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

    let mocktailButton = document.createElement('button');
    let mockDiv = document.createElement('div');
    let hideMockButton = document.createElement('button');
    hideMockButton.setAttribute('class', 'opinion-button');
    hideMockButton.innerHTML = 'Hide Mocktail Subsitutes';
    mockDiv.setAttribute('id', 'mock-div');
    mocktailButton.innerHTML = 'Mocktail Subsitutes';
    mocktailButton.setAttribute('class', 'opinion-button');
    mocktailButton.addEventListener('click', ()=>{
        let mockHeader = document.createElement('h4');
        mockHeader.innerHTML = "Replace the alcohol in the orginial recipe with the alternative(s) below"
        mockDiv.append(mockHeader);
        mocktailSelector(drink, drinkDisplay, mockDiv);
        mocktailButton.setAttribute('disabled', true);
        mockDiv.append(hideMockButton);
        })
        hideMockButton.addEventListener('click', ()=>{
            mockDiv.textContent='';
            mocktailButton.removeAttribute('disabled');
        })
        mocktailButton.removeAttribute('disabled');
        if(drink.mocktail){
        drinkDisplay.append(mocktailButton);
        }
}

function addDrink(drinkMenu, sideMenu, drinkDisplay, displayMenu, drinkIntroForm, drinkIngredientsForm, drinkInstructionsForm){
    let newDrink = {
        "name": document.querySelector('[name="name"]').value,
      "image": document.querySelector('[name="image"]').value,
      "recipe": {
        "ingredients": {
          "1": document.querySelector('[name="ingredient-1"]').value,
          "2": document.querySelector('[name="ingredient-2"]').value,
        },
        "instructions": {
          "Step 1": document.querySelector('[name="instruction-1"]').value,
          "Step 2": document.querySelector('[name="instruction-2"]').value,
        }
      }
    };
    // if(document.querySelector('[name="ingredient-3"]').value){
    //     newDrink.recipe.ingredients
    // }
    if(document.getElementById('yes-mocktail').checked){
       newDrink.mocktail = {
        "ingredient-1": document.querySelector('[name="mocktail-ingredient-1"]').value,
        "ingredient-2": document.querySelector('[name="mocktail-ingredient-2"]').value,
        "ingredient-3": document.querySelector('[name="mocktail-ingredient-3"]').value
       }
      }

    fetch('http://localhost:3000/drinks', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
            'Accept':'application/json'
        },
        body: JSON.stringify(newDrink)
    })
    .then(resp => resp.json())
    .then(newDrink => makeADrink(newDrink, drinkMenu, sideMenu, drinkDisplay, displayMenu))
}

function mocktailSelector(drink, drinkDisplay, mockDiv){
    let mockIngredients = Object.values(drink.mocktail);
    mockIngredients.forEach(mockIngredient => {
        let ingredientItem = document.createElement('li');
        ingredientItem.innerHTML = mockIngredient;
        mockDiv.append(ingredientItem);
        drinkDisplay.append(mockDiv);
    })
}