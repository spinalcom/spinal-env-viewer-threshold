const {
  spinalContextMenuService
} = require("spinal-env-viewer-context-menu-service");

import "./js/registerDialog";
import GlobalThresholdConfig from "./buttons/globalThresholdConfig";


const HeaderBarName = "GraphManagerTopBar";



spinalContextMenuService.registerApp(HeaderBarName,
  new GlobalThresholdConfig());