class Shared {
  static newElementWithText(elementType, elementText) {
    const newElement = document.createElement(elementType);

    newElement.textContent = elementText;
    return newElement;
  }
}