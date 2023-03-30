<template>
  <div>
    表头-{{ text }}
  </div>
</template>

<script>
export default {
  name: 'ThComponent',
  props: {
    column: Object,
    record: Object,
  },
  computed: {
    dataIndex() {
      return this.column.dataIndex;
    },
    text() {
      return this.record[this.dataIndex].value;
    },
  },
};
</script>

<style lang="less" scoped>

</style>
