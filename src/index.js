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

function addConcoctionToList(concoctionsList, concoctionJson, concoctionName) {
  const concoctionOption = Shared.newElementWithText('option', concoctionName);

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
  const attributesWrapper = document.createElement('div'); // Wrapper for the concoction attributes other than "name"

  concoctionNameWrapper.append(Shared.newElementWithText('h2', concoction.name));

  // Append labeled lists of a concoction's attributes and associated coffees and ingredients.
  // Edit: There's probably a better way to do this.
  attributesWrapper.append(
    ...Coffee.createLabeledCoffeeList(concoction.coffees),
    ...Ingredient.createCategorizedIngredientLists(concoction.ingredients),
    ...concoction.labeledAttributes("Instructions", "Notes")
  );
    
  mainContainer.innerHTML = ""; // Empty the mainContainer before appending anything to it.
  mainContainer.append(concoctionNameWrapper, attributesWrapper); // Finally, append the two wrappers to the mainContainer.
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

  if(notes) {concData.notes = notes}; // Edge case

  concData.coffees_attributes = getCollectionData('#coffees_list li');
  concData.ingredients_attributes = getCollectionData('ol.ingredients_list li');

  return concData;
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