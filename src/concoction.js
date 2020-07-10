class Concoction {
  constructor(id, concoctionAttributes, includedObjects) {
    this.id = id;
    this.name = concoctionAttributes.name;
    this.instructions = concoctionAttributes.instructions;
    this.notes = concoctionAttributes.notes;
    this.coffees = Coffee.createCollection(includedObjects.filter(obj => obj.type === "coffee"));
    this.ingredients = Ingredient.createCollection(includedObjects.filter(obj => obj.type === "ingredient"));

    Concoction.all.push(this);
  }

  createCollection(objects, objClass, objType = objClass.name.toLowerCase()) {
    const filtered = objects.filter(obj => obj.type === objType);
    return filtered.map(obj => new objClass(obj.id, obj.attributes));
  }

  nameWrapper() {
    const wrapper = document.createElement('div');
    const nameHeading = Shared.newElementWithText('h2', this.name);
    
    wrapper.append(nameHeading);
    return wrapper;
  }

  labeledAttributes(...attributeNames) {
    // attributeNames is expected to look like ["Instructions", "Notes", "Etc"]
    // This returns something like:
    // [<h3>Instructions:</h3>, <p>Make the concoction</p>, <h3>Notes:</h3>, <p>Lorem ipsum</p>]

    return Shared.flatMapAndFilter(attributeNames, attrName => {
      const concoctionAttr = this[attrName.toLowerCase()];
      // Note: "this" is the Concoction instance.
      // Be careful here; "this" changes if I use a function expression instead!
      
      if (concoctionAttr) {
        const label = Shared.newElementWithText('h3', `${attrName}:`);
        const attrElement = Shared.newElementWithText('p', concoctionAttr);
        
        return [label, attrElement];
      }
    });
  } // End of labeledAttributes

  static sortByName(concoctionsJson) {
    return concoctionsJson.sort(function(concoctionA, concoctionB) {
      const concAName = concoctionA.name.toLowerCase();
      const concBName = concoctionB.name.toLowerCase();
  
      if (concAName < concBName) {
        return -1;
      } else if (concAName === concBName) {
         return 0;
      } else { 
        return 1;
      }
    });
  } // End of sortByName
} // End of Concoction class

Concoction.all = [];