class Ingredient {
  constructor(id, ingredientAttributes) {
    this.id = id;
    this.amount = ingredientAttributes.amount;
    this.name = ingredientAttributes.name;
    this.category = ingredientAttributes.category;
  }

  static ingredientList(ingredients) {
    const list = document.createElement('ul');

    ingredients.forEach(
      ingred => list.append( Shared.newElementWithText('li', `${ingred.amount} ${ingred.name}`) )
    );

    return list;
  }

  static categoryLabel(category) {
    return (category === "Other" ? "Additional Ingredient(s):" : `${category}(s):`);
  }

  static labeledIngredientLists(ingredients) {
    // Return an array of labels and ingredient lists
    
    // Be careful here! If I use a function expression instead of arrow syntax, the value of "this" is undefined! 
    // Also, take note: Arrow functions with a block body {} need an explicit return statement.
    return this.allCategories.flatMap(category => { // Create an array of arrays, then flatten it
      const filteredByCategory = ingredients.filter(ingred => ingred.category === category.toLowerCase());
      
      if(filteredByCategory.length > 0) { // I.e. there are ingredients with this category
        return [
          Shared.newElementWithText('h3', this.categoryLabel(category)),
          this.ingredientList(filteredByCategory)
        ];
      }
    }).filter(element => !!element); // Filter out any falsy (usually undefined) values
  } // End of appendIngredients
}

Ingredient.allCategories = ["Liquid", "Sweetener", "Creamer", "Other"];