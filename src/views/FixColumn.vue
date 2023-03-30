<template>
  <Layout>
    <div>
      <h3>固定左侧</h3>
    </div>
    <div>
      <x-table
        :is-sticky="isSticky"
        :columns="left.tableColumns"
        :config="left.tableConfig"
        :data="tableData"
        :title="tableHeaderTitle"
        :page-data="pageData"
      />
    </div>
    <div style="margin-top: 32px">
      <h3>固定右侧</h3>
    </div>
    <div>
      <x-table
        :is-sticky="isSticky"
        :columns="right.tableColumns"
        :config="right.tableConfig"
        :data="tableData"
        :title="tableHeaderTitle"
        :page-data="pageData"
      />
    </div>
    <div style="margin-top: 32px">
      <h3>固定两侧</h3>
    </div>
    <div>
      <x-table
        :is-sticky="isSticky"
        :columns="side.tableColumns"
        :config="side.tableConfig"
        :data="tableData"
        :title="tableHeaderTitle"
        :page-data="pageData"
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
    this.left.tableColumns = generateColumnData(30, false, { isStickyLeft: true });
    this.right.tableColumns = generateColumnData(30, false, { isStickyRight: true });
    this.side.tableColumns = generateColumnData(30, false, { isStickyLeft: true, isStickyRight: true });
    this.tableData = generateTableData(10, 30);
    this.tableHeaderTitle = generateTableTitle(30);
  },
  data() {
    return {
      isSticky: true,
      tableHeaderTitle: [], // 表头
      tableData: [],
      pageData: {
        page: 1,
        size: 10,
      },
      left: {
        tableColumns: [], // 表格的列
        tableConfig: {
          key: 'table-fix-column-left',
          scrollHeight: '100%',
          scrollWidth: '100%',
          miniWidth: '160px', // 没有设置表格宽度会默认使用最小width
          resizeMin: 160,
          resizeMax: 500,
          border: 1, // 0 无边框， 1 有边框， 2 四周无边框
          rowKey: 'id',
          noWrap: true,
          isUseNoWrapTitle: true,
        },
      },
      right: {
        tableColumns: [], // 表格的列
        tableConfig: {
          key: 'table-fix-right',
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
      },
      side: {
        tableColumns: [], // 表格的列
        tableConfig: {
          key: 'table-fix-side',
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
      },
    };
  },
};
</script>
