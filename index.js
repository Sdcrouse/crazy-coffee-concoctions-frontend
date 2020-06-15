const BASE_URL = "http://localhost:3000/api/v1/concoctions";

document.addEventListener("DOMContentLoaded", function() {
  getConcoctions();
  newConcoctionForm();
});

function getConcoctions() {
  fetch(BASE_URL)
    .then(resp => resp.json())
    .then(concoctions => addConcoctionsToList(concoctions));
}

function addConcoctionsToList(concoctions) {
  const concoctionsList = document.querySelector('nav select');

  concoctions.forEach(function(concoction) {
    const concoctionOption = newElementWithText('option', concoction.name);

    concoctionOption.setAttribute("value", concoction.id);
    concoctionsList.append(concoctionOption);
  });

  concoctionsList.addEventListener("change", function(event) { // Display selected concoction
    if(event.target.value) { getConcoction(event.target.value) }
  });
}

function getConcoction(concoctionId) {
  fetch(`${BASE_URL}/${concoctionId}`)
    .then(resp => resp.json())
    .then(concoctionJson => displayConcoction(concoctionJson));
}

function displayConcoction(concoction) {
  // Concoction attributes and associated coffees and ingredients
  // Is there a way to refactor this to be more DRY?
  // Update: Yes, with OOJS! E.g. I could use a Concoction class with a static method that accepts an objType and returns coffees, ingredients, etc.
  // Coffees and Ingredients might need to inherit from another class, since they're fairly similar.
  const concoctionAttributes = concoction.data.attributes; // This, obviously, should be in the constructor of a Concoction class.
  const coffees = concoction.included.filter(associatedObj => associatedObj.type === 'coffee');
  const ingredients = concoction.included.filter(associatedObj => associatedObj.type === 'ingredient');
  const mainIngredCategories = ["Liquid", "Sweetener", "Creamer"]; // Maybe an Ingredient property?

  // The main container that will display the concoction
  const mainContainer = document.getElementById('main-container');
  mainContainer.innerHTML = ""; // Empty the mainContainer before appending anything to it.

  // Name of concoction - could be either a Concoction method or a static method of another class (General, maybe?)
  const nameWrapper = document.createElement('div');
  const name = newElementWithText('h2', `${concoctionAttributes.name}`);
  nameWrapper.append(name);

  // Wrapper for the concoction attributes other than "name"
  // I use this same wrapper in a lot of function calls; maybe it should be a property of a class?
  const attrsWrapper = document.createElement('div');

  // Labeled unordered list of coffees
  appendLabeledContent(attrsWrapper, coffees, 'ul', "Coffee(s):");

  // Append a labeled sublist of each ingredient category except "other".
  mainIngredCategories.forEach(
    ingredCat => appendLabeledIngredientSubList(attrsWrapper, ingredients, ingredCat)
  );
  
  // Append any additional ingredients.
  appendLabeledIngredientSubList(attrsWrapper, ingredients, "Other", "Additional Ingredient(s):");
  
  // Concoction instructions
  appendLabeledContent(attrsWrapper, `${concoctionAttributes.instructions}`, 'p', "Instructions:");
  
  // Concoction notes
  if (concoctionAttributes.notes) {
    appendLabeledContent(attrsWrapper, `${concoctionAttributes.notes}`, 'p', "Notes:");
  }

  // Finally, append the two wrappers to the mainContainer.
  mainContainer.append(nameWrapper, attrsWrapper);
}

function newElementWithText(elementType, elementText) { // elementType is usually 'p', so that could be the default.
  // Can this be refactored with something like Ruby's #tap method?
  // https://stackoverflow.com/questions/21497919/a-function-to-tap-into-any-methods-chain

  // This could be refactored into a static method of a General class, which manages the main app flow.
  const newElement = document.createElement(elementType);
  newElement.textContent = elementText;
  return newElement;
}

function appendLabeledIngredientSubList(element, ingredients, ingredCategory, label = `${ingredCategory}(s):`) {
  // This will probably get encapsulated by a method, once I refactor with Object Orientation.
  // Note: The "element" parameter is really a wrapper: the same wrapper sent to appendLabeledContent; rename it.
  // See test files for refactoring ideas.
  
  const filteredByCategory = ingredients.filter(
    ingred => ingred.attributes.category === ingredCategory.toLowerCase()
  );

  if (filteredByCategory.length) {
    // The filtered array is not empty - i.e. it has at least one ingredient with a certain ingredCategory 

    appendLabeledContent(element, filteredByCategory, 'ul', label);
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

function createListWithItems(listType, items) {
  const list = document.createElement(listType);

  items.forEach(function(item) {
    const listItem = newElementWithText('li', attributeString(item));
    list.append(listItem);
  });

  return list;
}

function appendLabeledContent(wrapper, content, contentType, labelText, labelType = 'h3') {
  // This gets called a lot; maybe I could make this into an object method, and call it on an array?
  const label = newElementWithText(labelType, labelText);
  let contentElement;

  if (Array.isArray(content)) {
    contentElement = createListWithItems(contentType, content);
  } else { // The content is (presumably) a String.
    contentElement = newElementWithText(contentType, content);
  }

  wrapper.append(label, contentElement);
}

function newConcoctionForm() {
  const mainContainer = document.getElementById('main-container');

  const headingWrapper = document.createElement('div');
  const newConcoctionHeading = newElementWithText('h2', "New Concoction");
  headingWrapper.append(newConcoctionHeading);

  const concoctionForm = document.createElement('form');

  const nameLabel = newElementWithText('label', "Name:");
  nameLabel.setAttribute("for", "name");

  const nameInput = document.createElement("input");
  nameInput.setAttribute("type", "text"); // Note: This is default, so I can refactor without this line of code.
  nameInput.setAttribute("id", "name");
  nameInput.setAttribute("name", "name");
  concoctionForm.append(nameLabel, nameInput);

  const instructionsLabel = newElementWithText('label', "Instructions:");
  instructionsLabel.setAttribute("for", "instructions");

  const instructionsInput = document.createElement("textarea");
  instructionsInput.setAttribute("id", "instructions");
  instructionsInput.setAttribute("name", "instructions");
  concoctionForm.append(instructionsLabel, instructionsInput);

  const submitButton = newElementWithText('button', "Create Concoction");
  submitButton.setAttribute("type", "submit");

  concoctionForm.append(submitButton);

  mainContainer.innerHTML = ""; // Empty the mainContainer before appending anything to it.
  mainContainer.append(headingWrapper, concoctionForm);
}