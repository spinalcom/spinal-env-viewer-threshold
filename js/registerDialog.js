import vue from "vue";
import thresholdConfigDialog from "../vue/thresholdConfig.vue";
import thresholdGlobalConfig from "../vue/thresholdGlobalConfig.vue"
import AlarmPanel from "../vue/alarmPanel.vue";

const {
  SpinalMountExtention
} = require("spinal-env-viewer-panel-manager-service");

const {
  SpinalForgeExtention
} = require("spinal-env-viewer-panel-manager-service_spinalforgeextention");



const dialogs = [{
    name: "thresholdConfigDialog",
    vueMountComponent: vue.extend(thresholdConfigDialog),
    parentContainer: document.body
  },
  {
    name: "thresholdGlobalConfig",
    vueMountComponent: vue.extend(thresholdGlobalConfig),
    parentContainer: document.body
  }
];


for (let index = 0; index < dialogs.length; index++) {
  SpinalMountExtention.mount(dialogs[index]);
}



/***/ ////////////////// Register Panel /////////////////////////////// */

const alarmExtension = SpinalForgeExtention.createExtention({
  name: "spinal_alarm_panel",
  vueMountComponent: vue.extend(AlarmPanel),
  panel: {
    title: "Alarm",
    classname: "spinal_alarm_panel",
    closeBehaviour: "hide"
  },
  style: {
    "min-width": "460px",
    "overflow": "hidden",
    left: "400px"
  }
});

SpinalForgeExtention.registerExtention("spinal_alarm_panel",
  alarmExtension);