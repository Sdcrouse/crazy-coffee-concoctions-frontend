class Ingredient {
  constructor(id, ingredientAttributes) {
    this.id = id;
    this.amount = ingredientAttributes.amount;
    this.name = ingredientAttributes.name;
    this.category = ingredientAttributes.category;
  }

  addToList(list) {
    list.append( App.newElementWithText('li', `${this.amount} ${this.name}`) )
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
        const ingredientList = document.createElement('ul');

        wrapper.append(this.categoryLabel(category));
        
        filteredByCategory.forEach(ingredient => ingredient.addToList(ingredientList));

        wrapper.append(ingredientList);
      }
    });
  }
}

Ingredient.allCategories = ["Liquid", "Sweetener", "Creamer", "Other"];