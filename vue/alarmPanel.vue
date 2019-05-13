
<template>
  <md-content class="alarmPanelContent">
    <div class="_title">{{title}}</div>

    <div class="tableContainer">
      <md-table class="tableMd"
                v-model="alarms"
                md-sort="beginDate"
                md-fixed-header
                md-sort-order="asc">
        <!-- <md-table-toolbar>
          <h1 class="md-title">Alarms</h1>
        </md-table-toolbar> -->

        <md-table-empty-state md-label="No Alarm"
                              :md-description="`This Element has no Alarm`">
        </md-table-empty-state>

        <md-table-row slot="md-table-row"
                      slot-scope="{ item }">
          <md-table-cell md-label="Name"
                         md-sort-by="name"
                         md-numeric>{{ item.name }}</md-table-cell>
          <md-table-cell md-label="Begin"
                         md-sort-by="beginDate">{{ item.beginDate |
            formatDate
            }}</md-table-cell>
          <md-table-cell md-label="End"
                         md-sort-by="endDate">{{ item.endDate |
            formatDate }}</md-table-cell>
          <md-table-cell md-label="type"
                         md-sort-by="alarmType">{{ item.alarmType
            }}</md-table-cell>

        </md-table-row>
      </md-table>
    </div>

  </md-content>
</template>

<script>
const {
  spinalPanelManagerService
} = require("spinal-env-viewer-panel-manager-service");

import { SpinalGraphService } from "spinal-env-viewer-graph-service";

import { alarmService } from "spinal-organ-threshold";

export default {
  name: "alarm-panel",
  data() {
    return {
      endpointNode: null,
      title: null,
      alarms: [],
      dbIds: [],
      viewer: null
    };
  },
  methods: {
    opened(params) {
      //params is an object {endpointNode, dbIds, viewer}
      let option = params.endpointNode;
      this.dbIds = params.dbIds;

      this.setTitle(option.name.get());
      this.title = option.name.get();
      this.endpointNode = option;
      this.getAlarm();
    },
    setTitle(title) {
      spinalPanelManagerService.panels.spinal_alarm_panel.panel.setTitle(
        `Alarm : ${title}`
      );
    },
    getAlarm() {
      SpinalGraphService.getChildren(this.endpointNode.id.get(), [
        alarmService.ENDPOINT_TO_ALARM_RELATION
      ]).then(alarms => {
        // this.alarms = [];

        alarms = alarms.map(async el => {
          return {
            name: el.name.get(),
            alarm: await el.element.load()
          };
        });

        Promise.all(alarms).then(res => {
          this.alarms = res.map(el => {
            return {
              name: el.name,
              beginDate: el.alarm.beginDate.get().toString(),
              endDate: el.alarm.endDate.get().toString(),
              alarmType: el.alarm.alarmType.get().toString()
            };
          });
        });
      });
    }
  },
  filters: {
    formatDate: function(value) {
      let v = parseInt(value);

      let date = new Date(v);

      let day = date.getDate();
      let month = date.getMonth();
      let year = date.getFullYear();
      let hour = date.getHours();
      let minute = date.getMinutes();
      let second = date.getSeconds();

      return `${day}/${month}/${year} ${hour}:${minute}:${second}`;
    }
  }
};
</script>

<style scoped>
.alarmPanelContent {
  width: 100%;
  height: 100%;
}

.tableContainer {
  margin-top: 10px;
  height: 85%;
  overflow: hidden;
}

._title {
  height: 5%;
  text-align: center;
  font-size: 18px;
  padding-top: 8px;
  text-transform: uppercase;
}

.tableContainer .tableMd {
  /* width: 100%; */
  height: 100%;
  padding-left: 10px;
  padding-right: 10px;
}

.tableContainer .tableMd .md-table-fixed-header {
  height: 60px !important;
  background: red;
}
</style>
