import {
  SpinalContextApp
} from "spinal-env-viewer-context-menu-service";

import {
  spinalPanelManagerService
} from "spinal-env-viewer-panel-manager-service";

import {
  SpinalBmsEndpoint
} from "spinal-model-bmsnetwork";

import geographicService from "spinal-env-viewer-context-geographic-service";

class ConfigThreshold extends SpinalContextApp {
  constructor() {
    super("Config Threshold", "Config Threshold", {
      icon: "low_priority",
      icon_type: "in",
      backgroundColor: "#FF0000",
      fontColor: "#FFFFFF"
    })
  }


  isShown(option) {
    let type = option.selectedNode.type.get();

    let condition = geographicService.constants.GEOGRAPHIC_TYPES
      .indexOf(type) !== -1 || type === 'BIMObject' || type ===
      SpinalBmsEndpoint.nodeTypeName;

    return condition ? Promise.resolve(true) : Promise.resolve(-1);

  }

  action(option) {
    spinalPanelManagerService.openPanel("thresholdConfigDialog", {
      isEndpoint: option.selectedNode.type.get() === SpinalBmsEndpoint
        .nodeTypeName,
      node: option
        .selectedNode
    });
  }


}

export default ConfigThreshold;