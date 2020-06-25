class Coffee {
  constructor(id, coffeeAttributes) {
    this.id = id;
    this.amount = coffeeAttributes.amount;
    this.brand = coffeeAttributes.brand;
    this.variety = coffeeAttributes.variety;
  }

  coffeeLi() {
    const coffeeItem = Shared.newElementWithText('li', this.amount);
    
    if(this.brand) {
      coffeeItem.textContent += ` ${this.brand}`;
    }

    coffeeItem.textContent += ` ${this.variety}`;
    return coffeeItem;
  }

  static appendCoffeeList(coffeeObjs, wrapper) {
    // Create a list of coffees, and append it to the wrapper element.
    const coffeeLabel = Shared.newElementWithText('h3', "Coffee(s):");
    const coffeeList = document.createElement('ul');

    coffeeObjs.forEach(
      coffeeObj => coffeeList.append( coffeeObj.coffeeLi() )
    );

    wrapper.append(coffeeLabel, coffeeList);
  }
}