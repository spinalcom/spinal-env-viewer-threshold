import ThresholdModel from "./threshold.model";
declare const RELATION_NAME = "hasThreshold";
declare const ENDPOINT_CONTEXT_NAME = ".EndpointThreshold";
declare const ENDPOINT_RELATION = "hasEndpoint";
declare const THRESHOLD_GROUP_CONTEXT = ".ThresholdGroupContext";
declare let thresholdService: {
    createThreshold(nodeId: string, minValue?: number, maxValue?: number): Promise<ThresholdModel>;
    getThreshold(nodeId: any): Promise<any>;
    createOrGetContext(): Promise<spinal.Model>;
    addEndpointToContext(nodeId: string): Promise<boolean>;
    updateThreshold(nodeId: string, threshold: any): void;
    createOrGetThresholdGroupContext(): Promise<spinal.Model>;
    createThresholdGroup(threshold: any): void;
    _isValidThreshold(threshold: any): boolean;
};
export { RELATION_NAME, thresholdService, ENDPOINT_RELATION, THRESHOLD_GROUP_CONTEXT, ENDPOINT_CONTEXT_NAME };
export default thresholdService;
