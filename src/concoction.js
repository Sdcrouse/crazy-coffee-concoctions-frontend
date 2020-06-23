class Concoction {
  constructor(id, concoctionAttributes, includedObjects) {
    this.id = id;
    this.name = concoctionAttributes.name;
    this.instructions = concoctionAttributes.instructions;
    this.notes = concoctionAttributes.notes;
    this.coffees = this.createCollection(includedObjects, 'coffee', Coffee);
    this.ingredients = this.createCollection(includedObjects, 'ingredient', Ingredient);

    Concoction.all.push(this);
  }

  createCollection(objects, objType, objClass) {
    const filtered = objects.filter(obj => obj.type === objType);
    return filtered.map(obj => new objClass(obj.id, obj.attributes));
  }
}

Concoction.all = [];