import { Model } from "spinal-core-connectorjs_type";
export default class ThresholdModel extends Model {
    constructor(minValue: any, maxValue: any);
    activateMin(): void;
    disableMin(): void;
    activateMax(): void;
    disableMax(): void;
    setMinValue(value: any): void;
    setMaxValue(value: any): void;
    getMinValue(): any;
    getMaxValue(): any;
}
