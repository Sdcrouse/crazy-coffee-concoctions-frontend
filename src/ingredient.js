class Ingredient {
  constructor(id, ingredientAttributes) {
    this.id = id;
    this.amount = ingredientAttributes.amount;
    this.name = ingredientAttributes.name;
    this.category = ingredientAttributes.category;
  }

  description() {
    return `${this.amount} of ${this.name}`;
  }

  static createCollection(ingredientObjs) {
    return ingredientObjs.map(obj => new Ingredient(obj.id, obj.attributes));
  }

  static categoryLabel(category) {
    return (category === "Other" ? "Additional Ingredient(s):" : `${category}(s):`);
  }
}

Ingredient.allCategories = ["Liquid", "Sweetener", "Creamer", "Other"];