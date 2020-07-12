class Ingredient {
  constructor(id, ingredientAttributes) {
    this.id = id;
    this.amount = ingredientAttributes.amount;
    this.name = ingredientAttributes.name;
    this.category = ingredientAttributes.category;
  }

  static createCollection(ingredientObjs) {
    return ingredientObjs.map(obj => new Ingredient(obj.id, obj.attributes));
  }

  static categoryLabel(category) {
    return (category === "Other" ? "Additional Ingredient(s):" : `${category}(s):`);
  }

  static createLabeledList(ingredients, ingredCategory) {
    const ingredientLabel = Shared.newElementWithText('h3', ingredCategory);
    const ingredientList = document.createElement('ul');

    ingredients.forEach(ingredient => {
      ingredientList.append(Shared.newElementWithText('li', `${ingredient.amount} of ${ingredient.name}`))
    });

    return [ingredientLabel, ingredientList];
  }

  static createLabeledIngredientLists(ingredients) {
    return Shared.flatMapAndFilter(this.allCategories, category => {
      const filteredByCategory = ingredients.filter(ingred => ingred.category === category.toLowerCase());
      
      if (filteredByCategory.length > 0) { // I.e. there are ingredients with this category
        return this.createLabeledList(filteredByCategory, this.categoryLabel(category));
      }
    });
  } // End of createLabeledIngredientLists
}

Ingredient.allCategories = ["Liquid", "Sweetener", "Creamer", "Other"];