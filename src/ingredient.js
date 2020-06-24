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
    const label = document.createElement('h3');

    if(category === "Other") {
      label.textContent = "Additional Ingredient(s):"
    } else {
      label.textContent = `${category}(s):`
    }

    return label;
  }

  static appendIngredients(ingredients, wrapper) {
    this.allCategories.forEach(category => {
      const filteredByCategory = ingredients.filter(ingred => ingred.category === category.toLowerCase());
      
      if(filteredByCategory.length > 0) {
        wrapper.append(this.categoryLabel(category), this.ingredientList(filteredByCategory));
      }
    });
  }
}

Ingredient.allCategories = ["Liquid", "Sweetener", "Creamer", "Other"];