"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const spinal_env_viewer_graph_service_1 = require("spinal-env-viewer-graph-service");
const threshold_model_1 = require("./threshold.model");
const RELATION_NAME = "hasThreshold";
exports.RELATION_NAME = RELATION_NAME;
const ENDPOINT_CONTEXT_NAME = ".EndpointThreshold";
exports.ENDPOINT_CONTEXT_NAME = ENDPOINT_CONTEXT_NAME;
const ENDPOINT_RELATION = "hasEndpoint";
exports.ENDPOINT_RELATION = ENDPOINT_RELATION;
let thresholdService = {
    createThreshold(nodeId, minValue, maxValue) {
        return this.getThreshold(nodeId).then(threshold => {
            if (threshold)
                return threshold;
            let newThreshold = new threshold_model_1.default(minValue, maxValue);
            let thresholdNode = spinal_env_viewer_graph_service_1.SpinalGraphService.createNode({
                name: "threshold",
                type: "threshold"
            }, newThreshold);
            spinal_env_viewer_graph_service_1.SpinalGraphService.addChild(nodeId, thresholdNode, RELATION_NAME, spinal_env_viewer_graph_service_1.SPINAL_RELATION_PTR_LST_TYPE);
            this.createOrGetContext(nodeId);
            return newThreshold;
        });
    },
    getThreshold(nodeId) {
        return spinal_env_viewer_graph_service_1.SpinalGraphService.getChildren(nodeId, [RELATION_NAME]).then((children) => __awaiter(this, void 0, void 0, function* () {
            if (children && children.length > 0) {
                let threshold = yield children[0].element.load();
                return threshold;
            }
            else {
                return undefined;
                // return this.createThreshold(nodeId);
            }
        }));
    },
    createOrGetContext(nodeId) {
        return __awaiter(this, void 0, void 0, function* () {
            let context = yield spinal_env_viewer_graph_service_1.SpinalGraphService.getContext(ENDPOINT_CONTEXT_NAME);
            if (typeof context === "undefined") {
                context = yield spinal_env_viewer_graph_service_1.SpinalGraphService.addContext(ENDPOINT_CONTEXT_NAME);
            }
            return context;
        });
    },
    addEndpointToContext(contextId, nodeId) {
        return spinal_env_viewer_graph_service_1.SpinalGraphService.addChild(contextId, nodeId, ENDPOINT_RELATION, spinal_env_viewer_graph_service_1.SPINAL_RELATION_PTR_LST_TYPE);
    },
    updateThreshold(nodeId, threshold) {
        this.createThreshold(nodeId).then(thresholdToUpdate => {
            // update min
            if (threshold.min.activated) {
                thresholdToUpdate.activateMin();
                thresholdToUpdate.setMinValue(threshold.min.value);
            }
            else {
                thresholdToUpdate.disableMin();
            }
            // end update min
            //update max
            if (threshold.max.activated) {
                thresholdToUpdate.activateMax();
                thresholdToUpdate.setMaxValue(threshold.max.value);
            }
            else {
                thresholdToUpdate.disableMax();
            }
            //end update max
        });
    }
};
exports.thresholdService = thresholdService;
exports.default = thresholdService;
//# sourceMappingURL=service.js.map