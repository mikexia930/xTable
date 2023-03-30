<template>
  <div>
    <span v-if="dataIndex === 'c2'">
      <a-button size="small" type="primary" @click="handleModalClick">打开弹窗</a-button>
    </span>
    <span v-else>{{ text }}</span>
  </div>
</template>

<script>
export default {
  name: 'TdComponent',
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
  methods: {
    handleModalClick() {
      this.$emit('change', {
        type: 'modal',
        data: this.text,
      });
    },
  },
};
</script>

<style lang="less" scoped>

</style>
