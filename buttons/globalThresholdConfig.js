import {
  SpinalContextApp
} from "spinal-env-viewer-context-menu-service";

import {
  spinalPanelManagerService
} from "spinal-env-viewer-panel-manager-service";


class GlobalThresholdConfig extends SpinalContextApp {
  constructor() {
    super("Config Global Threshold", "Config Global Threshold", {
      icon: "low_priority",
      icon_type: "in",
      backgroundColor: "#FF0000",
      fontColor: "#FFFFFF"
    })
  }

  isShown() {
    return Promise.resolve(true);
  }

  action(option) {
    spinalPanelManagerService.openPanel("thresholdGlobalConfig");
  }

}

export default GlobalThresholdConfig;