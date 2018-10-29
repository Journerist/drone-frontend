export default class Command {

  constructor({name, endpoint}) {
    if(!name || !endpoint) {
      throw new Error('name and endpoint need to be defined.');
    }

    this._name = name;
    this._endpoint = endpoint;
  }

  getName() {
    return this._name;
  }

  getEndpoint() {
    return this._endpoint;
  }
}