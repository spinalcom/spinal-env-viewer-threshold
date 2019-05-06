import {
  SpinalGraphService,
  SPINAL_RELATION_PTR_LST_TYPE
} from "spinal-env-viewer-graph-service";
import ThresholdModel from "./threshold.model";

const RELATION_NAME = "hasThreshold";
const ENDPOINT_CONTEXT_NAME = ".EndpointThreshold";
const ENDPOINT_RELATION = "hasEndpoint";

let thresholdService = {
  createThreshold(
    nodeId: string,
    minValue?: number,
    maxValue?: number
  ): Promise<ThresholdModel> {
    return this.getThreshold(nodeId).then(threshold => {
      if (threshold) return threshold;

      let newThreshold = new ThresholdModel(minValue, maxValue);

      let thresholdNode = SpinalGraphService.createNode(
        {
          name: "threshold",
          type: "threshold"
        },
        newThreshold
      );

      SpinalGraphService.addChild(
        nodeId,
        thresholdNode,
        RELATION_NAME,
        SPINAL_RELATION_PTR_LST_TYPE
      );
      this.createOrGetContext(nodeId);
      return newThreshold;
    });
  },
  getThreshold(nodeId): Promise<any> {
    return SpinalGraphService.getChildren(nodeId, [RELATION_NAME]).then(
      async children => {
        if (children && children.length > 0) {
          let threshold = await children[0].element.load();
          return threshold;
        } else {
          return undefined;
          // return this.createThreshold(nodeId);
        }
      }
    );
  },
  async createOrGetContext(nodeId: string): Promise<spinal.Model> {
    let context = await SpinalGraphService.getContext(ENDPOINT_CONTEXT_NAME);

    if (typeof context === "undefined") {
      context = await SpinalGraphService.addContext(ENDPOINT_CONTEXT_NAME);
    }

    return context;
  },

  addEndpointToContext(contextId: string, nodeId: string): Promise<boolean> {
    return SpinalGraphService.addChild(
      contextId,
      nodeId,
      ENDPOINT_RELATION,
      SPINAL_RELATION_PTR_LST_TYPE
    );
  },

  updateThreshold(nodeId: string, threshold: any): void {
    this.createThreshold(nodeId).then(thresholdToUpdate => {
      // update min
      if (threshold.min.activated) {
        thresholdToUpdate.activateMin();
        thresholdToUpdate.setMinValue(threshold.min.value);
      } else {
        thresholdToUpdate.disableMin();
      }
      // end update min

      //update max
      if (threshold.max.activated) {
        thresholdToUpdate.activateMax();
        thresholdToUpdate.setMaxValue(threshold.max.value);
      } else {
        thresholdToUpdate.disableMax();
      }
      //end update max
    });
  }
};

export {
  RELATION_NAME,
  thresholdService,
  ENDPOINT_RELATION,
  ENDPOINT_CONTEXT_NAME
};

export default thresholdService;
