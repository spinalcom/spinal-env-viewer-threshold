import ThresholdModel from "./threshold.model";
declare const RELATION_NAME = "hasThreshold";
declare const ENDPOINT_CONTEXT_NAME = ".EndpointThreshold";
declare const ENDPOINT_RELATION = "hasEndpoint";
declare let thresholdService: {
    createThreshold(nodeId: string, minValue?: number, maxValue?: number): Promise<ThresholdModel>;
    getThreshold(nodeId: any): Promise<any>;
    createOrGetContext(nodeId: string): Promise<spinal.Model>;
    addEndpointToContext(contextId: string, nodeId: string): Promise<boolean>;
    updateThreshold(nodeId: string, threshold: any): void;
};
export { RELATION_NAME, thresholdService, ENDPOINT_RELATION, ENDPOINT_CONTEXT_NAME };
export default thresholdService;
