class Concoction {
  constructor(id, concoctionAttributes) {
    this.id = id;
    this.name = concoctionAttributes.name;
    this.instructions = concoctionAttributes.instructions;
    this.notes = concoctionAttributes.notes;
    Concoction.all.push(this);
  }
}

Concoction.all = [];