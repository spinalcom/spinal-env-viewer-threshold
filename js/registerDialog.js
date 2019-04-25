import vue from "vue";
import thresholdConfigDialog from "../vue/thresholdConfig.vue";


const {
  SpinalMountExtention
} = require("spinal-env-viewer-panel-manager-service");

const dialogs = [{
    name: "thresholdConfigDialog",
    vueMountComponent: vue.extend(thresholdConfigDialog),
    parentContainer: document.body
  }

];


for (let index = 0; index < dialogs.length; index++) {
  SpinalMountExtention.mount(dialogs[index]);
}