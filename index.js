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

  // <label>Coffees:</label>
  const coffeesLabel = newElementWithText('label', "Coffee(s):");

  // Unordered list of coffees
  const coffeesList = document.createElement('ul');
  coffees.forEach(function(coffee) {
    const coffeeItem = newElementWithText(
      'li', `${coffee.attributes.amount} ${coffee.attributes.brand} ${coffee.attributes.variety}`
    );
    coffeesList.append(coffeeItem);
  });

  // Labeled unordered list of liquids
  const liquids = allIngredAttrs.filter(attr => attr.category === 'liquid');
  const liquidsLabel = newElementWithText('label', "Liquid(s):");
  const liquidsList = document.createElement('ul');
  liquids.forEach(function(liquid) {
    const liquidItem = newElementWithText(
      'li', `${liquid.amount} ${liquid.name}`
    );
    liquidsList.append(liquidItem);
  });

  // Labeled unordered list of sweeteners
  const sweeteners = allIngredAttrs.filter(attr => attr.category === 'sweetener');
  const sweetenersLabel = newElementWithText('label', "Sweetener(s):");
  const sweetenersList = document.createElement('ul');
  sweeteners.forEach(function(sweetener) {
    const sweetenerItem = newElementWithText(
      'li', `${sweetener.amount} ${sweetener.name}`
    );
    sweetenersList.append(sweetenerItem);
  });

  // Put everything together in the mainContainer
  mainContainer.append(
    concoctionName, coffeesLabel, coffeesList, liquidsLabel, liquidsList, sweetenersLabel, sweetenersList
  );
  
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