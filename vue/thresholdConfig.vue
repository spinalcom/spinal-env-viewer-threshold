<template>
  <md-dialog :md-active.sync="showDialog"
             @md-closed="closeDialog(false)">
    <md-dialog-title>Configure Threshold</md-dialog-title>

    <md-dialog-content v-if="threshold">

      <md-list class="minSeuil">
        <md-subheader>Threshold Min</md-subheader>

        <md-list-item>
          <md-checkbox class="md-primary"
                       v-model="threshold.min.activated">Active</md-checkbox>
        </md-list-item>

        <md-list-item>
          <md-field md-inline
                    class="thresholdValue">
            <label>Value</label>
            <md-input type="number"
                      v-model="threshold.min.value"
                      :disabled="!threshold.min.activated"></md-input>
          </md-field>
        </md-list-item>

      </md-list>

      <md-list class="maxSeuil">
        <md-subheader>Threshold Max</md-subheader>

        <md-list-item>
          <md-checkbox class="md-primary"
                       v-model="threshold.max.activated">Active</md-checkbox>
        </md-list-item>

        <md-list-item>
          <md-field md-inline
                    class="thresholdValue">
            <label>Value</label>
            <md-input type="number"
                      v-model="threshold.max.value"
                      :disabled="!threshold.max.activated"></md-input>
          </md-field>
        </md-list-item>

      </md-list>

    </md-dialog-content>

    <md-dialog-actions>
      <md-button class="md-primary"
                 @click="closeDialog(false)">Close</md-button>
      <md-button class="md-primary"
                 @click="closeDialog(true)">Save</md-button>
    </md-dialog-actions>
  </md-dialog>
</template>


<script>
import thresholdService from "../dist/service";

export default {
  name: "thresholdConfigDialog",
  props: ["onFinised"],
  data() {
    this.globalThreshold = null;
    return {
      showDialog: true,
      nodeItem: null,
      threshold: null
    };
  },
  methods: {
    opened(node) {
      this.nodeItem = node;
      thresholdService.getThreshold(this.nodeItem.id.get()).then(threshold => {
        this.globalThreshold = threshold;
        this.threshold = threshold.get();
        console.log(this.threshold);
      });
    },

    removed(closeResult) {
      if (closeResult) {
        // update min
        if (this.threshold.min.activated) {
          this.globalThreshold.activateMin();
          this.globalThreshold.setMinValue(this.threshold.min.value);
        } else {
          this.globalThreshold.disableMin();
        }
        // end update min

        //update max
        if (this.threshold.max.activated) {
          this.globalThreshold.activateMax();
          this.globalThreshold.setMaxValue(this.threshold.max.value);
        } else {
          this.globalThreshold.disableMax();
        }
        //end update max
      }
      this.showDialog = false;
    },

    closeDialog(closeResult) {
      if (typeof this.onFinised === "function") {
        this.onFinised(closeResult);
      }
    }
  }
};
</script>