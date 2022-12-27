# Phase 1 Final Project: Drink City

This project implements HTML to structure the website, JavaScript to create the functionality, and CSS to style it. There is also a self-contained JSON database to retrive and add data.

## Purpose of Project

The purpose of this website is to display drinks in an interactive display, and allow users to select a drink to view the recipe, as well as add a drink and associated recipe to the website. 

When a user first enters the website, they will see the interactive drink menu, which is postioned below an 'Add a new drink!' button. The drink menu shows images of drinks in a grid pattern. When a user hovers over a particular drink image, the name of the drink appears, offering more clarity as to which drink they are selecting. The user can select a drink by clicking on the cooresponding drink picture. In doing this, the page is cleared and a left side menu appears listing the drinks, in addition to the specific drink that was selected being pulled up on the right side of the page. The drink display shows the drink name, a larger image of the drink, and the recipe below that (listed as ingredients then mixing steps).  

Additonally, some drinks have an alternate for the alcoholic ingredients which can be viewed by clicking the 'Mocktail Subsitutes' button displayed below the drink recipe. If the user decides to no longer view the mocktail ingredients, they can hide them by clicking the cooresponging 'Hide Mocktail Subsitutes' button. Futhermore the drinks that have these non-alcoholic alternatives are denoted by a * after the name, as seen in the interactive menu, side menu, and display name. The wesbite also has a note at the top of the page indicating to users what the * represents. 

The final feature of the website allows a user to add a drink if they so choose; which can be achieved by pressing the 'Add a new drink!' button. Once clicked, the page is cleared expect for the form in which the user can add a drink. The first section prompts the user for a drink name, and image url, as well as a selection of whether or not the drink is mocktailable (meaning it has non-alcoholic subsitutes). Once this section is complete and the user selects the next button, an ingredients form will appear allowing the user to add up to 6 ingredients. Following this, if the user selected 'Yes' to the mocktailable question, a form for adding up to 3 mocktail ingredients can be added. If 'No' was selected instead, it will take the user directly to add up to 5 steps for mixing the drink, bypassing the mockatil ingredients form. The user can then add the drink to the database, and the new drink will appear in the interactive menu with the others. When the newly altered menu appears, the user should see that the add drink button has been hidden, allowing only one drink to be added at a time. The other website features should operate as normal with the exception of the 'Add a new drink!' form. If a user wishes to add a new drink after already adding one, the page will need to be refreshed. 

## Original Database Image/ Recipe Sources
### Tom Collins
Image via [liquor.com](https://www.liquor.com/thmb/tgWPQqsyM7-TFAA7vw_0h7aZszY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__liquor__2019__04__03080950__Tom-Collins-720x720-recipe-e87bf7954cdb4438b5e8d21f568cdd6f.jpg)


