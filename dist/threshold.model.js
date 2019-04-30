"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const spinal_core_connectorjs_type_1 = require("spinal-core-connectorjs_type");
const guuid_1 = require("./guuid");
class ThresholdModel extends spinal_core_connectorjs_type_1.Model {
    constructor(minValue, maxValue) {
        super();
        this.add_attr({
            id: guuid_1.default("Threshold"),
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
        if (!isNaN(value))
            this.min.value.set(value);
    }
    setMaxValue(value) {
        if (!isNaN(value))
            this.max.value.set(value);
    }
    getMinValue() {
        return this.min.value.get();
    }
    getMaxValue() {
        return this.max.value.get();
    }
}
exports.default = ThresholdModel;
spinal_core_connectorjs_type_1.spinalCore.register_models([ThresholdModel]);
//# sourceMappingURL=threshold.model.js.map