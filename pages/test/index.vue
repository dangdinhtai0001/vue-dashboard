<template>
  <div id="app">
    <HotTable :settings="settings" :data="data" ></HotTable>
  </div>
</template>

<script>
import HotTable from "~/plugins/vue-handsontable";

export default {
  layout: "empty",
  auth: false,

  data: function() {
    return {
      data: [
        ["", "Ford", "Volvo", "Toyota", "Honda"],
        ["2016", 10, 11, 12, 13],
        ["2017", 20, 11, 14, 13],
        ["2018", 30, 15, 12, 13],
        ["2019", 1, 1, 1, 1]
      ],
      settings: {
        colHeaders: true,
        rowHeaders: true,
        licenseKey: 'non-commercial-and-evaluation'
      }
    };
  },

  components: {
    HotTable
  }
};
</script>
