class Coffee {
  constructor(id, coffeeAttributes) {
    this.id = id;
    this.amount = coffeeAttributes.amount;
    this.brand = coffeeAttributes.brand;
    this.variety = coffeeAttributes.variety;
  }

  appendCoffeeItemTo(coffeeList) {
    const coffeeItem = document.createElement('li');
    coffeeItem.textContent = this.amount; // Be sure to refactor this with something like newElementWithText.

    if(this.brand) {
      coffeeItem.textContent += ` ${this.brand}`;
    }

    coffeeItem.textContent += ` ${this.variety}`;
    coffeeList.append(coffeeItem);
  }

  static appendCoffeeList(coffeeObjs, wrapper) {
    // Create a list of coffees, and append it to the wrapper element.
    const coffeeLabel = document.createElement('h3');
    const coffeeList = document.createElement('ul');

    coffeeLabel.textContent = "Coffee(s):";
    coffeeObjs.forEach(coffeeObj => coffeeObj.appendCoffeeItemTo(coffeeList));
    wrapper.append(coffeeLabel, coffeeList);
  }
}