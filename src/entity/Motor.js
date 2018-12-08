
const MAX_SPEED = 2000

export default class Motor {
  constructor(initialSpeed, motorIndex) {
    if(!initialSpeed || motorIndex === null || motorIndex === undefined) {
      throw new Error("initial speed and motor index are required");
    }
    this._speed = initialSpeed;
    this._index = motorIndex;
  }

  getIndex() {
    return this._index
  }

  changeMotorSpeed(value) {
    const newSpeed = this._speed + value;
    this.setMotorSpeed(newSpeed);
  }

  setMotorSpeed(value) {
    if(value < 0 || value > MAX_SPEED) {
      console.warn(`new speed '${value}' can not be higher than ${MAX_SPEED} or lower than 0`);
      return;
    }

    this._stateHandlerForSpeed(value);

    this._speed = value;
  }

  setStateHandlerForSpeed(setSpeed) {
    this._stateHandlerForSpeed = setSpeed
  }

  getSpeed() {
    return this._speed;
  }

}
