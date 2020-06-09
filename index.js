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
  const concoctionAttributes = concoction.data.attributes;
  const coffees = concoction.included.filter(associatedObj => associatedObj.type === 'coffee');

  // The main container that will display the concoction
  const mainContainer = document.getElementById('main-container');

  // <h2>Name of Concoction</h2>
  const concoctionName = document.createElement('h2');
  concoctionName.innerText = `${concoctionAttributes.name}`;

  // <label>Coffees:</label>
  const coffeesLabel = document.createElement('label');
  coffeesLabel.textContent = "Coffee(s):";

  // Unordered list of coffees
  const coffeesList = document.createElement('ul');
  coffees.forEach(function(coffee) {
    const coffeeItem = document.createElement('li');
    coffeeItem.textContent = `${coffee.attributes.amount} ${coffee.attributes.brand} ${coffee.attributes.variety}`;
    coffeesList.append(coffeeItem);
  });

  // Put everything together in the mainContainer
  mainContainer.append(concoctionName, coffeesLabel, coffeesList);
  
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