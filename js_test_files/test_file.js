const nameWrapper = document.createElement('div'); // This may be a special case.
  const name = newElementWithText('h2', `${concoctionAttributes.name}`);
  nameWrapper.append(name);

// Wrapper for the concoction attributes other than "name"
const attrsWrapper = document.createElement('div');

// Old version:
// function appendLabeledContent(wrapper, content, contentType, labelText, labelType = 'h3') {
//   const label = newElementWithText(labelType, labelText);
//   const contentElement = newElementWithText(contentType, content); // First, test this on non-Array content; then extend it for Arrays.
//   wrapper.append(label, contentElement);
// }

// Is there a way to combine appendLabeledContent with appendLabeledIngredientSublist?
// They sound similar, and one calls the other.
// Maybe I could even include createListWithItems?
function appendLabeledContent(wrapper, content, contentType, labelText, labelType = 'h3') {
  const label = newElementWithText(labelType, labelText);
  let contentElement;

  if (Array.isArray(content)) {
    contentElement = createListWithItems(contentType, content);
  } else { // The content is (presumably) a String.
    contentElement = newElementWithText(contentType, content);
  }

  wrapper.append(label, contentElement);
}

// In this case, "element" could be renamed to "wrapper". It's the same as the wrapper sent to appendLabeledContent (attrsWrapper).
// I might be able to add a labelType (with a default value of 'h3') and replace "label" with "labelText" (though that depends on an ingredient-specific category).
// Could ingredCategory be an optional argument?
function appendLabeledIngredientSubList(element, ingredients, ingredCategory, label = `${ingredCategory}(s):`) {
  // This will probably get encapsulated by a method, once I refactor with Object Orientation.
  
  const filteredByCategory = ingredients.filter(
    ingred => ingred.attributes.category === ingredCategory.toLowerCase()
  );

  if (filteredByCategory.length) {
    // The filtered array is not empty - i.e. it has at least one ingredient with a certain ingredCategory 

    appendLabeledContent(element, filteredByCategory, 'ul', label);
  }
}

function createListWithItems(listType, items) {
  const list = document.createElement(listType);
  
  items.forEach(function(item) {
    const listItem = newElementWithText('li', attributeString(item));
    list.append(listItem);
  });
  
  return list;
}

  // Append a labeled sublist of each ingredient category except "other".
  // mainIngredCategories.forEach(
    // ingredCat => appendLabeledIngredientSubList(attrsWrapper, ingredients, ingredCat)
  // );
  // 
  // Append any additional ingredients.
  // appendLabeledIngredientSubList(attrsWrapper, ingredients, "Other", "Additional Ingredient(s):");