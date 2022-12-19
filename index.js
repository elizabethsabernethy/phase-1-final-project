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
    const drinkMenu = document.getElementById('drink-menu');

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

        let displayName = document.createElement('h1');
        displayName.innerHTML = drink.name;
        displayName.setAttribute('class', 'display-names');

        let displayPic = document.createElement('img');
        displayPic.src = drink.image;
        displayPic.setAttribute('class', 'display-imgs');

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