const BASE_URL = "http://localhost:3000/api/v1/concoctions";

document.addEventListener("DOMContentLoaded", function() {
  getConcoction(4); // This is a temporary default, until I add the "New Concoction" form.
});

function getConcoction(concoctionId) {
  fetch(`${BASE_URL}/${concoctionId}`)
    .then(resp => resp.json())
    .then(concoctionJson => displayConcoction(concoctionJson));
}

function displayConcoction(concoction) {
  // Concoction attributes and associated coffees and ingredients
  // Is there a way to refactor this to be more DRY?
  const concoctionAttributes = concoction.data.attributes;
  const coffees = concoction.included.filter(associatedObj => associatedObj.type === 'coffee');
  const ingredients = concoction.included.filter(associatedObj => associatedObj.type === 'ingredient');
  const mainIngredCategories = ["Liquid", "Sweetener", "Creamer"];

  // The main container that will display the concoction
  const mainContainer = document.getElementById('main-container');

  // Name of concoction
  const concoctionNameWrapper = document.createElement('div');
  const concoctionName = newElementWithText('h2', `${concoctionAttributes.name}`);
  concoctionNameWrapper.append(concoctionName);

  // Wrapper for the concoction attributes other than "name"
  const concoctionAttrsWrapper = document.createElement('div');

  // Labeled unordered list of coffees; this can probably be refactored, but I don't yet know how.
  const coffeesLabel = newElementWithText('h3', "Coffee(s):");
  const coffeesList = document.createElement('ul');
  coffees.forEach(function(coffee) {
    const coffeeItem = newElementWithText(
      'li', attributeString(coffee)
    );
    coffeesList.append(coffeeItem);
  });

  // Append coffee info to concoctionAttrsWrapper.
  concoctionAttrsWrapper.append(coffeesLabel, coffeesList);

  // Append a labeled sublist of each ingredient category except "other".
  mainIngredCategories.forEach(
    ingredCat => appendLabeledIngredientSubList(concoctionAttrsWrapper, ingredients, ingredCat)
  );
  
  // Append any additional ingredients.
  appendLabeledIngredientSubList(concoctionAttrsWrapper, ingredients, "Other", "Additional Ingredient(s):");
  
  // Concoction instructions
  const instructionsLabel = newElementWithText('h3', "Instructions:");
  const instructions = newElementWithText('p', `${concoctionAttributes.instructions}`);
  concoctionAttrsWrapper.append(instructionsLabel, instructions);
  
  // Concoction notes
  // Side note: It looks like I can abstract the code for instructions and notes into a helper function.
  if (concoctionAttributes.notes) {
    const notesLabel = newElementWithText('h3', "Notes:");
    const notes = newElementWithText('p', `${concoctionAttributes.notes}`);
    concoctionAttrsWrapper.append(notesLabel, notes);
  }

  // Finally, append the two wrappers to the mainContainer.
  mainContainer.append(concoctionNameWrapper, concoctionAttrsWrapper);
}

function newElementWithText(elementType, elementText) {
  // Can this be refactored with something like Ruby's #tap method?
  // https://stackoverflow.com/questions/21497919/a-function-to-tap-into-any-methods-chain
  const newElement = document.createElement(elementType);
  newElement.textContent = elementText;
  return newElement;
}

function appendLabeledIngredientSubList(element, ingredients, ingredCategory, label = `${ingredCategory}(s):`) {
  // This will probably get encapsulated by a method, once I refactor with Object Orientation.
  
  const filteredByCategory = ingredients.filter(
    ingred => ingred.attributes.category === ingredCategory.toLowerCase()
  );

  if (filteredByCategory.length) {
    // The filtered array is not empty - i.e. it has at least one ingredient with a certain ingredCategory 

    const ingredSubLabel = newElementWithText('h3', label);
    const ingredSubList = document.createElement('ul');
  
    filteredByCategory.forEach(function(ingredient) {
      const ingredientItem = newElementWithText(
        'li', attributeString(ingredient)
      );
      ingredSubList.append(ingredientItem);
    });
  
    element.append(ingredSubLabel, ingredSubList);
  }
}

function attributeString(obj) {
  const attrs = obj.attributes;
  let attrStr = `${attrs.amount} `; // So far, obj is either a Coffee or an Ingredient; both have amounts.
  
  if (obj.type === "ingredient") {
    attrStr += `${attrs.name}`;
  } else if (attrs.brand) { // Here and below, obj is assumed to be a Coffee.
    attrStr += `${attrs.brand} ${attrs.variety}`;
  } else {
    attrStr += `${attrs.variety}`;
  }

  return attrStr;
}