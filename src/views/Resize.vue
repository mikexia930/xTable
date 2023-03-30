<template>
  <Layout>
    <x-table
      :is-use-storage="isUseStorage"
      :is-use-single-table="isUseSingleTable"
      :columns=tableColumns
      :config="tableConfig"
      :data="tableData"
      :title="tableHeaderTitle"
      :page-data="pageData"
    />
  </Layout>
</template>

<script>
import Layout from '../components/ui/Layout.vue';
import {
  generateTableData, generateTableTitle, generateColumnData,
} from '../libs/tableLib';

export default {
  name: 'Resize',
  components: {
    Layout,
  },
  created() {
    this.tableColumns = generateColumnData(30, '', { isResize: true });
    this.tableData = generateTableData(10, 30);
    this.tableHeaderTitle = generateTableTitle(30);
  },
  data() {
    return {
      isUseStorage: true,
      isUseSingleTable: true,
      tableColumns: [], // 表格的列
      tableHeaderTitle: [], // 表头
      tableData: [],
      tableConfig: {
        key: 'table-resize',
        scrollHeight: '100%',
        scrollWidth: '100%',
        scrollBarWidth: 15, // 滚动条宽度
        scrollBarHeight: 15, // 滚动条高度
        miniWidth: '160px', // 没有设置表格宽度会默认使用最小width
        resizeMin: 160,
        resizeMax: 500,
        border: 1, // 0 无边框， 1 有边框， 2 四周无边框
        rowKey: 'id',
        noWrap: true,
        isUseNoWrapTitle: true,
      },
      pageData: {
        page: 1,
        size: 10,
      },
    };
  },
};
</script>
