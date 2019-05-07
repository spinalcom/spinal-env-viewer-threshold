
<template>
  <md-dialog :md-active.sync="showDialog"
             @md-closed="closeDialog(false)">
    <md-dialog-title style="text-align : center">Create/Update Threshold Group</md-dialog-title>

    <md-dialog-content class="dialogContainer">
      <!-- TABS -->
      <md-tabs class="md-transparent"
               md-alignment="fixed">
        <md-tab id="tab-add"
                md-icon="add"
                md-label="ADD"
                @click="changePage(0)">
          <add-threshold></add-threshold>
        </md-tab>

        <md-tab id="tab-view"
                md-icon="list"
                md-label="GROUP LIST"
                @click="changePage(1)">

          <group-list></group-list>

        </md-tab>

        <md-tab id="tab-manage"
                md-icon="supervised_user_circle"
                md-label="Manage"
                @click="changePage(2)">

          <h5>Manage</h5>

        </md-tab>
      </md-tabs>
      <!-- END TABS -->

    </md-dialog-content>

    <md-dialog-actions>
      <md-button class="md-primary"
                 @click="closeDialog(false)">Close</md-button>
      <!-- <md-button class="md-primary"
                 @click="closeDialog(true)">Save</md-button> -->
    </md-dialog-actions>
  </md-dialog>
</template>


<script>
import addThresholdTemplate from "./addThresholdTemplate.vue";
import groupListTemplate from "./groupListTemplate.vue";

export default {
  name: "thresholdGlobalConfig",
  props: ["onFinised"],
  components: {
    "add-threshold": addThresholdTemplate,
    "group-list": groupListTemplate
  },
  data() {
    return {
      showDialog: true,
      pageNumber: 0
    };
  },
  methods: {
    opened(node) {
      console.log("node", node);
    },

    removed(closeResult) {
      if (closeResult) {
        console.log("yes");
      }
      this.showDialog = false;
    },

    closeDialog(closeResult) {
      if (typeof this.onFinised === "function") {
        this.onFinised(closeResult);
      }
    },

    changePage(page) {
      console.log("change Page");

      this.pageNumber = page;
    }
  }
};
</script>
