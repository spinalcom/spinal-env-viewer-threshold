import {
  spinalCore,
  Model
} from "spinal-core-connectorjs_type";

export default class ThresholdModel extends Model {
  constructor(minValue, maxValue) {
    super();
    this.add_attr({
      min: {
        activated: true,
        value: typeof minValue === "undefined" ? 0 : minValue
      },
      max: {
        activated: true,
        value: typeof maxValue === "undefined" ? 0 : maxValue
      }
    });
  }

  activateMin() {
    this.min.activated.set(true);
  }

  disableMin() {
    this.min.activated.set(false);
  }

  activateMax() {
    this.max.activated.set(true);
  }

  disableMax() {
    this.max.activated.set(false);
  }

  setMinValue(value) {
    if (!isNaN(value)) this.min.value.set(value);
  }

  setMaxValue(value) {
    if (!isNaN(value)) this.max.value.set(value);
  }

  getMinValue() {
    return this.min.value.get();
  }

  getMaxValue() {
    return this.max.value.get();
  }
}

spinalCore.register_models([ThresholdModel]);