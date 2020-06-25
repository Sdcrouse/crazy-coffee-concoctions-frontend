const BASE_URL = "http://localhost:3000/api/v1/concoctions";

document.addEventListener("DOMContentLoaded", function() {
  const newConcoctionButton = document.querySelector('nav button');
  const mainContainer = document.getElementById('main-container');
  const concoctionForm = mainContainer.querySelector('form');  
  const newConcoctionHTML = mainContainer.innerHTML;
  // By default, the main-container has the Concoction form when the page is loaded.

  getConcoctions();
  concoctionForm.addEventListener('submit', createConcoction);

  newConcoctionButton.addEventListener('click', function() {
    mainContainer.innerHTML = newConcoctionHTML;

    mainContainer.querySelector('form').addEventListener('submit', createConcoction);
    // This fixes a tricky bug: In this case, mainContainer.querySelector('form') !== concoctionForm!
  });
});

function getConcoctions() {
  fetch(BASE_URL)
    .then(resp => resp.json())
    .then(concoctionsJson => {
      const concoctionsList = document.querySelector('nav select');

      concoctionsJson.forEach(concoctionJson => addConcoctionToList(concoctionsList, concoctionJson, concoctionJson.name));
    
      concoctionsList.addEventListener("change", function(event) {
        // Display selected concoction, unless "Saved Concoctions" or a concoction with an invalid id is chosen.
        if(event.target.value) { getConcoction(event.target.value) }
      });
    })
    .catch(error => console.log(`Oops! Something's not right here: ${error}`));
}

function addConcoctionToList(concoctionsList, concoctionJson, concoctionName) {
  const concoctionOption = Shared.newElementWithText('option', concoctionName);

  concoctionOption.setAttribute("value", concoctionJson.id);
  concoctionsList.append(concoctionOption);
}

function getConcoction(concoctionId) {
  fetch(`${BASE_URL}/${concoctionId}`)
    .then(resp => resp.json())
    .then(concoctionJson => displayConcoction(concoctionJson))
    .catch(error => console.log(`Something went wrong here: ${error}`));
}

function displayConcoction(concoctionJson) {
  const concoction = new Concoction(concoctionJson.data.id, concoctionJson.data.attributes, concoctionJson.included);
  
  const mainContainer = document.getElementById('main-container'); // The main container that will display the concoction
  const nameWrapper = concoction.nameWrapper(); // Wrapper for the concoction's name
  const attrsWrapper = document.createElement('div'); // Wrapper for the concoction attributes other than "name"

  mainContainer.innerHTML = ""; // Empty the mainContainer before appending anything to it.

  attrsWrapper.append(
    ...Coffee.labeledCoffeeList(concoction.coffees),
    ...Ingredient.labeledIngredientLists(concoction.ingredients)
  );
  concoction.appendAttributes(attrsWrapper, "Instructions", "Notes");

  mainContainer.append(nameWrapper, attrsWrapper); // Finally, append the two wrappers to the mainContainer.
}

function createConcoction(event) {
  let formData = {
    concoction: getConcoctionData(event.target)
  }

  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  };
  
  event.preventDefault();

  fetch(BASE_URL, configObj)
    .then(resp => resp.json())
    .then(function(concoctionJson) {
      const concoctionsList = document.querySelector('nav select');
      const concoction = concoctionJson.data;

      addConcoctionToList(concoctionsList, concoction, concoction.attributes.name);
      displayConcoction(concoctionJson);
    })
    .catch(error => console.log(`Well, THAT didn't work! Here's the problem: ${error}`));
}

function getConcoctionData(concForm) {
  let concData = {};

  concData.name = concForm.querySelector('#concoction_name').value;
  concData.instructions = concForm.querySelector('#instructions').value;

  let notes = concForm.querySelector('#notes').value;
  if(notes) {concData.notes = notes}; // Edge case

  concData.coffees_attributes = getCoffeeData();
  concData.ingredients_attributes = getIngredientData();

  return concData;
}

function getCoffeeData() {
  const coffeeLis = document.querySelectorAll('#coffees_list li');

  const coffeesArray = Array.from(coffeeLis).map(
    function(coffeeLi) { 
      // Use ES6 syntax to return a hash of a Coffee's amount, brand, and variety inputs.
      const coffeeInputs = coffeeLi.querySelectorAll('input');
      const [amount, brand, variety] = Array.from(coffeeInputs).map(input => input.value);

      return {amount, brand, variety};
    }
  );

  return coffeesArray;
}

function getIngredientData() {
  // I want to return something like this:
  /* [
    {category: 'liquid', amount: '1 cup', name: 'hot water'},
    {category: 'creamer', amount: '2 tsp', name: 'hazelnut creamer'},
    {category: 'sweetener', amount: '1 packet', 'Sweet and Low'},
    {category: 'other', amount: '1/4 tsp', name: 'cinnamon'}
  ] */

  const ingredientLis = document.querySelectorAll('ol.ingredients_list li');

  const ingredientsArray = Array.from(ingredientLis).map(
    // Create an object for each <li>
    function(ingredLi) {
      const ingredInputs = ingredLi.querySelectorAll('input');
      let ingredObj = {};

      ingredInputs.forEach(input => ingredObj[input.name] = input.value);
      return ingredObj;
    }
  );

  return ingredientsArray;
}