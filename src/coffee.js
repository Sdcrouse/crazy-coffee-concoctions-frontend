class Coffee {
  constructor(id, coffeeAttributes) {
    this.id = id;
    this.amount = coffeeAttributes.amount;
    this.brand = coffeeAttributes.brand;
    this.variety = coffeeAttributes.variety;
  }

  static appendCoffeeList(coffeeObjs, wrapper) {
    // Create a list of coffees, and append it to the wrapper element.
    const coffeeLabel = document.createElement('h3');
    const coffeeList = document.createElement('ul');

    coffeeLabel.textContent = "Coffee(s):";

    coffeeObjs.forEach(function (coffeeObj) {
      const coffeeItem = document.createElement('li');
      coffeeItem.textContent = `${coffeeObj.amount} `;

      if(coffeeObj.brand) {
        coffeeItem.textContent += `${coffeeObj.brand} `;
      }

      coffeeItem.textContent += `${coffeeObj.variety}`;
      coffeeList.append(coffeeItem);
    });    

    wrapper.append(coffeeLabel, coffeeList);
  }
}