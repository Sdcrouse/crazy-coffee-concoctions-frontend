const BASE_URL = "http://localhost:3000/api/v1/concoctions";

document.addEventListener("DOMContentLoaded", function() {
  const newConcoctionButton = document.querySelector('nav button');
  const mainContainer = document.getElementById('main-container');
  const newConcoctionHTML = mainContainer.innerHTML;
  // By default, the main-container has the Concoction form when the page is loaded.

  getConcoctions();
  mainContainer.addEventListener('submit', createConcoction);
  // This works for right now because only ONE child element (the form) triggers the "submit" event. 

  newConcoctionButton.addEventListener('click', () => mainContainer.innerHTML = newConcoctionHTML);
});

function getConcoctions() {
  fetch(BASE_URL)
    .then(resp => resp.json())
    .then(concoctionsJson => {
      const concoctionsList = document.querySelector('nav select');
      const sortedConcoctions = Concoction.sortByName(concoctionsJson);

      sortedConcoctions.forEach(concoctionJson => addConcoctionToList(concoctionsList, concoctionJson, concoctionJson.name));
    
      concoctionsList.addEventListener("change", function(event) {
        // Display selected concoction, unless "Saved Concoctions" or a concoction with an invalid id is chosen.
        if(event.target.value) { getConcoction(event.target.value) }
      });
    })
    .catch(error => console.log("Oops! Something's not right here: ", error));
}

function createNewElementWithText(elementTagName, elementText) {
  const newElement = document.createElement(elementTagName);

  newElement.textContent = elementText;
  return newElement;
}

function addConcoctionToList(concoctionsList, concoctionJson, concoctionName) {
  const concoctionOption = createNewElementWithText('option', concoctionName);

  concoctionOption.setAttribute("value", concoctionJson.id);
  concoctionsList.append(concoctionOption);
}

function getConcoction(concoctionId) {
  fetch(`${BASE_URL}/${concoctionId}`)
    .then(resp => {
      if (resp.status === 404) {
        displayErrorImage("404 Not Found");
      }
      return resp.json();
    })
    .then(concoctionJson => displayConcoction(concoctionJson))
    .catch(error => console.log("Something went wrong here: ", error));
}

function displayErrorImage(httpStatus) {
  const docBody = document.querySelector("body");
  let imgName, errorMessage;

  if (httpStatus === "404 Not Found") {
    imgName = "404-not-found";
    errorMessage = "I could not find this Crazy Coffee Concoction"
  } else if (httpStatus === "418 I'm a Teapot") {
    imgName = "418-im-a-teapot";
    errorMessage = "Sorry! The server is now a teapot, and you obviously can't brew coffee with a teapot"
  }

  docBody.innerHTML = `
    <img src="img/${imgName}.png" alt="${httpStatus}">
    <p>
      &copy; 2020 "${httpStatus}" image courtesy of <a href="https://www.drlinkcheck.com/blog/free-http-error-images">Dr. Link Check</a><br>
      It is available for download free of charge under the <a href="https://creativecommons.org/licenses/by/4.0/legalcode">Creative Commons CC BY 4.0 license</a>
    </p>
    <h2>${errorMessage}. Please refresh the page and try again.</h2>
  `;
}

function displayConcoction(concoctionJson) {
  const concoction = new Concoction(concoctionJson.data.id, concoctionJson.data.attributes, concoctionJson.included);
  const mainContainer = document.getElementById('main-container'); // The main container that will display the concoction
  const concoctionNameWrapper = document.createElement('div');
  const concoctionAttributesWrapper = document.createElement('div'); // Wrapper for the concoction attributes other than "name"

  concoctionNameWrapper.append( createNewElementWithText('h2', concoction.name) );

  appendLabeledCoffeeListToWrapper(concoction.coffees, concoctionAttributesWrapper);

  Ingredient.allCategories.forEach(category => {
    appendCategorizedIngredientListToWrapper(category, concoction.ingredients, concoctionAttributesWrapper);
  });

  appendLabeledConcoctionAttributesToWrapper(concoctionAttributesWrapper, concoction, "Instructions", "Notes");
    
  mainContainer.innerHTML = ""; // Empty the mainContainer before appending anything to it.
  mainContainer.append(concoctionNameWrapper, concoctionAttributesWrapper);
}

function appendLabeledCoffeeListToWrapper(coffees, wrapper) {
  const coffeeLabel = createNewElementWithText('h3', 'Coffee(s):');
  const coffeeList = document.createElement('ul');

  coffees.forEach(coffee => {
    coffeeList.append( createNewElementWithText('li', coffee.description()) );
  });

  wrapper.append(coffeeLabel, coffeeList);
}

function appendCategorizedIngredientListToWrapper(category, ingredients, wrapper) {
  const filteredByCategory = ingredients.filter(ingred => ingred.category === category.toLowerCase());
  
  if (filteredByCategory.length > 0) { // I.e. there are ingredients with this category
    const ingredientLabel = createNewElementWithText('h3', Ingredient.categoryLabel(category));
    const ingredientList = document.createElement('ul');

    filteredByCategory.forEach(ingredient => {
      ingredientList.append( createNewElementWithText('li', ingredient.description()) );
    });

    wrapper.append(ingredientLabel, ingredientList);
  }
}

function appendLabeledConcoctionAttributesToWrapper(wrapper, concoction, ...concoctionAttributeNames) {
  concoctionAttributeNames.forEach(attrName => {
    const attrValue = concoction[attrName.toLowerCase()];

    if (attrValue) {
      const attrLabel = createNewElementWithText('h3', `${attrName}:`);
      const attrElement = createNewElementWithText('p', attrValue);

      wrapper.append(attrLabel, attrElement);
    }
  });
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
    .then(resp => {
      if (resp.status === 418) {
        displayErrorImage("418 I'm a Teapot");
      }
      return resp.json();
    })
    .then(function(concoctionJson) {
      const concoctionsList = document.querySelector('nav select');
      const concoction = concoctionJson.data;

      addConcoctionToList(concoctionsList, concoction, concoction.attributes.name);
      displayConcoction(concoctionJson);
    })
    .catch(error => console.log("Well, THAT didn't work! Here's the problem: ", error));
}

function getConcoctionData(concForm) {
  let concData = {};
  let notes = concForm.querySelector('#notes').value;

  concData.name = concForm.querySelector('#concoction_name').value;
  concData.instructions = concForm.querySelector('#instructions').value;

  if(notes) {concData.notes = notes}; // Not all Crazy Coffee Concoctions will have notes.

  concData.coffees_attributes = getCoffeeInputs();
  concData.ingredients_attributes = getCollectionData('ol.ingredients_list li');

  return concData;
}

function getCoffeeInputs() {
  const coffeeListItems = document.querySelectorAll('#coffees_list li');

  const coffeeInputsArray = Array.from(coffeeListItems).map(
    function(coffeeLi) {
      const coffeeObject = {};
      const coffeeInputs = coffeeLi.querySelectorAll('input');

      coffeeInputs.forEach(input => coffeeObject[input.name] = input.value);
      return coffeeObject;
    }
  );

  return coffeeInputsArray;
}

function getCollectionData(queryString) {
  const collectionListItems = document.querySelectorAll(queryString);

  const collectionArray = Array.from(collectionListItems).map(
    function(listItem) {
      const dataObj = {};
      const inputs = listItem.querySelectorAll('input');

      inputs.forEach(input => dataObj[input.name] = input.value);
      return dataObj;
    }
  );

  return collectionArray;  
}