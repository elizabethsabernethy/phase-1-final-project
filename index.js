document.addEventListener('DOMContentLoaded', ()=>{
    fetchDrinks();
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