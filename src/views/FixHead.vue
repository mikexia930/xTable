<template>
  <Layout>
    <div>
      <h3>固定在浏览器顶部</h3>
    </div>
    <div>
      <x-table
        :is-fix-header="head.isFixHeader"
        :columns=tableColumns
        :config="head.tableConfig"
        :data="tableData"
        :title="tableHeaderTitle"
        :page-data="head.pageData"
      />
    </div>
    <div style="margin-top: 32px">
      <h3>固定在父窗口顶部</h3>
    </div>
    <div>
      <x-table
        :is-use-single-table="parent.isUseSingleTable"
        :columns=tableColumns
        :config="parent.tableConfig"
        :data="tableData"
        :title="tableHeaderTitle"
        :page-data="parent.pageData"
      />
    </div>
  </Layout>
</template>

<script>
import Layout from '../components/ui/Layout.vue';
import {
  generateTableData, generateTableTitle, generateColumnData,
} from '../libs/tableLib';

export default {
  name: 'FixHead',
  components: {
    Layout,
  },
  created() {
    this.tableColumns = generateColumnData(30);
    this.tableData = generateTableData(100, 30);
    this.tableHeaderTitle = generateTableTitle(30);
  },
  data() {
    return {
      tableColumns: [], // 表格的列
      tableHeaderTitle: [], // 表头
      tableData: [],
      head: {
        isFixHeader: true, // 是否 fix 在浏览器顶部
        tableConfig: {
          key: 'table-fix-head',
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
      },
      parent: {
        isFixHeader: false, // 是否 fix 在浏览器顶部
        isUseSingleTable: true,
        tableConfig: {
          key: 'table-fix-parent',
          scrollHeight: '300px',
          scrollWidth: '800px',
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
      },
    };
  },
};
</script>
