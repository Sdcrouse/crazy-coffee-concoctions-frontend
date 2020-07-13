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