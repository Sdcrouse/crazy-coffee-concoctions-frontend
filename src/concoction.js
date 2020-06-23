class Concoction {
  constructor(id, concoctionAttributes, includedObjects) {
    this.id = id;
    this.name = concoctionAttributes.name;
    this.instructions = concoctionAttributes.instructions;
    this.notes = concoctionAttributes.notes;

    this.coffees = includedObjects.filter(obj => obj.type === 'coffee')
        .map(coffeeObj => new Coffee(coffeeObj.id, coffeeObj.attributes));

    this.ingredients = includedObjects.filter(obj => obj.type === 'ingredient')
        .map(ingredObj => new Ingredient(ingredObj.id, ingredObj.attributes));

    Concoction.all.push(this);
  }
}

Concoction.all = [];