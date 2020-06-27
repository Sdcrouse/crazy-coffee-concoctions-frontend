class Shared {
  static newElementWithText(elementType, elementText) {
    const newElement = document.createElement(elementType);

    newElement.textContent = elementText;
    return newElement;
  }

  static labeledCollectionList(labelText, objCollection, callback) {
    // I can later refactor this with default arguments (labelType, listType, and/or listItemType) if need be.
    // Note: I may want to undo this later, if it makes my code convoluted, hard to debug, and/or inextensible.

    const label = this.newElementWithText('h3', labelText);
    const list = document.createElement('ul');

    objCollection.forEach(obj => {
      list.append( this.newElementWithText('li', callback(obj)) )
    });

    return [label, list];
  }

  static mapFlattenAndFilter(objCollection, callback) {
    // Create an array of arrays, flatten it, and filter out any falsy (usually undefined) elements.

    return objCollection.flatMap(obj => callback(obj)).filter(element => !!element);
  }
}