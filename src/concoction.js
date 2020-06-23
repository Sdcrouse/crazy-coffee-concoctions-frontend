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

  appendLabeledAttribute(wrapper, attribute, labelText) {
    const label = document.createElement('h3');
    label.textContent = labelText;
    // I should refactor the above lines of code with something like App.newElementWithText('h3', labelText);

    const attrElement = document.createElement('p');
    attrElement.textContent = attribute; // I should refactor this, too, with the same method mentione above.

    wrapper.append(label, attrElement);
  }
}

Concoction.all = [];