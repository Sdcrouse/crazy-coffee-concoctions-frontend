class Concoction {
  constructor(id, concoctionAttributes, includedObjects) {
    this.id = id;
    this.name = concoctionAttributes.name;
    this.instructions = concoctionAttributes.instructions;
    this.notes = concoctionAttributes.notes;
    this.coffees = this.createCollection(includedObjects, Coffee);
    this.ingredients = this.createCollection(includedObjects, Ingredient);

    Concoction.all.push(this);
  }

  createCollection(objects, objClass) {
    // This is DRY, but it may be hard to extend later.
    // It assumes that the object's type is its lowercased class name.
    const filtered = objects.filter(obj => obj.type === objClass.name.toLowerCase());
    return filtered.map(obj => new objClass(obj.id, obj.attributes));
  }
}

Concoction.all = [];