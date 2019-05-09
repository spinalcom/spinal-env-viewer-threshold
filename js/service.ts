import {
  SpinalGraphService,
  SPINAL_RELATION_PTR_LST_TYPE
} from "spinal-env-viewer-graph-service";
import ThresholdModel from "./threshold.model";

const RELATION_NAME = "hasThreshold";
const ENDPOINT_CONTEXT_NAME = ".EndpointThreshold";
const ENDPOINT_RELATION = "hasEndpoint";
const THRESHOLD_GROUP_CONTEXT = ".ThresholdGroupContext";

let thresholdService = {
  createThreshold(
    nodeId: string,
    minValue?: number,
    maxValue?: number
  ): Promise<ThresholdModel> {
    return this.getThreshold(nodeId).then(async threshold => {
      if (threshold) {
        this.addEndpointToContext(nodeId);
        return threshold;
      }

      let newThreshold = new ThresholdModel(minValue, maxValue);

      let thresholdNode = SpinalGraphService.createNode(
        {
          name: "threshold",
          type: "threshold"
        },
        newThreshold
      );

      return SpinalGraphService.addChild(
        nodeId,
        thresholdNode,
        RELATION_NAME,
        SPINAL_RELATION_PTR_LST_TYPE
      ).then(() => {
        this.addEndpointToContext(nodeId);
        return newThreshold;
      });
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

  async createOrGetContext(): Promise<spinal.Model> {
    let context = await SpinalGraphService.getContext(ENDPOINT_CONTEXT_NAME);

    if (typeof context === "undefined") {
      context = await SpinalGraphService.addContext(ENDPOINT_CONTEXT_NAME);
    }

    return context;
  },

  addEndpointToContext(nodeId: string): Promise<boolean> {
    return this.createOrGetContext().then(context => {
      let contextId = context.info.id.get();

      SpinalGraphService.getChildren(contextId, [ENDPOINT_RELATION]).then(
        res => {
          for (let index = 0; index < res.length; index++) {
            const elementId = res[index].id.get();
            if (elementId === nodeId) return;
          }

          return SpinalGraphService.addChild(
            contextId,
            nodeId,
            ENDPOINT_RELATION,
            SPINAL_RELATION_PTR_LST_TYPE
          );
        }
      );
    });
  },

  updateThreshold(nodeId: string, threshold: any): void {
    if (!this._isValidThreshold(threshold)) throw "Threshold params not valid";

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
  },

  createOrGetThresholdGroupContext(): Promise<spinal.Model> {
    return SpinalGraphService.getContext(THRESHOLD_GROUP_CONTEXT).then(
      async context => {
        if (typeof context !== "undefined") return context;

        let temp_context = await SpinalGraphService.addContext(
          THRESHOLD_GROUP_CONTEXT
        );
        return temp_context;
      }
    );
  },

  createThresholdGroup(threshold: any): void {},

  _isValidThreshold(threshold: any): boolean {
    let minIsValid =
      threshold.hasOwnProperty("min") &&
      threshold.min.hasOwnProperty("value") &&
      threshold.min.hasOwnProperty("activated");

    let maxIsValid =
      threshold.hasOwnProperty("max") &&
      threshold.max.hasOwnProperty("value") &&
      threshold.max.hasOwnProperty("activated");

    if (minIsValid && maxIsValid) {
      return true;
    }

    return false;
  }
};

export {
  RELATION_NAME,
  thresholdService,
  ENDPOINT_RELATION,
  THRESHOLD_GROUP_CONTEXT,
  ENDPOINT_CONTEXT_NAME
};

export default thresholdService;
