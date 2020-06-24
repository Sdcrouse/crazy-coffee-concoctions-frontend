class Ingredient {
  constructor(id, ingredientAttributes) {
    this.id = id;
    this.amount = ingredientAttributes.amount;
    this.name = ingredientAttributes.name;
    this.category = ingredientAttributes.category;
  }

  static appendIngredientList(ingredients, wrapper) {
    const creamers = ingredients.filter(ingred => ingred.category === "creamer");
    
    if(creamers.length > 0) {
      // This and the Concoction class's appendLabeledAttribute method might be refactored with the App class.
      const label = App.newElementWithText('h3', `Creamer(s):`);
      const creamerList = document.createElement('ul');
      
      creamers.forEach(creamer => {
        const creamerItem = App.newElementWithText('li', `${creamer.amount} ${creamer.name}`);
        creamerList.append(creamerItem);
      });

      wrapper.append(label, creamerList);
    }
  }
}

Ingredient.allCategories = ["Liquid", "Sweetener", "Creamer", "Other"];