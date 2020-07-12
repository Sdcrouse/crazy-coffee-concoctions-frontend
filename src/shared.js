class Shared {
  static newElementWithText(elementType, elementText) {
    const newElement = document.createElement(elementType);

    newElement.textContent = elementText;
    return newElement;
  }

  static flatMapAndFilter(objCollection, callback) {
    // Create an array of arrays, flatten it, and filter out any falsy (usually undefined) elements.

    return objCollection.flatMap(obj => callback(obj)).filter(element => !!element);
  }
}