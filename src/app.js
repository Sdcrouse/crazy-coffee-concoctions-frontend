class App {
  static newElementWithText(elementType, elementText) {
    const newElement = document.createElement(elementType);

    newElement.textContent = elementText;
    return newElement;
  }

  static appendLabeledAttribute(wrapper, attribute, labelText) {    
    const label = this.newElementWithText('h3', labelText);
    const attrElement = this.newElementWithText('p', attribute);
    
    wrapper.append(label, attrElement);
  }
}