const BASE_URL = "http://localhost:3000/api/v1/concoctions";

document.addEventListener("DOMContentLoaded", function() {
  getConcoction(1); // This is a temporary default, until I add the "New Concoction" form.
});

function getConcoction(concoction_id) {
  fetch(`${BASE_URL}/1`)
    .then(resp => resp.json())
    .then(concoctionJson => displayConcoction(concoctionJson));
}

function displayConcoction(concoction) {
  // Concoction attributes and associated coffees and ingredients
  // Is there a way to refactor this to be more DRY?
  const concoctionAttributes = concoction.data.attributes;
  const coffees = concoction.included.filter(associatedObj => associatedObj.type === 'coffee');
  const ingredients = concoction.included.filter(associatedObj => associatedObj.type === 'ingredient');
  const allIngredAttrs = ingredients.map(ingred => ingred.attributes);
  // This can be refactored with ES6 syntax, if I later want the "id" attribute of an ingredient.

  // The main container that will display the concoction
  const mainContainer = document.getElementById('main-container');

  // <h2>Name of Concoction</h2>
  const concoctionName = newElementWithText('h2', `${concoctionAttributes.name}`);

  // Labeled unordered list of coffees
  const coffeesLabel = newElementWithText('label', "Coffee(s):");
  const coffeesList = document.createElement('ul');
  coffees.forEach(function(coffee) {
    const coffeeItem = newElementWithText(
      'li', `${coffee.attributes.amount} ${coffee.attributes.brand} ${coffee.attributes.variety}`
    );
    coffeesList.append(coffeeItem);
  });

  // Append everything above.
  mainContainer.append(concoctionName, coffeesLabel, coffeesList);

  // Append a labeled sublist of liquids.
  appendLabeledIngredientSubList(mainContainer, allIngredAttrs, "Liquid");

  // Append a labeled sublist of sweeteners.
  appendLabeledIngredientSubList(mainContainer, allIngredAttrs, "Sweetener");

  // Append a labeled sublist of creamers.
  appendLabeledIngredientSubList(mainContainer, allIngredAttrs, "Creamer");

  // Append any additional ingredients.
  appendLabeledIngredientSubList(mainContainer, allIngredAttrs, "Other", "Additional Ingredient(s):");
  
  // Goal: HTML that looks something like this (not necessarily concoction #1).
  // I may want to style this as a table or with CSS Grid instead - I need to separate the labels from the content.
  /*
   * <div id="main-container">
   *   <h2>Regular Mocha</h2>
   *   <ul>
   *     Coffee(s):
   *     <li>1 tsp Folger's Instant</li>
   *     <li>t tsp Yuban Instant</li>
   *   </ul>
   *   <ul>
   *     Liquid(s):
   *     <li>8 fl oz hot milk</li>
   *   </ul>
   *   <ul>
   *     Sweetener(s):
   *     <li>1 tsp sugar</li>
   *     <li>1/2 packet Sweet and Low</li>
   *   </ul>
   *   <ul>Creamer(s):
   *     <li>1 tsp vanilla creamer</li>
   *   </ul>
   *   <ul>Additional Ingredients:
   *     <li>1 tsp chocolate syrup</li>
   *     <li>1 pinch cinnamon</li>
   *   </ul>
   *   <p>Instructions: Lorem Ipsum Dolor Sit Amet</p>
   *   <p>Notes: My notes about this coffee concoction</p>
   * </div>
   */
}

function newElementWithText(elementType, elementText) {
  // Can this be refactored with something like Ruby's #tap method?
  // https://stackoverflow.com/questions/21497919/a-function-to-tap-into-any-methods-chain
  const newElement = document.createElement(elementType);
  newElement.textContent = elementText;
  return newElement;
}

function appendLabeledIngredientSubList(element, allIngredAttrs, ingredCategory, label = `${ingredCategory}(s):`) {
  // This will probably get encapsulated by a method, once I refactor with Object Orientation.

  const filteredByCategory = allIngredAttrs.filter(attr => attr.category === ingredCategory.toLowerCase());
  const ingredSubLabel = newElementWithText('label', label);
  const ingredSubList = document.createElement('ul');

  filteredByCategory.forEach(function(ingredient) {
    const ingredientItem = newElementWithText(
      'li', `${ingredient.amount} ${ingredient.name}`
    );
    ingredSubList.append(ingredientItem);
  });

  element.append(ingredSubLabel, ingredSubList);
}