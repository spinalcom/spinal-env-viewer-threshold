import ThresholdModel from "./threshold.model";
declare const RELATION_NAME = "hasThreshold";
declare const ENDPOINT_CONTEXT_NAME = ".EndpointThreshold";
declare const ENDPOINT_RELATION = "hasEndpoint";
declare let thresholdService: {
    createThreshold(nodeId: any, minValue: any, maxValue: any): ThresholdModel;
    getThreshold(nodeId: any): Promise<any>;
    createContext(nodeId: any): Promise<void>;
};
export { RELATION_NAME, thresholdService, ENDPOINT_RELATION, ENDPOINT_CONTEXT_NAME };
export default thresholdService;
