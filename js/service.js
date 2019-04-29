import {
  SpinalGraphService,
  SPINAL_RELATION_PTR_LST_TYPE
} from "spinal-env-viewer-graph-service";
import ThresholdModel from "./threshold.model";


const RELATION_NAME = "hasThreshold";
const ENDPOINT_CONTEXT_NAME = ".EndpointThreshold";
const ENDPOINT_RELATION = "hasEndpoint";

let thresholdService = {

  createThreshold(nodeId, minValue, maxValue) {
    let threshold = new ThresholdModel(minValue, maxValue);

    let thresholdNode = SpinalGraphService.createNode({
      name: "threshold",
      type: "threshold"
    }, threshold);

    SpinalGraphService.addChild(nodeId, thresholdNode, RELATION_NAME,
      SPINAL_RELATION_PTR_LST_TYPE);
    this.createContext(nodeId);
    return threshold;

  },
  getThreshold(nodeId) {
    return SpinalGraphService.getChildren(nodeId, [RELATION_NAME]).then(
      async children => {
        if (children && children.length > 0) {
          let threshold = await children[0].element.load();
          return threshold;
        } else {
          return this.createThreshold(nodeId);
        }
      })
  },
  async createContext(nodeId) {
    let context = await SpinalGraphService.getContext(
      ENDPOINT_CONTEXT_NAME);


    if (typeof context === "undefined") {
      context = await SpinalGraphService.addContext(
        ENDPOINT_CONTEXT_NAME)
    }

    SpinalGraphService.addChild(context.info.id.get(), nodeId,
      ENDPOINT_RELATION, SPINAL_RELATION_PTR_LST_TYPE);


  }

}

export {
  RELATION_NAME,
  thresholdService,
  ENDPOINT_RELATION
}

export default thresholdService;