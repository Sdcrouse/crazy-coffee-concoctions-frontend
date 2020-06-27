class Ingredient {
  constructor(id, ingredientAttributes) {
    this.id = id;
    this.amount = ingredientAttributes.amount;
    this.name = ingredientAttributes.name;
    this.category = ingredientAttributes.category;
  }

  static categoryLabel(category) {
    return (category === "Other" ? "Additional Ingredient(s):" : `${category}(s):`);
  }

  static labeledIngredientLists(ingredients) {
    // Return an array of labels and ingredient lists
    
    // Be careful here! If I use a function expression instead of arrow syntax, the value of "this" is undefined! 
    // Also, take note: Arrow functions with a block body {} need an explicit return statement.
    return Shared.flatMapAndFilter(this.allCategories, category => {
      const filteredByCategory = ingredients.filter(ingred => ingred.category === category.toLowerCase());
      
      if(filteredByCategory.length > 0) { // I.e. there are ingredients with this category
        return Shared.labeledCollectionList(
          this.categoryLabel(category), filteredByCategory, (ingredient) => `${ingredient.amount} ${ingredient.name}`
        );
      }
    });
  } // End of labeledIngredientLists
}

Ingredient.allCategories = ["Liquid", "Sweetener", "Creamer", "Other"];