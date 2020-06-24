class Ingredient {
  constructor(id, ingredientAttributes) {
    this.id = id;
    this.amount = ingredientAttributes.amount;
    this.name = ingredientAttributes.name;
    this.category = ingredientAttributes.category;
  }

  static appendIngredients(ingredients, wrapper) {
    this.allCategories.forEach(category => {
      const filteredByCategory = ingredients.filter(ingred => ingred.category === category.toLowerCase());
      
      if(filteredByCategory.length > 0) {
        const label = document.createElement('h3');
        const ingredientList = document.createElement('ul');

        if(category === "Other") {
          label.textContent = "Additional Ingredient(s):"
        } else {
          label.textContent = `${category}(s):`
        }
        
        filteredByCategory.forEach(ingredient => {
          const ingredientItem = App.newElementWithText('li', `${ingredient.amount} ${ingredient.name}`);
          ingredientList.append(ingredientItem);
        });

        wrapper.append(label, ingredientList);
      }
    });
  }
}

Ingredient.allCategories = ["Liquid", "Sweetener", "Creamer", "Other"];