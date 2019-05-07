
<template>
  <md-content class="md-scrollbar _container">
    <h2 class="title">Create Threshold Group</h2>

    <div>

      <md-list>
        <md-list-item>
          <md-field>
            <label>Name</label>
            <md-input v-model="threshold.name"></md-input>
          </md-field>
        </md-list-item>
      </md-list>

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

        <md-list-item>
          <md-button class="md-primary createBtn">CREATE</md-button>
        </md-list-item>

      </md-list>
    </div>

  </md-content>

</template>

<script>
export default {
  name: "addThresholdTemplate",
  data() {
    return {
      threshold: {
        name: "",
        min: {
          activated: false,
          value: 0
        },
        max: {
          activated: false,
          value: 10
        }
      }
    };
  }
};
</script>

<style scoped>
._container {
  width: 100%;
  height: 540px;
  overflow: auto;
}

.title {
  text-align: center;
}

.createBtn {
  float: right;
}
</style>
