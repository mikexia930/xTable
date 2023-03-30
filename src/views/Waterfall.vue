<template>
  <Layout>
    <x-table
      :is-use-single-table="isUseSingleTable"
      :columns=tableColumns
      :config="tableConfig"
      :data="tableData"
      :title="tableHeaderTitle"
      :header-data="tableHeaderData"
      :page-data="pageData"
      :is-waterfall="isWaterfall"
    />
  </Layout>
</template>

<script>
import Layout from '../components/ui/Layout.vue';
import {
  generateTableData, generateTableTitle, generateColumnData,
} from '../libs/tableLib';

export default {
  name: 'Waterfall',
  components: {
    Layout,
  },
  created() {
    this.tableColumns = generateColumnData(30);
    this.tableData = generateTableData(1000, 30);
    this.tableHeaderTitle = generateTableTitle(30);
  },
  data() {
    return {
      isWaterfall: true,
      tableColumns: [], // 表格的列
      tableHeaderData: [], // 插在thead里的数据，默认只显示 headTitle
      tableHeaderTitle: [], // 表头
      tableData: [],
      isFixHeader: false, // 是否 fix 在浏览器顶部
      isUseSingleTable: true,
      tableConfig: {
        key: 'table-waterfall',
        scrollHeight: '500px',
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
        size: 50,
      },
    };
  },
};
</script>
