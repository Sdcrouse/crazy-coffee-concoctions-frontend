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
}

Ingredient.allCategories = ["Liquid", "Sweetener", "Creamer", "Other"];