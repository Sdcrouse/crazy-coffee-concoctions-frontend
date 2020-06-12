function createListWithItems(listType, items) { // Idea for extension: Set a default param itemType to 'li'.
  const list = document.createElement(listType);

  items.forEach(function(item) {
    const listItem = newElementWithText('li', attributeString(item));
    list.append(listItem);
  });

  return list;
}

function appendLabeledIngredientSubList(element, ingredients, ingredCategory, label = `${ingredCategory}(s):`) {
  // This will probably get encapsulated by a method, once I refactor with Object Orientation.
  
  const filteredByCategory = ingredients.filter(
    ingred => ingred.attributes.category === ingredCategory.toLowerCase()
  );

  if (filteredByCategory.length) {
    // The filtered array is not empty - i.e. it has at least one ingredient with a certain ingredCategory 
    // It's empty when there are no ingredients with that category - liquid, creamer, (oftentimes) other, etc.
    // So, to refactor, maybe that label and filteredByCategory need to be figured out BEFORE calling this thing?
    // Or, maybe it's good enough as it is?
    appendLabeledContent(element, filteredByCategory, 'ul', label);
  }
}

function appendLabeledContent(wrapper, content, contentType, labelText, labelType = 'h3') {
  // This gets called a lot; maybe I could make this into an object method, and call it on an array?
  const label = newElementWithText(labelType, labelText);
  let contentElement;

  if (Array.isArray(content)) {
    contentElement = createListWithItems(contentType, content);
  } else { // The content is (presumably) a String.
    contentElement = newElementWithText(contentType, content);
  }

  wrapper.append(label, contentElement);
}

// What I know:
// 1. The labeled content consists of a label and content, which is either a String or an Array.
// 2. The label is pretty much always <h3>.
// 3. If the content is a String, I create a new element (usually <p>) with the content as its text.
// 4. If it's an Array, I create a list (usually <ul>) with the content's items (usually <li>).
// 5. I then append the label and the contentElement to a wrapper.
// 6. All of this is taken care of in appendLabeledContent.

// What I know about the appendLabeledIngredientSubList function:
// 1. It accepts a wrapper (currently called "element"), a list of a Concoction's ingredient objects,
//    an ingredient category, and a label (default is the category + (s) - it can also be "Additional Ingredient(s)")
// 2. It filters the ingredients by a category.
// 3. If that filtered list is empty, it does nothing.
//    Else, it calls appendLabeledContent with the wrapper, filtered list, 'ul', and the label.

// Maybe what I REALLY need to do is create an object whose keys are the categories, and whose values are arrays.
// By iterating over that object, I could call appendLabeledContent, unless the array is null.
// However, I risk not iterating over it in the order I'd prefer (that may not matter, though).

// In the displayConcoction function, I have a constant "ingredients" set to an array of Objects whose type is "ingredient".
// I also have a mainIngredCategories constant set to ["Liquid", "Sweetener", "Creamer"].
// I then use the appendLabeledIngredientSublist function like so:

// Append a labeled sublist of each ingredient category except "other".
mainIngredCategories.forEach(
  ingredCat => appendLabeledIngredientSubList(attrsWrapper, ingredients, ingredCat)
);

// Append any additional ingredients.
appendLabeledIngredientSubList(attrsWrapper, ingredients, "Other", "Additional Ingredient(s):");

// What if I instead just made a function called appendIngredients? I would send it the wrapper, ingredients, and categories (including "other").
// It would work like so (actually, I may not need that array of categories at ALL!):
// function appendIngredients(wrapper, ingredients, ingredCategories) {
// }

function appendIngredients(wrapper, ingredients) {
  // From the ingredient objects, make a new object whose keys are the <ingredient.attributes.category>'s.
  // The values are filtered arrays of each ingredient with a given category.

  let ingredsObj = {};

  ingredients.forEach(function(ingredient) { // Break this out into a new function?
    const category = ingredient.attributes.category;

    if( ingredsObj[category] ) {
      ingredsObj[category].push(ingredient);
    } else {
     ingredsObj[category] = [ingredient]; 
    }
  });

  ingredsObj.forEach(function(ingredObj) {
    // I'd need to create the labels by reformatting the category name
    // Or using "Additional Ingredient(s)" if the category is "other"
    // Then call appendLabeledContent with the wrapper, label, and ingredObj somehow.
  });
}
// Problem: How do I customize the labels? Would this be easier with Object Orientation?
// ...This actually looks WAY more complicated than what I already have!