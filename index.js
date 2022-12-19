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
    let menu = document.getElementById("drink-menu");
    drinks.forEach(drink=> {
        console.log(drink);
        let drinkPic = document.createElement('img');
        drinkPic.src = drink.image;
        drinkPic.setAttribute('class', 'drink-imgs')
        let drinkSpot = document.createElement('td');
        drinkSpot.appendChild(drinkPic);
        drinkSpot.addEventListener('mouseover',()=>{
            let drinkName = document.createElement('h3');
            drinkName.innerHTML = drink.name;
            drinkName.setAttribute('class','drink-names');
            drinkSpot.appendChild(drinkName);
        })
        menu.appendChild(drinkSpot);
    });
}

function createDrinks(){
    const addDrinksButton = document.getElementById("new-drink-btn");
    const drinkIntroForm = document.getElementById('add-drink-intro-form');
    const drinkIngredientsForm = document.getElementById('add-drink-ingredients-form');
    const drinkInstructionsForm = document.getElementById('add-drink-instructions-form');
    addDrinksButton.addEventListener('click', ()=>{
        drinkIntroForm.removeAttribute('hidden');
        addDrinksButton.setAttribute('hidden', true);
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
        alert('Great! Your drink has been added!');
    })
}