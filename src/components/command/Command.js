export default class Command {

  constructor({id, name, description}) {
    if(!id || !name || !description) {
      throw new Error('id, name, description need to be defined.');
    }

    this._id = id
    this._name = name;
    this._description = description;
  }

  getId() {
    return this._id;
  }

  getName() {
    return this._name;
  }

  getDescription() {
    return this._description;
  }
}